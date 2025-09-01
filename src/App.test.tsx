import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'
import { useSwipeApi } from './hooks/useSwipeApi'

// Mock the custom hook to control its output during the test
vi.mock('./hooks/useSwipeApi')

describe('App', () => {
    it('should render the main application header and initial loading state', () => {
        // Arrange: Mock the return value of the hook for this specific test.
        // We'll simulate the initial "loading" state.
        vi.mocked(useSwipeApi).mockReturnValue({
            isLoading: true,
            profile: undefined,
            error: undefined,
            isFinished: false,
            isMatch: false,
            likeProfile: vi.fn(),
            dislikeProfile: vi.fn(),
            closeMatchDialog: vi.fn(),
        })

        // Act: Render the entire App component
        render(<App />)

        // Assert: Check that the main app header is visible
        expect(
            screen.getByRole('heading', { name: /Tinder Clone/i })
        ).toBeInTheDocument()

        // Assert: Check that the loading spinner is rendered because our mocked hook
        // returns isLoading: true
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })
})
