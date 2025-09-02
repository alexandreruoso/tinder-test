import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { ActionButton } from '../ActionButton/ActionButton'

export interface MatchDialogProps {
    isOpen: boolean
    onClose: () => void
    isMobile: boolean // Add `isMobile` to props.
}

export const MatchDialog = ({
    isOpen,
    onClose,
    isMobile,
}: MatchDialogProps) => {
    // The `useTheme` and `useMediaQuery` hooks have been removed.

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth={isMobile ? 'xs' : 'sm'}
            fullWidth={isMobile}
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        overflow: 'visible',
                        margin: { xs: '16px', sm: '32px' },
                    },
                },
            }}
        >
            <DialogContent
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                }}
            >
                {/* Overlay star with "You got match!" */}
                <Box
                    sx={{
                        position: 'relative',
                        width: { xs: '250px', sm: '300px' },
                        height: { xs: '250px', sm: '300px' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: 'black',
                        backgroundColor: 'white',
                        clipPath:
                            'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                    }}
                >
                    <Typography
                        variant={isMobile ? 'body1' : 'h6'}
                        component="p"
                        sx={{ fontWeight: 'bold' }}
                    >
                        You got
                        <br />
                        match!
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: 'center',
                    padding: { xs: '12px', sm: '16px' },
                }}
            >
                <ActionButton
                    label="Okay"
                    onClick={onClose}
                    IconComponent={CheckCircleOutlineIcon}
                    color="success"
                    size={isMobile ? 'medium' : 'large'}
                />
            </DialogActions>
        </Dialog>
    )
}
