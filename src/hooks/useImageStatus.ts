import { useState, useEffect } from 'react'

type Status = 'loading' | 'loaded' | 'error'

export const useImageStatus = (src?: string): Status => {
    const [status, setStatus] = useState<Status>(() =>
        src ? 'loading' : 'error'
    )

    useEffect(() => {
        // If no src is provided, set status to error.
        if (!src) {
            setStatus('error')
            return
        }

        // Start in loading state whenever src changes.
        setStatus('loading')

        const img = new Image()
        img.src = src

        const handleLoad = () => {
            setStatus('loaded')
        }

        const handleError = () => {
            setStatus('error')
        }

        img.addEventListener('load', handleLoad)
        img.addEventListener('error', handleError)

        // If the component unmounts
        // while the image is still loading, we remove the event listeners
        // to prevent memory leaks and state updates on an unmounted component.
        return () => {
            img.removeEventListener('load', handleLoad)
            img.removeEventListener('error', handleError)
        }
    }, [src]) // Re-run the effect whenever the image src changes

    return status
}
