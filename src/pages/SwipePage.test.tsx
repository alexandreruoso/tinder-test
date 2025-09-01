import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { SwipePage } from './SwipePage'
import { useSwipeApi } from '../hooks/useSwipeApi'

// Mock the entire custom hook to control its output for component testing
vi.mock('../hooks/useSwipeApi')

const mockProfile = { id: 'user1', name: 'Alex', age: 28 }

describe('SwipePage', () => {
    it('renders the spinner when the hook is in a loading state', () => {
        // Arrange: Mock the hook's return value for this specific test
        vi.mocked(useSwipeApi).mockReturnValue({
            isLoading: true,
            // Provide default values for other properties
            profile: undefined,
            error: undefined,
            isFinished: false,
            isMatch: false,
            likeProfile: vi.fn(),
            dislikeProfile: vi.fn(),
            closeMatchDialog: vi.fn(),
        })

        // Act
        render(<SwipePage />)

        // Assert
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('renders the profile when a profile is loaded', () => {
        // Arrange
        vi.mocked(useSwipeApi).mockReturnValue({
            isLoading: false,
            profile: mockProfile,
            error: undefined,
            isFinished: false,
            isMatch: false,
            likeProfile: vi.fn(),
            dislikeProfile: vi.fn(),
            closeMatchDialog: vi.fn(),
        })

        // Act
        render(<SwipePage />)

        // Assert
        // FIXED: Find the parent paragraph and check its textContent, which ignores internal elements like <span>.
        expect(screen.getByRole('paragraph')).toHaveTextContent('Alex, 28')
        expect(screen.getByRole('button', { name: 'Like' })).toBeInTheDocument()
    })

    it('renders the finished message when isFinished is true', () => {
        // Arrange
        vi.mocked(useSwipeApi).mockReturnValue({
            isLoading: false,
            profile: undefined,
            error: undefined,
            isFinished: true,
            isMatch: false,
            likeProfile: vi.fn(),
            dislikeProfile: vi.fn(),
            closeMatchDialog: vi.fn(),
        })

        // Act
        render(<SwipePage />)

        // Assert
        expect(screen.getByText("That's everyone for now!")).toBeInTheDocument()
    })

    it('renders the error message when an error occurs', () => {
        // Arrange
        vi.mocked(useSwipeApi).mockReturnValue({
            isLoading: false,
            profile: undefined,
            error: 'Something went wrong',
            isFinished: false,
            isMatch: false,
            likeProfile: vi.fn(),
            dislikeProfile: vi.fn(),
            closeMatchDialog: vi.fn(),
        })

        // Act
        render(<SwipePage />)

        // Assert
        expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })

    it('renders the MatchDialog when a match occurs', () => {
        // Arrange
        vi.mocked(useSwipeApi).mockReturnValue({
            isLoading: false,
            profile: mockProfile, // A profile must be present to have a match
            error: undefined,
            isFinished: false,
            isMatch: true,
            likeProfile: vi.fn(),
            dislikeProfile: vi.fn(),
            closeMatchDialog: vi.fn(),
        })

        // Act
        render(<SwipePage />)

        // Assert: The dialog container should be in the document
        expect(screen.getByRole('dialog')).toBeInTheDocument()

        // FIXED: Assert that both parts of the text are visible,
        // since they are separated by a <br> tag.
        expect(screen.getByText(/You got/)).toBeInTheDocument()
        expect(screen.getByText(/match!/)).toBeInTheDocument()
    })
})
