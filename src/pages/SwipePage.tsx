// src/pages/SwipePage.tsx
import { useSwipeApi } from '../hooks/useSwipeApi'
import { SwipeContainer } from '../stories/SwipeContainer/SwipeContainer'
import { MatchDialog } from '../stories/MatchDialog/MatchDialog'
import { Box } from '@mui/material'

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
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
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
    )
}
