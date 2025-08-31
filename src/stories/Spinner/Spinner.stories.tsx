import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '@mui/material'
import { Spinner } from './Spinner'

const meta: Meta<typeof Spinner> = {
    title: 'Atoms/Spinner',
    component: Spinner,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Box sx={{ width: '100px', height: '100px' }}>
                <Story />
            </Box>
        ),
    ],
    argTypes: {
        size: {
            control: { type: 'number', min: 10, max: 100, step: 1 },
            description: 'The size of the spinner in pixels.',
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        size: 40,
    },
}

export const Large: Story = {
    args: {
        size: 80,
    },
}
