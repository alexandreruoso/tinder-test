import {
    Dialog,
    DialogContent,
    DialogActions,
    Box,
    Typography,
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { ActionButton } from '../ActionButton/ActionButton'

export interface MatchDialogProps {
    isOpen: boolean
    onClose: () => void
}

export const MatchDialog = ({ isOpen, onClose }: MatchDialogProps) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        overflow: 'visible',
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
                {/* Overlay a forma di stella con il testo "You got match!" */}
                <Box
                    sx={{
                        position: 'relative',
                        width: '300px',
                        height: '300px',
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
                        variant="h6"
                        component="p"
                        sx={{ fontWeight: 'bold' }}
                    >
                        You got
                        <br />
                        match!
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', padding: '16px' }}>
                <ActionButton
                    label="Okay"
                    onClick={onClose}
                    IconComponent={CheckCircleOutlineIcon}
                    color="success"
                />
            </DialogActions>
        </Dialog>
    )
}
