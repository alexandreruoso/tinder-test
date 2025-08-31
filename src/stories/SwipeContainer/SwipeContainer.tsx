import { Box } from '@mui/material'
import { Spinner } from '../Spinner/Spinner'
import { AlertMessage } from '../AlertMessage/AlertMessage'
import { ProfileCard } from '../ProfileCard/ProfileCard'
import { SwipeActions } from '../SwipeAction/SwipeActions'

// Defines the shape of a profile object
export interface Profile {
    id: string
    name: string
    age: number
    imageUrl?: string
}

export interface SwipeContainerProps {
    /** The current profile to display. Can be undefined if loading, finished, or in an error state. */
    profile?: Profile
    /** Function to call when the user likes the profile. */
    onLike: (profileId: string) => void
    /** Function to call when the user dislikes the profile. */
    onDislike: (profileId: string) => void
    /** True if the application is fetching the next profile. */
    isLoading?: boolean
    /** An error message to display if fetching failed. */
    error?: string
    /** True if there are no more profiles to show. */
    isFinished?: boolean
}

/**
 * A container organism that manages the main swiping interface.
 * It displays the current profile, action buttons, and handles
 * loading, error, and finished states.
 */
export const SwipeContainer = ({
    profile,
    onLike,
    onDislike,
    isLoading = false,
    error,
    isFinished = false,
}: SwipeContainerProps) => {
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
                width: 345,
                height: 500,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                border: '1px solid #ddd',
                borderRadius: '8px',
                gap: 2,
            }}
        >
            {renderContent()}
        </Box>
    )
}
