import { CircularProgress, Box } from '@mui/material'

export interface SpinnerProps {
    /** The size of the spinner. */
    size?: number | string
}

/**
 * An atom component that displays a circular loading indicator.
 */
export const Spinner = ({ size = 40 }: SpinnerProps) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
        >
            <CircularProgress size={size} />
        </Box>
    )
}
