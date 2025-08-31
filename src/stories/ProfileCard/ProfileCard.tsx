import { Card, Box } from '@mui/material'
import { Avatar } from '../Avatar/Avatar'
import { ProfileInfo } from '../ProfileInfo/ProfileInfo'

export interface ProfileData {
    name: string
    age: number
    imageUrl?: string
}

export interface ProfileCardProps {
    /**
     * The profile data object to display.
     */
    profile: ProfileData
}

/**
 * An organism component that displays a complete user profile card,
 * including their picture, name, and age.
 */
export const ProfileCard = ({ profile }: ProfileCardProps) => {
    const { name, age, imageUrl } = profile

    return (
        <Card sx={{ width: 345, height: 500, position: 'relative' }}>
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
                    padding: '16px',
                    boxSizing: 'border-box', // Ensures padding is included in the element's total width and height
                }}
            >
                <ProfileInfo name={name} age={age} />
            </Box>
        </Card>
    )
}
