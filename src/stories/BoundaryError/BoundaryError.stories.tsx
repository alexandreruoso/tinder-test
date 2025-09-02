import type { Meta, StoryObj } from '@storybook/react'
import ErrorBoundary from './BoundaryError.tsx'
import { Box, Typography, Button } from '@mui/material'
import { useState } from 'react'

// Meta configuration for the Storybook
const meta: Meta<typeof ErrorBoundary> = {
    title: 'Utilities/ErrorBoundary',
    component: ErrorBoundary,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'A component that catches JavaScript errors anywhere in its child component tree, logs those errors, and displays a fallback UI instead of the component tree that crashed.',
            },
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

const GoodChild = () => (
    <Typography>This component renders correctly.</Typography>
)

const ProblemChild = () => {
    throw new Error('This is a simulated rendering error!')
}

const TriggerableProblemChild = () => {
    const [hasError, setHasError] = useState(false)

    if (hasError) {
        throw new Error('Simulated error triggered by user action!')
    }

    return (
        <Box>
            <Typography sx={{ mb: 2 }}>
                This component is currently working fine.
            </Typography>
            <Button
                variant="contained"
                color="error"
                onClick={() => setHasError(true)}
            >
                Trigger an Error
            </Button>
        </Box>
    )
}

export const Default: Story = {
    name: 'No Error State',
    args: {
        children: <GoodChild />,
    },
    parameters: {
        docs: {
            description: {
                story: 'This shows the default behavior of the ErrorBoundary when its children render without any errors.',
            },
        },
    },
    decorators: [
        (Story) => (
            <Box
                sx={{
                    border: '1px dashed grey',
                    padding: 2,
                    borderRadius: '4px',
                }}
            >
                <Typography
                    variant="caption"
                    display="block"
                    sx={{ mb: 1, color: 'text.secondary' }}
                >
                    ErrorBoundary Container
                </Typography>
                <Story />
            </Box>
        ),
    ],
}

export const WithError: Story = {
    name: 'Error State (Render Error)',
    args: {
        children: <ProblemChild />,
    },
    parameters: {
        docs: {
            description: {
                story: "This story demonstrates the fallback UI. The child component throws an error during its initial render, which is caught by the ErrorBoundary. You'll see an error message in the console, which is the expected behavior.",
            },
        },
    },
    decorators: [
        (Story) => (
            <Box
                sx={{
                    border: '1px dashed grey',
                    padding: 2,
                    borderRadius: '4px',
                }}
            >
                <Typography
                    variant="caption"
                    display="block"
                    sx={{ mb: 1, color: 'text.secondary' }}
                >
                    ErrorBoundary Container
                </Typography>
                <Story />
            </Box>
        ),
    ],
}

export const WithTriggeredError: Story = {
    name: 'Error State (Triggered Error)',
    args: {
        children: <TriggerableProblemChild />,
    },
    parameters: {
        docs: {
            description: {
                story: 'This story shows how the ErrorBoundary handles errors that occur after the initial render, for example, from a user interaction. Click the button to trigger an error and see the fallback UI.',
            },
        },
    },
    decorators: [
        (Story) => (
            <Box
                sx={{
                    border: '1px dashed grey',
                    padding: 2,
                    borderRadius: '4px',
                }}
            >
                <Typography
                    variant="caption"
                    display="block"
                    sx={{ mb: 1, color: 'text.secondary' }}
                >
                    ErrorBoundary Container
                </Typography>
                <Story />
            </Box>
        ),
    ],
}
