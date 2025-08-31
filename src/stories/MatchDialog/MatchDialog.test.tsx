import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { MatchDialog } from './MatchDialog'

describe('MatchDialog', () => {
    const handleClose = vi.fn()

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
})
