import { memo, useCallback } from 'react'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { Spinner } from '../Spinner/Spinner'
import { AlertMessage } from '../AlertMessage/AlertMessage'
import { ProfileCard } from '../ProfileCard/ProfileCard'
import { SwipeActions } from '../SwipeAction/SwipeActions'
import type { ProfileDto } from '../../types/api'

export interface SwipeContainerProps {
    profile?: ProfileDto
    onLike: (profileId: string) => void
    onDislike: (profileId: string) => void
    isLoading?: boolean
    error?: string
    isFinished?: boolean
    isMobile: boolean // Receives isMobile as a prop
}

const StyledSwipeContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isMobile',
})<Pick<SwipeContainerProps, 'isMobile'>>(({ theme, isMobile }) => ({
    width: '100%',
    height: 'auto',
    aspectRatio: '3/4',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ddd',
    gap: theme.spacing(2),
    margin: 'auto',

    [theme.breakpoints.up('sm')]: {
        width: '400px',
        maxWidth: '400px',
        height: '500px',
        borderRadius: '12px',
        gap: theme.spacing(2),
        margin: 0,
    },

    [theme.breakpoints.up('md')]: {
        width: '450px',
        maxWidth: '450px',
        height: '550px',
    },

    [theme.breakpoints.up('lg')]: {
        width: '500px',
        maxWidth: '500px',
        height: '600px',
    },

    [theme.breakpoints.up('xl')]: {
        height: '650px',
    },
    // Style is now directly driven by the isMobile prop
    padding: isMobile ? theme.spacing(1) : 0,
    paddingBottom: isMobile ? theme.spacing(1) : theme.spacing(2),
    boxShadow: isMobile ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
    borderRadius: isMobile ? '8px' : '12px',
}))

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
            if (isLoading && !profile) {
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
                        {isLoading && <Spinner />}
                        <ProfileCard profile={profile} />
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
            <StyledSwipeContainer isMobile={isMobile}>
                {renderContent()}
            </StyledSwipeContainer>
        )
    }
)
