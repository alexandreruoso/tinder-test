import { Box, Typography } from '@mui/material'

export interface AvatarProps {
    /** The URL of the profile picture */
    imageUrl?: string
    /** The alt text for the image, for accessibility */
    altText: string
}

/**
 * An atom component that displays a user's profile picture or a fallback state if no image is provided.
 */
export const Avatar = ({ imageUrl, altText }: AvatarProps) => {
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
                borderRadius: '4px', // Matches MUI Card's default radius
            }}
        >
            {imageUrl ? (
                <Box
                    component="img"
                    src={imageUrl}
                    alt={altText}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            ) : (
                <Typography variant="caption" color="textSecondary">
                    no image
                </Typography>
            )}
        </Box>
    )
}
