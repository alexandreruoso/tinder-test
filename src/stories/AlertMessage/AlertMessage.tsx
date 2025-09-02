import { Alert, AlertTitle } from '@mui/material'

export interface AlertMessageProps {
    severity: 'error' | 'info'
    message: string
}

export const AlertMessage = ({ severity, message }: AlertMessageProps) => {
    const title = severity === 'error' ? 'Error' : 'Information'

    return (
        <Alert severity={severity} sx={{ justifyContent: 'center' }}>
            <AlertTitle>{title}</AlertTitle>
            {message}
        </Alert>
    )
}
