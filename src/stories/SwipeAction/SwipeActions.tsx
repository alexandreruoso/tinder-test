import { Stack } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { ActionButton } from '../ActionButton/ActionButton'

export interface SwipeActionsProps {
    /**
     * Function to call when the Like button is clicked.
     */
    onLike: () => void
    /**
     * Function to call when the Dislike button is clicked.
     */
    onDislike: () => void
    /**
     * Disables both buttons to prevent interaction.
     * @default false
     */
    disabled?: boolean
}

/**
 * A molecule component that groups the Like and Dislike action buttons.
 */
export const SwipeActions = ({
    onLike,
    onDislike,
    disabled = false,
}: SwipeActionsProps) => {
    return (
        <Stack direction="row" spacing={2} justifyContent="center">
            <ActionButton
                IconComponent={ThumbDownIcon}
                color="error"
                onClick={onDislike}
                label="Dislike"
                disabled={disabled}
            />
            <ActionButton
                IconComponent={ThumbUpIcon}
                color="success"
                onClick={onLike}
                label="Like"
                disabled={disabled}
            />
        </Stack>
    )
}
