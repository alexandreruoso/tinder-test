import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { SwipeActions } from './SwipeActions'

const meta: Meta<typeof SwipeActions> = {
    title: 'Molecules/SwipeActions',
    component: SwipeActions,
    tags: ['autodocs'],
    // Use `fn()` to spy on the onClick handlers
    args: { onLike: fn(), onDislike: fn() },
    argTypes: {
        disabled: {
            control: 'boolean',
            description: 'Disables both action buttons.',
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        disabled: false,
    },
}

export const Disabled: Story = {
    args: {
        disabled: true,
    },
}
