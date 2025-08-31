import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { ActionButton } from './ActionButton'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'

const meta: Meta<typeof ActionButton> = {
    title: 'Atoms/ActionButton',
    component: ActionButton,
    tags: ['autodocs'],
    args: { onClick: fn() },
}

export default meta
type Story = StoryObj<typeof meta>

export const Like: Story = {
    args: {
        IconComponent: ThumbUpIcon,
        color: 'success',
        label: 'Like',
    },
}

export const Dislike: Story = {
    args: {
        IconComponent: ThumbDownIcon,
        color: 'error',
        label: 'Dislike',
    },
}

export const Disabled: Story = {
    args: {
        IconComponent: ThumbUpIcon,
        color: 'success',
        disabled: true,
        label: 'Like',
    },
}
