import type { Meta, StoryObj } from '@storybook/react'
import { AlertMessage } from './AlertMessage'

const meta: Meta<typeof AlertMessage> = {
    title: 'Molecules/AlertMessage',
    component: AlertMessage,
    tags: ['autodocs'],
    argTypes: {
        severity: {
            control: { type: 'radio' },
            options: ['error', 'info'],
        },
        message: {
            control: 'text',
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Error: Story = {
    args: {
        severity: 'error',
        message: 'Failed to load profiles. Please try again later.',
    },
}

export const Info: Story = {
    args: {
        severity: 'info',
        message: "You've swiped through everyone!",
    },
}
