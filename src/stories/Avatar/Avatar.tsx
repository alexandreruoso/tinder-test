import { Box, Typography } from '@mui/material'

export interface AvatarProps {
    imageUrl?: string
    altText: string
}

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
                borderRadius: '4px',
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
