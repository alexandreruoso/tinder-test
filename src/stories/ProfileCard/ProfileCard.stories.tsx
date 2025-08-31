import type { Meta, StoryObj } from '@storybook/react'
import { ProfileCard } from './ProfileCard'

const meta: Meta<typeof ProfileCard> = {
    title: 'Organisms/ProfileCard',
    component: ProfileCard,
    tags: ['autodocs'],
    argTypes: {
        profile: {
            control: 'object',
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const WithImage: Story = {
    args: {
        profile: {
            name: 'Sarah',
            age: 21,
            imageUrl: 'https://i.pravatar.cc/400?u=sarah',
        },
    },
}

export const WithoutImage: Story = {
    args: {
        profile: {
            name: 'John',
            age: 28,
            imageUrl: undefined,
        },
    },
}

export const WithLongName: Story = {
    args: {
        profile: {
            name: 'Maximilian BartholomewdrewLandersonCreutzfeldtJacob',
            age: 32,
            imageUrl: 'https://i.pravatar.cc/400?u=max',
        },
    },
}
