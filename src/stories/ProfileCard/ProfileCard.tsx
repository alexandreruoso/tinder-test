import { memo } from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import { Avatar } from '../Avatar/Avatar'
import { ProfileInfo } from '../ProfileInfo/ProfileInfo'

const StyledCard = styled(Card)(({ theme }) => ({
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('sm')]: {
        borderRadius: '12px',
    },
}))

const StyledInfoOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    color: 'white',
    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 20%, transparent)',
    padding: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(2),
    },
    boxSizing: 'border-box',
}))

export interface ProfileData {
    name: string
    age: number
    imageUrl?: string
}

export interface ProfileCardProps {
    profile: ProfileData
}

export const ProfileCard = memo(({ profile }: ProfileCardProps) => {
    const { name, age, imageUrl } = profile

    return (
        <StyledCard>
            <Avatar imageUrl={imageUrl} altText={`Profile of ${name}`} />
            <StyledInfoOverlay>
                <ProfileInfo name={name} age={age} />
            </StyledInfoOverlay>
        </StyledCard>
    )
})

ProfileCard.displayName = 'ProfileCard'
