import type { Meta, StoryObj } from '@storybook/react'
import { ProfileCard } from './ProfileCard'
import { Box } from '@mui/material'

const meta: Meta<typeof ProfileCard> = {
    title: 'Organisms/ProfileCard',
    component: ProfileCard,
    tags: ['autodocs'],
    argTypes: {
        profile: {
            control: 'object',
        },
    },
    decorators: [
        (Story) => (
            <Box sx={{ width: '300px', height: '400px' }}>
                <Story />
            </Box>
        ),
    ],
}

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
    args: {
        profile: {
            id: '1',
            name: 'Sarah',
            age: 21,
            imageId: '35',
        },
    },
}

export const WithoutImage: Story = {
    args: {
        profile: {
            id: '2',
            name: 'John',
            age: 28,
            imageId: undefined,
        },
    },
}

export const WithLongName: Story = {
    args: {
        profile: {
            id: '3',
            name: 'Maximilian BartholomewdrewLandersonCreutzfeldtJacob',
            age: 32,
            imageId: '44',
        },
    },
}
