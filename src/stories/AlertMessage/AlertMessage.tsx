import { Alert, AlertTitle } from '@mui/material'

export interface AlertMessageProps {
    /**
     * The severity of the alert, which determines the color and icon.
     */
    severity: 'error' | 'info'
    /**
     * The main message content of the alert.
     */
    message: string
}

/**
 * A molecule component for displaying contextual feedback messages, such as
 * API errors or informational notes (e.g., "No more profiles").
 */
export const AlertMessage = ({ severity, message }: AlertMessageProps) => {
    const title = severity === 'error' ? 'Error' : 'Information'

    return (
        <Alert severity={severity} sx={{ justifyContent: 'center' }}>
            <AlertTitle>{title}</AlertTitle>
            {message}
        </Alert>
    )
}
