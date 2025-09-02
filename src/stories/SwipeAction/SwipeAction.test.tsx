import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { SwipeActions } from './SwipeActions'

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

describe('SwipeActions', () => {
    const handleLike = vi.fn()
    const handleDislike = vi.fn()

    beforeEach(() => {
        handleLike.mockClear()
        handleDislike.mockClear()
        // Reset to default desktop behavior
        mockUseMediaQuery.mockReturnValue(false)
    })

    afterEach(() => {
        cleanup()
    })

    it('renders both Like and Dislike buttons', () => {
        render(<SwipeActions onLike={handleLike} onDislike={handleDislike} />)

        expect(screen.getByRole('button', { name: 'Like' })).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Dislike' })
        ).toBeInTheDocument()
    })

    it('calls the onLike handler when the Like button is clicked', async () => {
        render(<SwipeActions onLike={handleLike} onDislike={handleDislike} />)
        await userEvent.click(screen.getByRole('button', { name: 'Like' }))

        expect(handleLike).toHaveBeenCalledTimes(1)
        expect(handleDislike).not.toHaveBeenCalled()
    })

    it('calls the onDislike handler when the Dislike button is clicked', async () => {
        render(<SwipeActions onLike={handleLike} onDislike={handleDislike} />)
        await userEvent.click(screen.getByRole('button', { name: 'Dislike' }))

        expect(handleDislike).toHaveBeenCalledTimes(1)
        expect(handleLike).not.toHaveBeenCalled()
    })

    it('disables both buttons when the disabled prop is true', () => {
        render(
            <SwipeActions
                onLike={handleLike}
                onDislike={handleDislike}
                disabled
            />
        )

        expect(screen.getByRole('button', { name: 'Like' })).toBeDisabled()
        expect(screen.getByRole('button', { name: 'Dislike' })).toBeDisabled()
    })

    // NEW: Mobile-specific tests to cover missing branches
    describe('Mobile view', () => {
        beforeEach(() => {
            // Override to mobile view for these tests
            mockUseMediaQuery.mockReturnValue(true)
        })

        it('renders both Like and Dislike buttons in mobile view', () => {
            render(
                <SwipeActions onLike={handleLike} onDislike={handleDislike} />
            )

            expect(
                screen.getByRole('button', { name: 'Like' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Dislike' })
            ).toBeInTheDocument()
        })

        it('calls the onLike handler when the Like button is clicked in mobile view', async () => {
            render(
                <SwipeActions onLike={handleLike} onDislike={handleDislike} />
            )
            await userEvent.click(screen.getByRole('button', { name: 'Like' }))

            expect(handleLike).toHaveBeenCalledTimes(1)
            expect(handleDislike).not.toHaveBeenCalled()
        })

        it('calls the onDislike handler when the Dislike button is clicked in mobile view', async () => {
            render(
                <SwipeActions onLike={handleLike} onDislike={handleDislike} />
            )
            await userEvent.click(
                screen.getByRole('button', { name: 'Dislike' })
            )

            expect(handleDislike).toHaveBeenCalledTimes(1)
            expect(handleLike).not.toHaveBeenCalled()
        })

        it('disables both buttons when the disabled prop is true in mobile view', () => {
            render(
                <SwipeActions
                    onLike={handleLike}
                    onDislike={handleDislike}
                    disabled
                />
            )

            expect(screen.getByRole('button', { name: 'Like' })).toBeDisabled()
            expect(
                screen.getByRole('button', { name: 'Dislike' })
            ).toBeDisabled()
        })
    })
})
