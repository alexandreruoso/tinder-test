import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import ErrorBoundary from './BoundaryError'

// 1. Creare un componente progettato per generare un errore
const ProblemChild = () => {
    throw new Error('Test Error')
}

// 2. Un componente che si renderizza senza errori
const GoodChild = () => <div>Child Component</div>

describe('ErrorBoundary', () => {
    // Utilizzare ReturnType per inferire il tipo corretto direttamente dalla funzione spyOn
    let consoleErrorSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
        // 3. Sopprimere la visualizzazione del messaggio di errore atteso nella console
        consoleErrorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})
    })

    afterEach(() => {
        // Ripristinare la funzione console.error originale
        consoleErrorSpy.mockRestore()
    })

    it('should render children when there is no error', () => {
        // Arrange & Act
        render(
            <ErrorBoundary>
                <GoodChild />
            </ErrorBoundary>
        )

        // Assert
        expect(screen.getByText('Child Component')).toBeInTheDocument()
    })

    it('should render the fallback UI when a child throws an error', () => {
        // Arrange & Act
        render(
            <ErrorBoundary>
                <ProblemChild />
            </ErrorBoundary>
        )

        // Assert che venga visualizzata l'interfaccia di fallback
        expect(
            screen.getByText('Something went wrong. Please refresh the page.')
        ).toBeInTheDocument()

        // Assert che il componente problematico non venga renderizzato
        expect(screen.queryByText('Child Component')).not.toBeInTheDocument()

        // Assert che componentDidCatch sia stato chiamato (controllando lo spy sulla console)
        expect(consoleErrorSpy).toHaveBeenCalled()
    })
})
