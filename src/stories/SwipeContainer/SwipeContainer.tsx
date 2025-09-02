import { memo, useCallback } from 'react'
import Box from '@mui/material/Box'
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
    isMobile: boolean // Receives isMobile as a prop
}

export const SwipeContainer = memo(
    ({
        profile,
        onLike,
        onDislike,
        isLoading = false,
        error,
        isFinished = false,
        isMobile,
    }: SwipeContainerProps) => {
        // Functions are memoized with useCallback
        const handleLike = useCallback(() => {
            if (profile) {
                onLike(profile.id)
            }
        }, [profile, onLike])

        const handleDislike = useCallback(() => {
            if (profile) {
                onDislike(profile.id)
            }
        }, [profile, onDislike])

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
                        {/* The isMobile prop is passed down to SwipeActions */}
                        <SwipeActions
                            onLike={handleLike}
                            onDislike={handleDislike}
                            disabled={isLoading}
                            isMobile={isMobile}
                        />
                    </>
                )
            }
            return null
        }

        return (
            <Box
                sx={{
                    width: {
                        xs: '100%',
                        sm: '400px',
                        md: '450px',
                        lg: '500px',
                    },
                    maxWidth: {
                        xs: '345px',
                        sm: '400px',
                        md: '450px',
                        lg: '500px',
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
                    // Style is now directly driven by the isMobile prop
                    padding: isMobile ? 1 : 0,
                    boxShadow: isMobile ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                }}
            >
                {renderContent()}
            </Box>
        )
    }
)
