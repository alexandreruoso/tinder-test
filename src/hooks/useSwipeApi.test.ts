import { renderHook, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import apiClient from '../api/client'
import { useSwipeApi } from './useSwipeApi'

// Mock the entire apiClient module so we can control its behavior in our tests
vi.mock('../api/client')

// Reusable mock data to keep tests clean and consistent
const mockProfile = {
    id: 'user1',
    name: 'Alex',
    age: 28,
    imageUrl: 'url-to-image',
}

describe('useSwipeApi', () => {
    // Before each test, reset the mock functions to ensure tests are isolated
    beforeEach(() => {
        vi.mocked(apiClient.get).mockReset()
        vi.mocked(apiClient.post).mockReset()
    })

    it('should start in a loading state and fetch a profile successfully', async () => {
        // Arrange: Mock a successful API response for the initial profile fetch
        vi.mocked(apiClient.get).mockResolvedValue({ data: mockProfile })

        // Act: Render the hook, which triggers the initial useEffect fetch
        const { result } = renderHook(() => useSwipeApi())

        // Assert: Check that the initial state is correct (loading)
        expect(result.current.isLoading).toBe(true)
        expect(result.current.profile).toBe(undefined)

        // Assert: Wait for the API call to resolve and check the final, successful state
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
            expect(result.current.profile).toEqual(mockProfile)
            expect(result.current.error).toBe(undefined)
            expect(result.current.isFinished).toBe(false)
            // Verify that the correct API endpoint was called
            expect(apiClient.get).toHaveBeenCalledWith('/profiles/next')
        })
    })

    // THIS IS THE TEST CASE FOR RUNNING OUT OF PROFILES
    it('should handle the "finished" state when the API returns a 404 status', async () => {
        // Arrange: Mock the API to return a 404 error, which simulates "no more profiles"
        vi.mocked(apiClient.get).mockRejectedValue({
            response: { status: 404 },
        })

        // Act: Render the hook
        const { result } = renderHook(() => useSwipeApi())

        // Assert: Wait for the API call to resolve and check the "finished" state
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
            expect(result.current.isFinished).toBe(true) // This is the key assertion
            expect(result.current.profile).toBe(undefined) // No profile should be set
            expect(result.current.error).toBe(undefined) // It's not an error, just a finished state
        })
    })

    it('should handle a generic API error during the initial fetch', async () => {
        // Arrange: Mock a generic network error (e.g., server is down)
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Network Error'))

        // Act: Render the hook
        const { result } = renderHook(() => useSwipeApi())

        // Assert: Wait for the API call to fail and check the error state
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
            expect(result.current.error).toBe(
                'Failed to load profiles. Please try again.'
            )
            expect(result.current.profile).toBe(undefined)
        })
    })

    it('should handle a "like" action that is NOT a match', async () => {
        // Arrange: Mock the initial load and the subsequent "like" response
        vi.mocked(apiClient.get).mockResolvedValue({ data: mockProfile })
        vi.mocked(apiClient.post).mockResolvedValue({ data: { match: false } })

        const { result } = renderHook(() => useSwipeApi())
        await waitFor(() => expect(result.current.isLoading).toBe(false)) // Wait for initial load

        // Act: Call the likeProfile function provided by the hook
        await act(async () => {
            await result.current.likeProfile('user1')
        })

        // Assert: Verify the POST call was made and that a new profile was fetched immediately
        expect(apiClient.post).toHaveBeenCalledWith('/profiles/user1/like')
        expect(apiClient.get).toHaveBeenCalledTimes(2) // 1. Initial fetch, 2. Fetch after like
    })

    it('should handle a "like" action that IS a match', async () => {
        // Arrange
        vi.mocked(apiClient.get).mockResolvedValue({ data: mockProfile })
        vi.mocked(apiClient.post).mockResolvedValue({ data: { match: true } })

        const { result } = renderHook(() => useSwipeApi())
        await waitFor(() => expect(result.current.isLoading).toBe(false))

        // Act
        await act(async () => {
            await result.current.likeProfile('user1')
        })

        // Assert
        expect(result.current.isMatch).toBe(true)
        // It should NOT have fetched the next profile yet, as it waits for the user to dismiss the match dialog
        expect(apiClient.get).toHaveBeenCalledTimes(1)
    })

    it('should handle a "dislike" action', async () => {
        // Arrange
        vi.mocked(apiClient.get).mockResolvedValue({ data: mockProfile })
        vi.mocked(apiClient.post).mockResolvedValue({}) // Dislike has an empty success response

        const { result } = renderHook(() => useSwipeApi())
        await waitFor(() => expect(result.current.isLoading).toBe(false))

        // Act
        await act(async () => {
            await result.current.dislikeProfile('user1')
        })

        // Assert
        expect(apiClient.post).toHaveBeenCalledWith('/profiles/user1/dislike')
        expect(apiClient.get).toHaveBeenCalledTimes(2) // Fetched next profile immediately
    })

    it('should fetch the next profile after closing the match dialog', async () => {
        // Arrange: First, get the hook into a "matched" state
        vi.mocked(apiClient.get).mockResolvedValue({ data: mockProfile })
        vi.mocked(apiClient.post).mockResolvedValue({ data: { match: true } })
        const { result } = renderHook(() => useSwipeApi())
        await waitFor(() => expect(result.current.isLoading).toBe(false))
        await act(async () => {
            await result.current.likeProfile('user1')
        })
        expect(result.current.isMatch).toBe(true) // Pre-condition check

        // Act: Call the function to close the dialog
        act(() => {
            result.current.closeMatchDialog()
        })

        // Assert: The match state is cleared, and a new profile fetch is triggered
        expect(result.current.isMatch).toBe(false)
        expect(apiClient.get).toHaveBeenCalledTimes(2)
    })

    it('should set an error state if liking a profile fails', async () => {
        // Arrange
        vi.mocked(apiClient.get).mockResolvedValue({ data: mockProfile })
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
        // Ensure we didn't try to fetch a new profile on failure
        expect(apiClient.get).toHaveBeenCalledTimes(1)
    })

    it('should set an error state if disliking a profile fails', async () => {
        // Arrange
        vi.mocked(apiClient.get).mockResolvedValue({ data: mockProfile })
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
        expect(apiClient.get).toHaveBeenCalledTimes(1)
    })
})
