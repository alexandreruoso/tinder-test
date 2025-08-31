import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { Spinner } from './Spinner'

describe('Spinner', () => {
    afterEach(() => {
        cleanup()
    })

    it('renders the circular progress indicator', () => {
        render(<Spinner />)

        // The CircularProgress component has a role of "progressbar"
        const progressbar = screen.getByRole('progressbar')
        expect(progressbar).toBeInTheDocument()
    })

    it('applies the correct size to the progress indicator', () => {
        render(<Spinner size={60} />)

        const progressbar = screen.getByRole('progressbar')
        // Note: The size is applied via inline styles
        expect(progressbar).toHaveStyle({ width: '60px', height: '60px' })
    })
})
