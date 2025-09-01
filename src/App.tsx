import { CssBaseline, Box } from '@mui/material'
import { SwipePage } from './pages/SwipePage'

/**
 * The root component of the application.
 * It centers a portrait-oriented "app frame" in the viewport.
 */
function App() {
    return (
        <>
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
                <SwipePage />
            </Box>
        </>
    )
}

export default App
