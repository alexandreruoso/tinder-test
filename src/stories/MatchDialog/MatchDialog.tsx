import { memo } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { ActionButton } from '../ActionButton/ActionButton'
import { styled } from '@mui/material/styles'

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        overflow: 'visible',
        margin: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(4),
        },
    },
}))

const StarBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '250px',
    height: '250px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'black',
    backgroundColor: 'white',
    clipPath:
        'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
    [theme.breakpoints.up('sm')]: {
        width: '300px',
        height: '300px',
    },
}))

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    justifyContent: 'center',
    padding: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(2),
    },
}))

export interface MatchDialogProps {
    isOpen: boolean
    onClose: () => void
    isMobile: boolean
}

export const MatchDialog = memo(
    ({ isOpen, onClose, isMobile }: MatchDialogProps) => {
        return (
            <StyledDialog
                open={isOpen}
                onClose={onClose}
                maxWidth={isMobile ? 'xs' : 'sm'}
                fullWidth={isMobile}
            >
                <DialogContent
                    sx={{
                        padding: 0,
                        justifyContent: 'center',
                        display: 'flex',
                    }}
                >
                    <StarBox>
                        <Typography
                            variant={isMobile ? 'body1' : 'h6'}
                            component="p"
                            sx={{ fontWeight: 'bold' }}
                        >
                            You got
                            <br />
                            match!
                        </Typography>
                    </StarBox>
                </DialogContent>
                <StyledDialogActions>
                    <ActionButton
                        label="Okay"
                        onClick={onClose}
                        IconComponent={CheckCircleOutlineIcon}
                        color="success"
                        size={isMobile ? 'medium' : 'large'}
                    />
                </StyledDialogActions>
            </StyledDialog>
        )
    }
)

MatchDialog.displayName = 'MatchDialog'
