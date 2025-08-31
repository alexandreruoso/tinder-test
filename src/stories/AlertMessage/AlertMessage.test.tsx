import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { AlertMessage } from './AlertMessage'

describe('AlertMessage', () => {
    afterEach(() => {
        cleanup()
    })

    it('renders an error message correctly', () => {
        const errorMessage = 'This is an error.'
        render(<AlertMessage severity="error" message={errorMessage} />)

        // MUI's Alert component has a role of "alert"
        const alert = screen.getByRole('alert')
        expect(alert).toBeInTheDocument()

        // Check for title and message content
        expect(screen.getByText('Error')).toBeInTheDocument()
        expect(screen.getByText(errorMessage)).toBeInTheDocument()

        // Check for the error icon's presence by its title
        expect(screen.getByTestId('ErrorOutlineIcon')).toBeInTheDocument()
    })

    it('renders an info message correctly', () => {
        const infoMessage = 'This is for your information.'
        render(<AlertMessage severity="info" message={infoMessage} />)

        const alert = screen.getByRole('alert')
        expect(alert).toBeInTheDocument()

        // Check for title and message content
        expect(screen.getByText('Information')).toBeInTheDocument()
        expect(screen.getByText(infoMessage)).toBeInTheDocument()

        // Check for the info icon's presence
        expect(screen.getByTestId('InfoOutlinedIcon')).toBeInTheDocument()
    })
})
