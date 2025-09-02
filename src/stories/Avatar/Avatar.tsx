import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

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
                    loading="lazy"
                />
            ) : (
                <Typography variant="caption" color="textSecondary">
                    no image
                </Typography>
            )}
        </Box>
    )
}
