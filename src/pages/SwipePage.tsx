import { useSwipeApi } from '../hooks/useSwipeApi'
import { SwipeContainer } from '../stories/SwipeContainer/SwipeContainer'
import { MatchDialog } from '../stories/MatchDialog/MatchDialog'
import { Box, Container } from '@mui/material'

export const SwipePage = () => {
    const {
        profile,
        isLoading,
        error,
        isFinished,
        isMatch,
        likeProfile,
        dislikeProfile,
        closeMatchDialog,
    } = useSwipeApi()

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: {
                        xs: '100vh', // Mobile: Full height
                        sm: '90vh', // Tablet: 90% height
                        md: '85vh', // Desktop: 85% height
                        lg: '80vh', // Large: 80% height
                    },
                    padding: { xs: 1, sm: 2 },
                }}
            >
                <SwipeContainer
                    profile={profile}
                    isLoading={isLoading}
                    error={error}
                    isFinished={isFinished}
                    onLike={likeProfile}
                    onDislike={dislikeProfile}
                />
                <MatchDialog isOpen={isMatch} onClose={closeMatchDialog} />
            </Box>
        </Container>
    )
}
