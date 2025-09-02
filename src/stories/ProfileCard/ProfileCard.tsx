import { Card, Box } from '@mui/material'
import { Avatar } from '../Avatar/Avatar'
import { ProfileInfo } from '../ProfileInfo/ProfileInfo'

export interface ProfileData {
    name: string
    age: number
    imageUrl?: string
}

export interface ProfileCardProps {
    profile: ProfileData
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
    const { name, age, imageUrl } = profile

    return (
        <Card
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                borderRadius: { xs: '8px', sm: '12px' },
            }}
        >
            <Avatar imageUrl={imageUrl} altText={`Profile of ${name}`} />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    color: 'white',
                    background:
                        'linear-gradient(to top, rgba(0,0,0,0.8) 20%, transparent)',
                    padding: { xs: '12px', sm: '16px' },
                    boxSizing: 'border-box',
                }}
            >
                <ProfileInfo name={name} age={age} />
            </Box>
        </Card>
    )
}
