import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { SwipeContainer } from './SwipeContainer'
import type { ProfileDto } from '../../types/api'

const mockProfile: ProfileDto = {
    id: 'user-123',
    name: 'Alex',
    age: 28,
    imageId: '25',
}

describe('SwipeContainer', () => {
    const handleLike = vi.fn()
    const handleDislike = vi.fn()

    afterEach(() => {
        cleanup()
        vi.resetAllMocks()
    })

    // --- Desktop View Tests ---
    describe('Desktop view (isMobile = false)', () => {
        const isMobile = false

        it('renders a profile card and actions', () => {
            render(
                <SwipeContainer
                    profile={mockProfile}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={isMobile}
                />
            )
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
                    isMobile={isMobile}
                />
            )
            expect(screen.getByRole('progressbar')).toBeInTheDocument()
        })

        it('renders an error message when an error is provided', () => {
            const errorMessage = 'Network Error'
            render(
                <SwipeContainer
                    error={errorMessage}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={isMobile}
                />
            )
            expect(screen.getByText(errorMessage)).toBeInTheDocument()
        })

        it('renders a finished message when isFinished is true', () => {
            render(
                <SwipeContainer
                    isFinished
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={isMobile}
                />
            )
            expect(
                screen.getByText("That's everyone for now!")
            ).toBeInTheDocument()
        })

        it('calls onLike with the profile ID when the like button is clicked', async () => {
            render(
                <SwipeContainer
                    profile={mockProfile}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={isMobile}
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
                    isMobile={isMobile}
                />
            )
            await userEvent.click(screen.getByText('Dislike'))
            expect(handleDislike).toHaveBeenCalledWith(mockProfile.id)
        })

        it('renders null if no state flags or profile are provided', () => {
            const { container } = render(
                <SwipeContainer
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={isMobile}
                />
            )
            expect(container.querySelector('.MuiCard-root')).toBeNull()
        })

        it('renders a spinner when loading a new profile', () => {
            render(
                <SwipeContainer
                    profile={mockProfile}
                    isLoading
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={false}
                />
            )

            // Assert that the spinner is visible
            const spinner = screen.getByRole('progressbar')
            expect(spinner).toBeInTheDocument()
            expect(spinner).toHaveAttribute('aria-label', 'Loading...')

            // Assert that the profile card and actions are visible
            const profileCard = screen.getByTestId('profile-card')
            const swipeActions = screen.getByTestId('swipe-actions')
            expect(profileCard).toBeInTheDocument()
            expect(swipeActions).toBeInTheDocument()
            expect(profileCard).toHaveTextContent('Alex, 28')
            expect(swipeActions).toHaveTextContent('Like')
            expect(swipeActions).toHaveTextContent('Dislike')
        })

        it('shows profile when not loading', () => {
            render(
                <SwipeContainer
                    profile={mockProfile}
                    isLoading={false}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={false}
                />
            )
            const profileCard = screen.getByTestId('profile-card')
            expect(profileCard).toBeInTheDocument()
            expect(profileCard).toHaveTextContent('Alex, 28')

            const swipeActions = screen.getByTestId('swipe-actions')
            expect(swipeActions).toBeInTheDocument()
            expect(swipeActions).toHaveTextContent('Like')
            expect(swipeActions).toHaveTextContent('Dislike')
        })

        it('renders null if no state flags or profile are provided', () => {
            const { container } = render(
                <SwipeContainer
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={isMobile}
                />
            )
            expect(container.querySelector('.MuiCard-root')).toBeNull()
        })
    })

    // --- Mobile View Tests ---
    describe('Mobile view (isMobile = true)', () => {
        const isMobile = true

        it('renders a profile card and actions', () => {
            render(
                <SwipeContainer
                    profile={mockProfile}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={isMobile}
                />
            )
            const profileInfoElement = screen.getByRole('paragraph')
            expect(profileInfoElement).toHaveTextContent('Alex, 28')
            expect(screen.getByText('Like')).toBeInTheDocument()
        })

        it('renders a spinner when in loading state', () => {
            render(
                <SwipeContainer
                    isLoading
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={isMobile}
                />
            )
            expect(screen.getByRole('progressbar')).toBeInTheDocument()
        })

        it('calls onLike with the profile ID when the like button is clicked', async () => {
            render(
                <SwipeContainer
                    profile={mockProfile}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={isMobile}
                />
            )
            await userEvent.click(screen.getByText('Like'))
            expect(handleLike).toHaveBeenCalledWith(mockProfile.id)
        })
    })
})
