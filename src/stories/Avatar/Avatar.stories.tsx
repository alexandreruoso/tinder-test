import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '@mui/material'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
    title: 'Atoms/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Box sx={{ width: '300px', height: '400px' }}>
                <Story />
            </Box>
        ),
    ],
    argTypes: {
        imageId: {
            control: 'text',
            description: 'URL for the profile picture',
        },
        altText: {
            control: 'text',
            description: 'Alt text for accessibility',
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
    args: {
        imageId: '54',
        altText: 'A portrait of Sarah',
    },
}

export const Fallback: Story = {
    args: {
        imageId: undefined,
        altText: 'No image available',
    },
}
