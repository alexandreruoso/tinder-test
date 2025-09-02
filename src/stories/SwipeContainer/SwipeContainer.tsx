import { Box, useMediaQuery, useTheme } from '@mui/material'
import { Spinner } from '../Spinner/Spinner'
import { AlertMessage } from '../AlertMessage/AlertMessage'
import { ProfileCard } from '../ProfileCard/ProfileCard'
import { SwipeActions } from '../SwipeAction/SwipeActions'

export interface Profile {
    id: string
    name: string
    age: number
    imageUrl?: string
}

export interface SwipeContainerProps {
    profile?: Profile
    onLike: (profileId: string) => void
    onDislike: (profileId: string) => void
    isLoading?: boolean
    error?: string
    isFinished?: boolean
}

export const SwipeContainer = ({
    profile,
    onLike,
    onDislike,
    isLoading = false,
    error,
    isFinished = false,
}: SwipeContainerProps) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const handleLike = () => {
        if (profile) {
            onLike(profile.id)
        }
    }

    const handleDislike = () => {
        if (profile) {
            onDislike(profile.id)
        }
    }

    const renderContent = () => {
        if (isLoading) {
            return <Spinner />
        }
        if (error) {
            return <AlertMessage message={error} severity="error" />
        }
        if (isFinished) {
            return (
                <AlertMessage
                    message="That's everyone for now!"
                    severity="info"
                />
            )
        }
        if (profile) {
            return (
                <>
                    <ProfileCard profile={profile} />
                    <SwipeActions
                        onLike={handleLike}
                        onDislike={handleDislike}
                        disabled={isLoading}
                    />
                </>
            )
        }
        return null // Should not happen in normal flow
    }

    return (
        <Box
            sx={{
                width: {
                    xs: '100%', // Mobile: Full width
                    sm: '400px', // Tablet: 400px
                    md: '450px', // Desktop: 450px (bigger, not smaller!)
                    lg: '500px', // Large: 500px
                },
                maxWidth: {
                    xs: '345px', // Mobile: Max 345px
                    sm: '400px', // Tablet: Max 400px
                    md: '450px', // Desktop: Max 450px
                    lg: '500px', // Large: Max 500px
                },
                height: {
                    xs: '450px',
                    sm: '500px',
                    md: '550px',
                    lg: '600px',
                    xl: '650px',
                },
                aspectRatio: '3/4',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: { xs: 1, sm: 2 },
                border: '1px solid #ddd',
                borderRadius: { xs: '8px', sm: '12px' },
                gap: { xs: 1, sm: 2 },
                margin: { xs: 'auto', sm: 0 },
                padding: isMobile ? 1 : 0,
                boxShadow: isMobile ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
            }}
        >
            {renderContent()}
        </Box>
    )
}
