import { memo } from 'react'
import Stack from '@mui/material/Stack'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { ActionButton } from '../ActionButton/ActionButton'

export interface SwipeActionsProps {
    onLike: () => void
    onDislike: () => void
    disabled?: boolean
    isMobile: boolean // Receives isMobile as a prop
}

// Wrapped in React.memo and simplified to just receive props.
export const SwipeActions = memo(
    ({ onLike, onDislike, disabled = false, isMobile }: SwipeActionsProps) => {
        // No more useTheme or useMediaQuery hooks here.
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
                    // The button size is determined by the isMobile prop.
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
)
