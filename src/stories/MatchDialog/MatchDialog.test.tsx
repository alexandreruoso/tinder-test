import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { MatchDialog } from './MatchDialog'

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

describe('MatchDialog', () => {
    const handleClose = vi.fn()

    beforeEach(() => {
        // Reset to default desktop behavior
        mockUseMediaQuery.mockReturnValue(false)
    })

    afterEach(() => {
        cleanup()
        handleClose.mockClear()
    })

    it('does not render when isOpen is false', () => {
        render(<MatchDialog isOpen={false} onClose={handleClose} />)
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('renders correctly when isOpen is true', () => {
        render(<MatchDialog isOpen={true} onClose={handleClose} />)

        const dialog = screen.getByRole('dialog')
        expect(dialog).toBeInTheDocument()

        // Check for the celebratory text
        expect(screen.getByText(/You got/)).toBeInTheDocument()
        expect(screen.getByText(/match!/)).toBeInTheDocument()

        // Check for the action button by its accessible name
        expect(screen.getByRole('button', { name: 'Okay' })).toBeInTheDocument()
    })

    it('calls onClose when the "Okay" button is clicked', async () => {
        render(<MatchDialog isOpen={true} onClose={handleClose} />)

        await userEvent.click(screen.getByRole('button', { name: 'Okay' }))
        expect(handleClose).toHaveBeenCalledTimes(1)
    })

    // NEW: Mobile-specific tests to cover missing branches
    describe('Mobile view', () => {
        beforeEach(() => {
            // Override to mobile view for these tests
            mockUseMediaQuery.mockReturnValue(true)
        })

        it('renders correctly in mobile view', () => {
            render(<MatchDialog isOpen={true} onClose={handleClose} />)

            const dialog = screen.getByRole('dialog')
            expect(dialog).toBeInTheDocument()

            // Check for the celebratory text
            expect(screen.getByText(/You got/)).toBeInTheDocument()
            expect(screen.getByText(/match!/)).toBeInTheDocument()

            // Check for the action button by its accessible name
            expect(
                screen.getByRole('button', { name: 'Okay' })
            ).toBeInTheDocument()
        })

        it('calls onClose when the "Okay" button is clicked in mobile view', async () => {
            render(<MatchDialog isOpen={true} onClose={handleClose} />)

            await userEvent.click(screen.getByRole('button', { name: 'Okay' }))
            expect(handleClose).toHaveBeenCalledTimes(1)
        })
    })
})
