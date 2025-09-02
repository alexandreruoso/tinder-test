import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { SwipeActions } from './SwipeActions'

describe('SwipeActions', () => {
    const handleLike = vi.fn()
    const handleDislike = vi.fn()

    beforeEach(() => {
        handleLike.mockClear()
        handleDislike.mockClear()
    })

    afterEach(() => {
        cleanup()
    })

    describe('Desktop View', () => {
        const isMobile = false

        it('renders both Like and Dislike buttons', () => {
            render(
                <SwipeActions
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={isMobile}
                />
            )
            expect(
                screen.getByRole('button', { name: 'Like' })
            ).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Dislike' })
            ).toBeInTheDocument()
        })

        it('calls the onLike handler when the Like button is clicked', async () => {
            render(
                <SwipeActions
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={isMobile}
                />
            )
            await userEvent.click(screen.getByRole('button', { name: 'Like' }))
            expect(handleLike).toHaveBeenCalledTimes(1)
        })

        it('calls the onDislike handler when the Dislike button is clicked', async () => {
            render(
                <SwipeActions
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={isMobile}
                />
            )
            await userEvent.click(
                screen.getByRole('button', { name: 'Dislike' })
            )
            expect(handleDislike).toHaveBeenCalledTimes(1)
        })

        it('disables both buttons when the disabled prop is true', () => {
            render(
                <SwipeActions
                    onLike={handleLike}
                    onDislike={handleDislike}
                    disabled
                    isMobile={isMobile}
                />
            )
            expect(screen.getByRole('button', { name: 'Like' })).toBeDisabled()
            expect(
                screen.getByRole('button', { name: 'Dislike' })
            ).toBeDisabled()
        })
    })

    describe('Mobile View', () => {
        const isMobile = true

        it('renders both Like and Dislike buttons', () => {
            render(
                <SwipeActions
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={isMobile}
                />
            )
            expect(
                screen.getByRole('button', { name: 'Like' })
            ).toBeInTheDocument()
        })

        it('calls the onLike handler when the Like button is clicked', async () => {
            render(
                <SwipeActions
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={isMobile}
                />
            )
            await userEvent.click(screen.getByRole('button', { name: 'Like' }))
            expect(handleLike).toHaveBeenCalledTimes(1)
        })

        it('calls the onDislike handler when the Dislike button is clicked', async () => {
            render(
                <SwipeActions
                    onLike={handleLike}
                    onDislike={handleDislike}
                    isMobile={isMobile}
                />
            )
            await userEvent.click(
                screen.getByRole('button', { name: 'Dislike' })
            )
            expect(handleDislike).toHaveBeenCalledTimes(1)
        })

        it('disables both buttons when the disabled prop is true', () => {
            render(
                <SwipeActions
                    onLike={handleLike}
                    onDislike={handleDislike}
                    disabled
                    isMobile={isMobile}
                />
            )
            expect(screen.getByRole('button', { name: 'Like' })).toBeDisabled()
        })
    })
})
