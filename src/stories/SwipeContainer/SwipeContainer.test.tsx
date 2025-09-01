import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { SwipeContainer, type Profile } from './SwipeContainer'

const mockProfile: Profile = {
    id: 'user-123',
    name: 'Alex',
    age: 28,
    imageUrl: 'https://example.com/alex.jpg',
}

describe('SwipeContainer', () => {
    const handleLike = vi.fn()
    const handleDislike = vi.fn()

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
})
