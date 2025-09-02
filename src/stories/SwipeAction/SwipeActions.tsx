import { Stack, useMediaQuery, useTheme } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { ActionButton } from '../ActionButton/ActionButton'

export interface SwipeActionsProps {
    onLike: () => void
    onDislike: () => void
    disabled?: boolean
}

export const SwipeActions = ({
    onLike,
    onDislike,
    disabled = false,
}: SwipeActionsProps) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Stack
            direction="row"
            spacing={{ xs: 1, sm: 2 }}
            justifyContent="center"
            sx={{
                width: '100%',
                padding: { xs: '0 16px', sm: '0 24px' },
            }}
        >
            <ActionButton
                IconComponent={ThumbDownIcon}
                color="error"
                onClick={onDislike}
                label="Dislike"
                disabled={disabled}
                size={isMobile ? 'medium' : 'large'}
            />
            <ActionButton
                IconComponent={ThumbUpIcon}
                color="success"
                onClick={onLike}
                label="Like"
                disabled={disabled}
                size={isMobile ? 'medium' : 'large'}
            />
        </Stack>
    )
}
