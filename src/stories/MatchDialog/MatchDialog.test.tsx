import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { MatchDialog } from './MatchDialog'

// The useMediaQuery mock is no longer needed as the component now receives a prop.

describe('MatchDialog', () => {
    const handleClose = vi.fn()

    beforeEach(() => {
        // Clear mock history before each test
        handleClose.mockClear()
    })

    afterEach(() => {
        cleanup()
    })

    it('does not render when isOpen is false', () => {
        render(
            <MatchDialog
                isOpen={false}
                onClose={handleClose}
                isMobile={false}
            />
        )
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    // These tests implicitly cover the isMobile={false} (desktop) case
    describe('Desktop view', () => {
        it('renders correctly when isOpen is true', () => {
            render(
                <MatchDialog
                    isOpen={true}
                    onClose={handleClose}
                    isMobile={false}
                />
            )

            const dialog = screen.getByRole('dialog')
            expect(dialog).toBeInTheDocument()
            expect(screen.getByText(/You got/)).toBeInTheDocument()
            expect(screen.getByText(/match!/)).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Okay' })
            ).toBeInTheDocument()
        })

        it('calls onClose when the "Okay" button is clicked', async () => {
            render(
                <MatchDialog
                    isOpen={true}
                    onClose={handleClose}
                    isMobile={false}
                />
            )
            await userEvent.click(screen.getByRole('button', { name: 'Okay' }))
            expect(handleClose).toHaveBeenCalledTimes(1)
        })
    })

    // NEW: Added a separate block to explicitly test the mobile state
    describe('Mobile view', () => {
        it('renders correctly when isOpen is true and isMobile is true', () => {
            render(
                <MatchDialog
                    isOpen={true}
                    onClose={handleClose}
                    isMobile={true}
                />
            )

            const dialog = screen.getByRole('dialog')
            expect(dialog).toBeInTheDocument()
            expect(screen.getByText(/You got/)).toBeInTheDocument()
            expect(screen.getByText(/match!/)).toBeInTheDocument()
            expect(
                screen.getByRole('button', { name: 'Okay' })
            ).toBeInTheDocument()
        })

        it('calls onClose when the "Okay" button is clicked in mobile view', async () => {
            render(
                <MatchDialog
                    isOpen={true}
                    onClose={handleClose}
                    isMobile={true}
                />
            )
            await userEvent.click(screen.getByRole('button', { name: 'Okay' }))
            expect(handleClose).toHaveBeenCalledTimes(1)
        })
    })
})
