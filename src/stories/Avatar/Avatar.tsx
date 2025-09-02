import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { useImageStatus } from '../../hooks/useImageStatus'

const StyledAvatarContainer = styled(Box)({
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '4px',
})

const StyledImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
})

export interface AvatarProps {
    imageId?: string
    altText: string
}

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL

export const Avatar = ({ imageId, altText }: AvatarProps) => {
    // Construct the default image source (a medium size)
    const defaultSrc = imageId
        ? `${IMAGE_BASE_URL}/${imageId}/400/600`
        : undefined
    const status = useImageStatus(defaultSrc)

    // Create the source set for responsive images
    const srcSet = imageId
        ? `${IMAGE_BASE_URL}/${imageId}/400/600 400w, 
           ${IMAGE_BASE_URL}/${imageId}/500/750 500w, 
           ${IMAGE_BASE_URL}/${imageId}/800/1200 800w`
        : undefined

    return (
        <StyledAvatarContainer>
            {status === 'loading' && (
                <Skeleton variant="rectangular" width="100%" height="100%" />
            )}

            {status === 'error' && (
                <Typography variant="caption" color="textSecondary">
                    Image not available
                </Typography>
            )}

            {status === 'loaded' && imageId && (
                <StyledImage
                    src={defaultSrc}
                    srcSet={srcSet}
                    sizes="(max-width: 600px) 400px, 500px"
                    alt={altText}
                    loading="lazy"
                />
            )}
        </StyledAvatarContainer>
    )
}
