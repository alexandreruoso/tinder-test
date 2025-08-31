import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { MatchDialog } from './MatchDialog'
import { Box } from '@mui/material'

const meta: Meta<typeof MatchDialog> = {
    title: 'Organisms/MatchDialog',
    component: MatchDialog,
    tags: ['autodocs'],
    args: {
        isOpen: true,
        onClose: fn(),
    },
    // Add a decorator to show some background content, demonstrating the overlay effect.
    decorators: [
        (Story) => (
            <Box
                sx={{
                    width: '100%',
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ccc',
                    color: '#333',
                    fontSize: '2rem',
                }}
            >
                Some content on the page
                <Story />
            </Box>
        ),
    ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
