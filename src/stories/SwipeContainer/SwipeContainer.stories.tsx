import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { SwipeContainer, type Profile } from './SwipeContainer'

const mockProfile: Profile = {
    id: '1',
    name: 'Jessica',
    age: 23,
    imageUrl: 'https://i.pravatar.cc/400?u=women',
}

const meta: Meta<typeof SwipeContainer> = {
    title: 'Organisms/SwipeContainer',
    component: SwipeContainer,
    tags: ['autodocs'],
    args: {
        onLike: fn(),
        onDislike: fn(),
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        profile: mockProfile,
    },
}

export const Loading: Story = {
    args: {
        profile: undefined,
        isLoading: true,
    },
}

export const Error: Story = {
    args: {
        profile: undefined,
        error: 'Failed to load profiles. Please try again.',
    },
}

export const Finished: Story = {
    args: {
        profile: undefined,
        isFinished: true,
    },
}
