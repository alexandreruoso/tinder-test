import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { Avatar } from './Avatar'

describe('Avatar', () => {
    afterEach(() => {
        cleanup()
    })

    it('renders an image when imageUrl is provided', () => {
        const testImageUrl = 'https://example.com/image.jpg'
        const testAltText = 'Test Alt Text'
        render(<Avatar imageUrl={testImageUrl} altText={testAltText} />)

        const imgElement = screen.getByRole('img')
        expect(imgElement).toBeInTheDocument()
        expect(imgElement).toHaveAttribute('src', testImageUrl)
        expect(imgElement).toHaveAttribute('alt', testAltText)
    })

    it('renders the fallback text "no image" when imageUrl is undefined', () => {
        render(<Avatar altText="No image available" />)

        const fallbackText = screen.getByText('no image')
        expect(fallbackText).toBeInTheDocument()

        const imgElement = screen.queryByRole('img')
        expect(imgElement).not.toBeInTheDocument()
    })
})
