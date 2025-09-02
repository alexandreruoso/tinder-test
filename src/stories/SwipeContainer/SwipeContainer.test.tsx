import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { SwipeContainer, type Profile } from './SwipeContainer'

// Mock useMediaQuery with default desktop behavior
vi.mock('@mui/material', async () => {
    const actual = await vi.importActual('@mui/material')
    return {
        ...actual,
        useMediaQuery: vi.fn(() => false), // Default to desktop
    }
})

// Import the mocked useMediaQuery for control in tests
import { useMediaQuery } from '@mui/material'
const mockUseMediaQuery = vi.mocked(useMediaQuery)

const mockProfile: Profile = {
    id: 'user-123',
    name: 'Alex',
    age: 28,
    imageUrl: 'https://example.com/alex.jpg',
}

describe('SwipeContainer', () => {
    const handleLike = vi.fn()
    const handleDislike = vi.fn()

    beforeEach(() => {
        // Reset to default desktop behavior
        mockUseMediaQuery.mockReturnValue(false)
    })

    afterEach(() => {
        cleanup()
        vi.resetAllMocks()
    })

    it('renders a profile card and actions when a profile is provided', () => {
        render(
            <SwipeContainer
                profile={mockProfile}
                onLike={handleLike}
                onDislike={handleDislike}
            />
        )
        // Check for the Name content using a more robust query
        const profileInfoElement = screen.getByRole('paragraph')
        expect(profileInfoElement).toHaveTextContent('Alex, 28')

        expect(screen.getByText('Like')).toBeInTheDocument()
        expect(screen.getByText('Dislike')).toBeInTheDocument()
    })

    it('renders a spinner when in loading state', () => {
        render(
            <SwipeContainer
                isLoading
                onLike={handleLike}
                onDislike={handleDislike}
            />
        )
        expect(screen.getByRole('progressbar')).toBeInTheDocument()
        const profileInfoElement = screen.queryByRole('paragraph', {
            name: /Alex, 28/i,
        })
        expect(profileInfoElement).not.toBeInTheDocument()
    })

    it('renders an error message when an error is provided', () => {
        const errorMessage = 'Network Error'
        render(
            <SwipeContainer
                error={errorMessage}
                onLike={handleLike}
                onDislike={handleDislike}
            />
        )
        expect(screen.getByText(errorMessage)).toBeInTheDocument()
        expect(
            screen.queryByRole('button', { name: /Like/i })
        ).not.toBeInTheDocument()
    })

    it('renders a finished message when isFinished is true', () => {
        render(
            <SwipeContainer
                isFinished
                onLike={handleLike}
                onDislike={handleDislike}
            />
        )
        expect(screen.getByText("That's everyone for now!")).toBeInTheDocument()
        expect(
            screen.queryByRole('button', { name: /Like/i })
        ).not.toBeInTheDocument()
    })

    it('calls onLike with the profile ID when the like button is clicked', async () => {
        render(
            <SwipeContainer
                profile={mockProfile}
                onLike={handleLike}
                onDislike={handleDislike}
            />
        )
        await userEvent.click(screen.getByText('Like'))
        expect(handleLike).toHaveBeenCalledWith(mockProfile.id)
    })

    it('calls onDislike with the profile ID when the dislike button is clicked', async () => {
        render(
            <SwipeContainer
                profile={mockProfile}
                onLike={handleLike}
                onDislike={handleDislike}
            />
        )
        await userEvent.click(screen.getByText('Dislike'))
        expect(handleDislike).toHaveBeenCalledWith(mockProfile.id)
    })

    it('disables action buttons when loading', () => {
        render(
            <SwipeContainer
                profile={mockProfile}
                onLike={handleLike}
                onDislike={handleDislike}
            />
        )
        expect(screen.getByText('Like')).not.toBeDisabled()
        expect(screen.getByText('Dislike')).not.toBeDisabled()
    })

    // This is the new test case to cover the `return null` branch
    it('should render nothing if no state flags are active and no profile is provided', () => {
        const { container } = render(
            <SwipeContainer onLike={handleLike} onDislike={handleDislike} />
        )

        // The main container Box will exist, but it should not have any children
        // representing the profile, spinner, or alerts.
        expect(container.querySelector('.MuiCard-root')).toBeNull()
        expect(container.querySelector('.MuiCircularProgress-root')).toBeNull()
        expect(container.querySelector('.MuiAlert-root')).toBeNull()
    })

    // NEW: Mobile-specific tests to cover missing branches
    describe('Mobile view', () => {
        beforeEach(() => {
            // Override to mobile view for these tests
            mockUseMediaQuery.mockReturnValue(true)
        })

        it('renders a profile card and actions when a profile is provided in mobile view', () => {
            render(
                <SwipeContainer
                    profile={mockProfile}
                    onLike={handleLike}
                    onDislike={handleDislike}
                />
            )
            // Check for the Name content using a more robust query
            const profileInfoElement = screen.getByRole('paragraph')
            expect(profileInfoElement).toHaveTextContent('Alex, 28')

            expect(screen.getByText('Like')).toBeInTheDocument()
            expect(screen.getByText('Dislike')).toBeInTheDocument()
        })

        it('renders a spinner when in loading state in mobile view', () => {
            render(
                <SwipeContainer
                    isLoading
                    onLike={handleLike}
                    onDislike={handleDislike}
                />
            )
            expect(screen.getByRole('progressbar')).toBeInTheDocument()
            const profileInfoElement = screen.queryByRole('paragraph', {
                name: /Alex, 28/i,
            })
            expect(profileInfoElement).not.toBeInTheDocument()
        })

        it('renders an error message when an error is provided in mobile view', () => {
            const errorMessage = 'Network Error'
            render(
                <SwipeContainer
                    error={errorMessage}
                    onLike={handleLike}
                    onDislike={handleDislike}
                />
            )
            expect(screen.getByText(errorMessage)).toBeInTheDocument()
            expect(
                screen.queryByRole('button', { name: /Like/i })
            ).not.toBeInTheDocument()
        })

        it('renders a finished message when isFinished is true in mobile view', () => {
            render(
                <SwipeContainer
                    isFinished
                    onLike={handleLike}
                    onDislike={handleDislike}
                />
            )
            expect(
                screen.getByText("That's everyone for now!")
            ).toBeInTheDocument()
            expect(
                screen.queryByRole('button', { name: /Like/i })
            ).not.toBeInTheDocument()
        })

        it('calls onLike with the profile ID when the like button is clicked in mobile view', async () => {
            render(
                <SwipeContainer
                    profile={mockProfile}
                    onLike={handleLike}
                    onDislike={handleDislike}
                />
            )
            await userEvent.click(screen.getByText('Like'))
            expect(handleLike).toHaveBeenCalledWith(mockProfile.id)
        })

        it('calls onDislike with the profile ID when the dislike button is clicked in mobile view', async () => {
            render(
                <SwipeContainer
                    profile={mockProfile}
                    onLike={handleLike}
                    onDislike={handleDislike}
                />
            )
            await userEvent.click(screen.getByText('Dislike'))
            expect(handleDislike).toHaveBeenCalledWith(mockProfile.id)
        })

        it('disables action buttons when loading in mobile view', () => {
            render(
                <SwipeContainer
                    profile={mockProfile}
                    onLike={handleLike}
                    onDislike={handleDislike}
                />
            )
            expect(screen.getByText('Like')).not.toBeDisabled()
            expect(screen.getByText('Dislike')).not.toBeDisabled()
        })

        it('should render nothing if no state flags are active and no profile is provided in mobile view', () => {
            const { container } = render(
                <SwipeContainer onLike={handleLike} onDislike={handleDislike} />
            )

            // The main container Box will exist, but it should not have any children
            // representing the profile, spinner, or alerts.
            expect(container.querySelector('.MuiCard-root')).toBeNull()
            expect(
                container.querySelector('.MuiCircularProgress-root')
            ).toBeNull()
            expect(container.querySelector('.MuiAlert-root')).toBeNull()
        })
    })
})
