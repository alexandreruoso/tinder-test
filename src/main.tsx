import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'

// Create a client
const queryClient = new QueryClient()

// Set the title of the document
document.title = import.meta.env.VITE_APP_TITLE || 'Default App Title'

/**
 * Starts the MSW in a development environment.
 */
async function enableMocking() {
    // Use Vite's `import.meta.env.DEV` to check for development mode.
    if (!import.meta.env.DEV) {
        return
    }

    const { worker } = await import('./mocks/browser')

    // `onunhandledrejection` is a common issue that happens when mocking.
    // We recommend adding this handler to aid in debugging.
    window.addEventListener('unhandledrejection', (event) => {
        event.promise.catch((error) => {
            console.error('Unhandled rejection:', error)
        })
    })

    // Start the service worker with a quiet option to avoid spamming the console.
    return worker.start({
        onUnhandledRequest: 'bypass',
        quiet: true,
    })
}

// Enable mocking, then render the application.
enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </StrictMode>
    )
})
