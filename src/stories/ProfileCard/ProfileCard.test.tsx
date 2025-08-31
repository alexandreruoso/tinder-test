import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { ProfileCard } from './ProfileCard'

describe('ProfileCard', () => {
    afterEach(() => {
        cleanup()
    })

    const profileWithImage = {
        name: 'Sarah',
        age: 21,
        imageUrl: 'https://example.com/sarah.jpg',
    }

    const profileWithoutImage = {
        name: 'John',
        age: 28,
    }

    it('renders the name and age correctly inside the styled container', () => {
        render(<ProfileCard profile={profileWithImage} />)

        // Check for the Name content
        const profileInfoElement = screen.getByRole('paragraph')
        expect(profileInfoElement).toHaveTextContent('Sarah, 21')
    })

    it('renders the Avatar with an image when imageUrl is provided', () => {
        render(<ProfileCard profile={profileWithImage} />)
        const image = screen.getByRole('img')
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', profileWithImage.imageUrl)
        expect(image).toHaveAttribute(
            'alt',
            `Profile of ${profileWithImage.name}`
        )
    })

    it('renders the Avatar with fallback text when imageUrl is not provided', () => {
        render(<ProfileCard profile={profileWithoutImage} />)
        expect(screen.getByText('no image')).toBeInTheDocument()
        expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })
})
