import { Component, type ErrorInfo, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import { AlertMessage } from '../AlertMessage/AlertMessage'

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    }

    public static getDerivedStateFromError(_: Error): State {
        console.error('ErrorBoundary: getDerivedStateFromError', _)
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can log the error to an error reporting service here
        console.error('Uncaught error:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Box sx={{ p: 4 }}>
                    <AlertMessage
                        severity="error"
                        message="Something went wrong. Please refresh the page."
                    />
                </Box>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
