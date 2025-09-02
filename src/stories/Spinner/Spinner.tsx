import { CircularProgress, Box } from '@mui/material'

export interface SpinnerProps {
    size?: number | string
}

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
