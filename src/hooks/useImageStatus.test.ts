import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useImageStatus } from './useImageStatus'

// A type to hold our mock event listeners
type EventMap = { [key: string]: () => void }

// Define a type for our mock Image object that includes the custom _events property
interface MockImageElement {
    src: string
    onload: () => void
    onerror: () => void
    addEventListener: ((type: string, listener: () => void) => void) & {
        mock: {
            calls: [string, () => void][]
        }
    }
    removeEventListener: () => void
    _events?: EventMap
}

// We will mock the global Image constructor to control its behavior in tests.
const mockImage: MockImageElement = {
    src: '',
    onload: () => {},
    onerror: () => {},
    addEventListener: vi.fn((event: string, callback: () => void) => {
        // Store the callbacks so we can trigger them manually
        const events: EventMap = mockImage._events || {}
        events[event] = callback
        mockImage._events = events
    }),
    removeEventListener: vi.fn(),
}

beforeEach(() => {
    // Before each test, stub the global Image constructor
    vi.stubGlobal(
        'Image',
        vi.fn(() => mockImage)
    )
    // Reset any stored event listeners and mock call history
    delete mockImage._events
    vi.clearAllMocks()
})

afterEach(() => {
    // Restore the original global Image constructor after each test
    vi.unstubAllGlobals()
})

describe('useImageStatus', () => {
    it('should start with a "loading" status', () => {
        const { result } = renderHook(() => useImageStatus('test.jpg'))
        expect(result.current).toBe('loading')
    })

    it('should transition to "loaded" on successful image load', async () => {
        const { result } = renderHook(() => useImageStatus('test.jpg'))

        // Manually trigger the 'load' event
        act(() => {
            const events: EventMap | undefined = mockImage._events
            if (events && events.load) {
                events.load()
            }
        })

        await waitFor(() => {
            expect(result.current).toBe('loaded')
        })
    })

    it('should transition to "error" on image load failure', async () => {
        const { result } = renderHook(() => useImageStatus('test.jpg'))

        // Manually trigger the 'error' event
        act(() => {
            const events: EventMap | undefined = mockImage._events
            if (events && events.error) {
                events.error()
            }
        })

        await waitFor(() => {
            expect(result.current).toBe('error')
        })
    })

    it('should be in "error" state if no src is provided', () => {
        const { result } = renderHook(() => useImageStatus(undefined))
        expect(result.current).toBe('error')
    })

    it('should clean up event listeners on unmount', () => {
        const { unmount } = renderHook(() => useImageStatus('test.jpg'))

        // Verify that listeners were added
        expect(mockImage.addEventListener).toHaveBeenCalledWith(
            'load',
            expect.any(Function)
        )
        expect(mockImage.addEventListener).toHaveBeenCalledWith(
            'error',
            expect.any(Function)
        )

        // Unmount the hook
        unmount()

        // Verify that the cleanup function removed the listeners
        expect(mockImage.removeEventListener).toHaveBeenCalledWith(
            'load',
            expect.any(Function)
        )
        expect(mockImage.removeEventListener).toHaveBeenCalledWith(
            'error',
            expect.any(Function)
        )
    })

    it('should reset to "loading" when the src changes', () => {
        const { result, rerender } = renderHook(
            ({ src }) => useImageStatus(src),
            {
                initialProps: { src: 'initial.jpg' },
            }
        )

        expect(result.current).toBe('loading')

        // Simulate the first image loading successfully
        act(() => {
            const events: EventMap | undefined = mockImage._events
            if (events && events.load) {
                events.load()
            }
        })

        expect(result.current).toBe('loaded')

        // Rerender with a new src prop
        rerender({ src: 'new.jpg' })

        // The hook should immediately go back to the 'loading' state
        expect(result.current).toBe('loading')
    })
})
