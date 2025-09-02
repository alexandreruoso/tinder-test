import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { ProfileCard } from './ProfileCard'
import { useImageStatus } from '../../hooks/useImageStatus'
import type { ProfileDto } from '../../types/api'

// Mock the custom hook used by the child Avatar component
vi.mock('../../hooks/useImageStatus')
const mockedUseImageStatus = vi.mocked(useImageStatus)

describe('ProfileCard', () => {
    afterEach(() => {
        cleanup()
        vi.resetAllMocks()
    })

    const profileWithImage: ProfileDto = {
        name: 'Sarah',
        age: 21,
        imageId: '01',
        id: '01',
    }

    const profileWithoutImage: ProfileDto = {
        name: 'John',
        age: 28,
        id: '1',
        imageId: '03',
    }

    it('renders the name and age correctly inside the styled container', () => {
        // Arrange: It doesn't matter what the image status is for this test
        mockedUseImageStatus.mockReturnValue('loading')

        // Act
        render(<ProfileCard profile={profileWithImage} />)

        // Assert
        const profileInfoElement = screen.getByRole('paragraph')
        expect(profileInfoElement).toHaveTextContent('Sarah, 21')
    })

    it('renders the Avatar with an image when imageId is provided', () => {
        // Arrange: Force the hook to return 'loaded' to show the image
        mockedUseImageStatus.mockReturnValue('loaded')

        // Act
        render(<ProfileCard profile={profileWithImage} />)

        // Assert
        const image = screen.getByRole('img')
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute(
            'alt',
            `Profile of ${profileWithImage.name}`
        )
    })

    it('renders the Avatar with fallback text when imageId is not provided', () => {
        // Arrange: Force the hook to return 'error'
        mockedUseImageStatus.mockReturnValue('error')

        // Act
        render(<ProfileCard profile={profileWithoutImage} />)

        // Assert
        expect(screen.getByText('Image not available')).toBeInTheDocument()
        expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })
})
