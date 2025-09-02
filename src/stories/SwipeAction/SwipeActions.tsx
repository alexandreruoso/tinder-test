import { memo } from 'react'
import { styled } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { ActionButton } from '../ActionButton/ActionButton'

const StyledActionsStack = styled(Stack)(({ theme }) => ({
    width: '100%',
    padding: `0 ${theme.spacing(2)}`,
    [theme.breakpoints.up('sm')]: {
        padding: `0 ${theme.spacing(3)}`,
    },
}))

export interface SwipeActionsProps {
    onLike: () => void
    onDislike: () => void
    disabled?: boolean
    isMobile: boolean
}

export const SwipeActions = memo(
    ({ onLike, onDislike, disabled = false, isMobile }: SwipeActionsProps) => {
        return (
            <StyledActionsStack
                data-testid="swipe-actions"
                direction="row"
                spacing={{ xs: 1, sm: 2 }}
                justifyContent="center"
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
            </StyledActionsStack>
        )
    }
)

SwipeActions.displayName = 'SwipeActions'
