import { CssBaseline, Box, Typography } from '@mui/material'
import { SwipePage } from './pages/SwipePage'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

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
            >
                {/* visually hidden header to the page */}
                <Typography
                    variant="h1"
                    sx={{ position: 'absolute', left: -9999 }}
                >
                    Tinder Clone
                </Typography>
                <SwipePage />
            </Box>
        </ThemeProvider>
    )
}

export default App
