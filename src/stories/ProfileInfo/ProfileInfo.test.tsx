import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import { ProfileInfo } from './ProfileInfo'

describe('ProfileInfo', () => {
    afterEach(() => {
        cleanup()
    })

    it('renders the name and age correctly inside the styled container', () => {
        render(<ProfileInfo name="Jessica" age={23} />)

        // Check for the Name content
        const profileInfoElement = screen.getByRole('paragraph')
        expect(profileInfoElement).toHaveTextContent('Jessica, 23')
    })
})
