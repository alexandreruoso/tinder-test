import { renderHook, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import apiClient from '../api/client'
import { useSwipeApi } from './useSwipeApi'

// Mock the entire apiClient module
vi.mock('../api/client')

// Mock data for profiles
const mockProfile1 = {
    id: 'user1',
    name: 'Alex',
    age: 28,
    imageUrl: 'url-to-image',
}
const mockProfile2 = {
    id: 'user2',
    name: 'Ben',
    age: 32,
    imageUrl: 'url-to-image-2',
}

describe('useSwipeApi', () => {
    beforeEach(() => {
        // Reset mocks before each test to ensure a clean state
        vi.mocked(apiClient.get).mockReset()
        vi.mocked(apiClient.post).mockReset()
    })

    it('should start in a loading state and fetch a profile successfully', async () => {
        // Arrange: Mock a successful API response for the initial fetch
        vi.mocked(apiClient.get).mockResolvedValue({ data: mockProfile1 })

        // Act: Render the hook
        const { result } = renderHook(() => useSwipeApi())

        // Assert: Check the initial loading state
        expect(result.current.isLoading).toBe(true)
        expect(result.current.profile).toBe(undefined)

        // Assert: Wait for the API call to resolve and the state to update
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
            expect(result.current.profile).toEqual(mockProfile1)
            expect(apiClient.get).toHaveBeenCalledWith('/profiles/next')
        })
    })

    it('should handle the "finished" state when the API returns a 404 status', async () => {
        // Arrange: Mock an Axios-like 404 error response.
        // The `isAxiosError: true` property is crucial for the type guard in the hook.
        const mockError: Partial<AxiosError> = {
            isAxiosError: true,
            response: {
                status: 404,
                data: undefined,
                statusText: 'Not Found',
                headers: {},
                config: {} as InternalAxiosRequestConfig,
            },
        }
        vi.mocked(apiClient.get).mockRejectedValue(mockError)

        // Act: Render the hook
        const { result } = renderHook(() => useSwipeApi())

        // Assert: Wait for the state to reflect the "finished" condition
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
            expect(result.current.isFinished).toBe(true) // This should now pass
            expect(result.current.profile).toBe(undefined) // No profile should be set
            expect(result.current.error).toBe(undefined) // It's not an error, just a finished state
        })
    })

    it('should handle a generic API error during the initial fetch', async () => {
        // Arrange: Mock a generic network error
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Network Error'))

        // Act: Render the hook
        const { result } = renderHook(() => useSwipeApi())

        // Assert: Wait for the state to reflect the error
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
            expect(result.current.error).toBe(
                'Failed to load profiles. Please try again.'
            )
        })
    })

    it('should handle a "like" action that is NOT a match', async () => {
        // Arrange: Mock the initial fetch and the subsequent "like" response
        vi.mocked(apiClient.get)
            .mockResolvedValueOnce({ data: mockProfile1 }) // Initial profile
            .mockResolvedValueOnce({ data: mockProfile2 }) // Next profile after like
        vi.mocked(apiClient.post).mockResolvedValue({ data: { match: false } })

        const { result } = renderHook(() => useSwipeApi())
        await waitFor(() => expect(result.current.isLoading).toBe(false)) // Wait for initial load

        // Act: Call the likeProfile function
        await act(async () => {
            await result.current.likeProfile('user1')
        })

        // Assert
        expect(apiClient.post).toHaveBeenCalledWith('/profiles/user1/like')
        expect(result.current.isMatch).toBe(false)
        // It should have called .get() again to fetch the next profile
        expect(apiClient.get).toHaveBeenCalledTimes(2)
        expect(result.current.profile).toEqual(mockProfile2)
    })

    it('should handle a "like" action that IS a match', async () => {
        // Arrange
        vi.mocked(apiClient.get).mockResolvedValue({ data: mockProfile1 })
        vi.mocked(apiClient.post).mockResolvedValue({ data: { match: true } })

        const { result } = renderHook(() => useSwipeApi())
        await waitFor(() => expect(result.current.isLoading).toBe(false))

        // Act
        await act(async () => {
            await result.current.likeProfile('user1')
        })

        // Assert
        expect(result.current.isMatch).toBe(true)
        // It should NOT have fetched the next profile yet
        expect(apiClient.get).toHaveBeenCalledTimes(1)
    })

    it('should handle a "dislike" action', async () => {
        // Arrange
        vi.mocked(apiClient.get)
            .mockResolvedValueOnce({ data: mockProfile1 }) // Initial
            .mockResolvedValueOnce({ data: mockProfile2 }) // Next after dislike
        vi.mocked(apiClient.post).mockResolvedValue({}) // Dislike has no body

        const { result } = renderHook(() => useSwipeApi())
        await waitFor(() => expect(result.current.isLoading).toBe(false))

        // Act
        await act(async () => {
            await result.current.dislikeProfile('user1')
        })

        // Assert
        expect(apiClient.post).toHaveBeenCalledWith('/profiles/user1/dislike')
        expect(apiClient.get).toHaveBeenCalledTimes(2) // Fetched next profile
        expect(result.current.profile).toEqual(mockProfile2)
    })

    it('should fetch the next profile after closing the match dialog', async () => {
        // Arrange: Get hook into a matched state first
        vi.mocked(apiClient.get)
            .mockResolvedValueOnce({ data: mockProfile1 })
            .mockResolvedValueOnce({ data: mockProfile2 })
        vi.mocked(apiClient.post).mockResolvedValue({ data: { match: true } })
        const { result } = renderHook(() => useSwipeApi())
        await waitFor(() => expect(result.current.isLoading).toBe(false))
        await act(async () => {
            await result.current.likeProfile('user1')
        })
        expect(result.current.isMatch).toBe(true) // Pre-condition check

        // Act: Close the dialog
        await act(async () => {
            result.current.closeMatchDialog()
        })

        // Assert
        expect(result.current.isMatch).toBe(false)
        await waitFor(() => {
            // Now it fetches the next profile and updates the state
            expect(apiClient.get).toHaveBeenCalledTimes(2)
            expect(result.current.profile).toEqual(mockProfile2)
        })
    })

    it('should set an error if liking a profile fails', async () => {
        // Arrange
        vi.mocked(apiClient.get).mockResolvedValue({ data: mockProfile1 })
        vi.mocked(apiClient.post).mockRejectedValue(new Error('API Error'))

        const { result } = renderHook(() => useSwipeApi())
        await waitFor(() => expect(result.current.isLoading).toBe(false))

        // Act
        await act(async () => {
            await result.current.likeProfile('user1')
        })

        // Assert
        expect(result.current.error).toBe(
            'An error occurred while liking the profile.'
        )
    })

    it('should set an error if disliking a profile fails', async () => {
        // Arrange
        vi.mocked(apiClient.get).mockResolvedValue({ data: mockProfile1 })
        vi.mocked(apiClient.post).mockRejectedValue(new Error('API Error'))

        const { result } = renderHook(() => useSwipeApi())
        await waitFor(() => expect(result.current.isLoading).toBe(false))

        // Act
        await act(async () => {
            await result.current.dislikeProfile('user1')
        })

        // Assert
        expect(result.current.error).toBe(
            'An error occurred while disliking the profile.'
        )
    })
})
