import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { SwipePage } from './pages/SwipePage'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import ErrorBoundary from './stories/BoundaryError/BoundaryError'

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Viewport container to center the app frame */}
            <Box
                sx={{
                    display: 'grid',
                    placeItems: 'center',
                    minHeight: '100vh',
                    width: '100vw',
                }}
                data-testid="app-container"
            >
                <ErrorBoundary>
                    <SwipePage />
                </ErrorBoundary>
            </Box>
        </ThemeProvider>
    )
}

export default App
