import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { Avatar } from './Avatar'
import { useImageStatus } from '../../hooks/useImageStatus'

// Mock the custom hook to control its output
vi.mock('../../hooks/useImageStatus')
const mockedUseImageStatus = vi.mocked(useImageStatus)

const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL

describe('Avatar', () => {
    afterEach(() => {
        cleanup()
        vi.resetAllMocks()
    })

    it('renders an image when imageId is provided and status is "loaded"', () => {
        // Arrange: Force the hook to return 'loaded'
        mockedUseImageStatus.mockReturnValue('loaded')

        const testimageId = '25'
        const testAltText = 'Test Alt Text'

        // Act
        render(<Avatar imageId={testimageId} altText={testAltText} />)

        // Assert
        const imgElement = screen.getByRole('img')
        expect(imgElement).toBeInTheDocument()
        expect(imgElement).toHaveAttribute(
            'src',
            `${imageBaseUrl}/${testimageId}/400/600`
        )
        expect(imgElement).toHaveAttribute('alt', testAltText)
    })

    it('renders the fallback text "Image not available" when status is "error"', () => {
        // Arrange: Force the hook to return 'error'
        mockedUseImageStatus.mockReturnValue('error')

        // Act
        render(<Avatar altText="No image available" />)

        // Assert
        const fallbackText = screen.getByText('Image not available')
        expect(fallbackText).toBeInTheDocument()
        const imgElement = screen.queryByRole('img')
        expect(imgElement).not.toBeInTheDocument()
    })

    it('renders a skeleton when status is "loading"', () => {
        // Arrange: Force the hook to return 'loading'
        mockedUseImageStatus.mockReturnValue('loading')

        // Act
        render(<Avatar imageId="25" altText="Test Alt Text" />)

        // The Skeleton component does not have an explicit role,
        // so we check for its presence by making sure the image and fallback text are NOT there.
        expect(screen.queryByRole('img')).not.toBeInTheDocument()
        expect(
            screen.queryByText('Image not available')
        ).not.toBeInTheDocument()
    })
})
