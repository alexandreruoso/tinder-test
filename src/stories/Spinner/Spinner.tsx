import { Dialog, DialogContent } from '@mui/material'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
export interface SpinnerProps {
    size?: number | string
}

export const Spinner = ({ size = 40 }: SpinnerProps) => {
    return (
        <Dialog open={true}>
            <DialogContent>
                <CircularProgress size={size} aria-label="Loading..." />
                <Box component="span" role="status" aria-live="polite" hidden>
                    Loading...
                </Box>
            </DialogContent>
        </Dialog>
    )
}
