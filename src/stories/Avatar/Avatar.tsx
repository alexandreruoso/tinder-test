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
    imageUrl?: string
    altText: string
}

export const Avatar = ({ imageUrl, altText }: AvatarProps) => {
    const status = useImageStatus(imageUrl)

    return (
        <StyledAvatarContainer>
            {status === 'loading' && (
                <Skeleton variant="rectangular" width="100%" height="100%" />
            )}

            {status === 'error' && (
                <Typography variant="caption" color="textSecondary">
                    no image
                </Typography>
            )}

            {status === 'loaded' && (
                <StyledImage src={imageUrl} alt={altText} loading="lazy" />
            )}
        </StyledAvatarContainer>
    )
}
