import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { useImageStatus } from '../../hooks/useImageStatus' // Import our new hook

export interface AvatarProps {
    imageUrl?: string
    altText: string
}

export const Avatar = ({ imageUrl, altText }: AvatarProps) => {
    const status = useImageStatus(imageUrl)

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: '4px',
            }}
        >
            {/* The rendering logic is now extremely clear and easy to read */}
            {status === 'loading' && (
                <Skeleton variant="rectangular" width="100%" height="100%" />
            )}

            {status === 'error' && (
                <Typography variant="caption" color="textSecondary">
                    no image
                </Typography>
            )}

            {status === 'loaded' && (
                <Box
                    component="img"
                    src={imageUrl} // We know imageUrl is defined here because status is 'loaded'
                    alt={altText}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    loading="lazy"
                />
            )}
        </Box>
    )
}
