import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

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
