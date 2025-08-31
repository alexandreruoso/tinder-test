import type { Meta, StoryObj } from '@storybook/react'
import { Box } from '@mui/material'
import { ProfileInfo } from './ProfileInfo'

const meta: Meta<typeof ProfileInfo> = {
    title: 'Atoms/ProfileInfo',
    component: ProfileInfo,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            // The ProfileInfo component is designed to be an overlay,
            // so we add a container with a background to visualize it properly.
            <Box
                sx={{
                    position: 'relative',
                    width: '345px',
                    height: '120px',
                    backgroundImage: 'url(https://i.pravatar.cc/400?u=jessica)',
                    backgroundSize: 'cover',
                }}
            >
                <Story />
            </Box>
        ),
    ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        name: 'Jessica',
        age: 23,
    },
}

export const LongName: Story = {
    args: {
        name: 'JessicaLongNameLongNameJessicaLongNameLongNameJessica',
        age: 233,
    },
}
