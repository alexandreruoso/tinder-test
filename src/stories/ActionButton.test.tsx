import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ActionButton } from './ActionButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

describe('ActionButton', () => {
    const handleClick = vi.fn()
    const label = 'Test Action'

    beforeEach(() => {
        handleClick.mockClear()
    })

    afterEach(() => {
        cleanup()
    })

    it('renders with the correct text label', () => {
        render(
            <ActionButton
                IconComponent={CheckCircleIcon}
                color="success"
                onClick={handleClick}
                label={label}
            />
        )

        const button = screen.getByRole('button', { name: label })
        expect(button).toBeInTheDocument()
    })

    it('calls onClick when clicked', async () => {
        render(
            <ActionButton
                IconComponent={CheckCircleIcon}
                color="success"
                onClick={handleClick}
                label={label}
            />
        )
        await userEvent.click(screen.getByRole('button', { name: label }))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('is disabled when the disabled prop is true', async () => {
        render(
            <ActionButton
                IconComponent={CheckCircleIcon}
                color="success"
                onClick={handleClick}
                label={label}
                disabled
            />
        )
        const button = screen.getByRole('button', { name: label })
        expect(button).toBeDisabled()
    })
})
