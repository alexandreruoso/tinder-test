import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { useSwipeApi } from './useSwipeApi'
import { type ReactNode } from 'react'
import {
    afterAll,
    afterEach,
    beforeAll,
    describe,
    expect,
    it,
    vi,
} from 'vitest'

// Mock the apiClient to use relative paths that MSW can intercept.
vi.mock('../api/client', async (importOriginal) => {
    const axios = (await import('axios')).default
    const originalModule = await importOriginal()
    return Object.assign({}, originalModule, {
        default: axios.create({
            baseURL: '/api',
        }),
    })
})

// Mock server setup with relative paths
const server = setupServer(
    http.get('/api/profiles/next', () => {
        return HttpResponse.json({ id: '1', name: 'Test User', age: 25 })
    }),
    http.post('/api/profiles/:profileId/like', ({ params }) => {
        const { profileId } = params
        if (profileId === 'match') {
            return HttpResponse.json({ match: true })
        }
        return HttpResponse.json({ match: false })
    }),
    http.post('/api/profiles/:profileId/dislike', () => {
        return new HttpResponse(null, { status: 200 })
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                retryDelay: 10,
            },
        },
    })
    return ({ children }: { children: ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

describe('useSwipeApi', () => {
    it('should be in a loading state initially and then fetch a profile', async () => {
        const { result } = renderHook(() => useSwipeApi(), {
            wrapper: createWrapper(),
        })

        expect(result.current.isLoading).toBe(true)

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
            expect(result.current.profile).toEqual({
                id: '1',
                name: 'Test User',
                age: 25,
            })
        })
    })

    it('should handle liking a profile without a match', async () => {
        const { result } = renderHook(() => useSwipeApi(), {
            wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        server.use(
            http.get('/api/profiles/next', () => {
                return HttpResponse.json({
                    id: '2',
                    name: 'Another User',
                    age: 30,
                })
            })
        )

        act(() => {
            result.current.likeProfile('no-match')
        })

        await waitFor(() => {
            expect(result.current.profile?.id).toBe('2')
            expect(result.current.isMatch).toBe(false)
        })
    })

    it('should handle liking a profile with a match', async () => {
        const { result } = renderHook(() => useSwipeApi(), {
            wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        act(() => {
            result.current.likeProfile('match')
        })

        await waitFor(() => {
            expect(result.current.isMatch).toBe(true)
        })
    })

    it('should handle disliking a profile', async () => {
        const { result } = renderHook(() => useSwipeApi(), {
            wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        server.use(
            http.get('/api/profiles/next', () => {
                return HttpResponse.json({
                    id: '3',
                    name: 'Third User',
                    age: 22,
                })
            })
        )

        act(() => {
            result.current.dislikeProfile('any-id')
        })

        await waitFor(() => {
            expect(result.current.profile?.id).toBe('3')
        })
    })

    it('should set isFinished to true when no more profiles are available', async () => {
        server.use(
            http.get('/api/profiles/next', () => {
                return new HttpResponse(null, { status: 404 })
            })
        )

        const { result } = renderHook(() => useSwipeApi(), {
            wrapper: createWrapper(),
        })

        await waitFor(() => {
            expect(result.current.isFinished).toBe(true)
            expect(result.current.error).toBeUndefined()
        })
    })

    it('should set an error state on a server error', async () => {
        server.use(
            http.get('/api/profiles/next', () => {
                return new HttpResponse(null, { status: 500 })
            })
        )

        const { result } = renderHook(() => useSwipeApi(), {
            wrapper: createWrapper(),
        })

        await waitFor(() => {
            expect(result.current.error).toBe('Failed to load profiles.')
        })
    })

    it('should close the match dialog and fetch the next profile', async () => {
        const { result } = renderHook(() => useSwipeApi(), {
            wrapper: createWrapper(),
        })

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        act(() => {
            result.current.likeProfile('match')
        })

        await waitFor(() => expect(result.current.isMatch).toBe(true))

        server.use(
            http.get('/api/profiles/next', () => {
                return HttpResponse.json({
                    id: '4',
                    name: 'Fourth User',
                    age: 28,
                })
            })
        )

        act(() => {
            result.current.closeMatchDialog()
        })

        await waitFor(() => {
            expect(result.current.isMatch).toBe(false)
            expect(result.current.profile?.id).toBe('4')
        })
    })
})
