import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const StyledNameSpan = styled('span')({
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    hyphens: 'auto',
    lineHeight: 1.2,
})

export interface ProfileInfoProps {
    name: string
    age: number
}

export const ProfileInfo = ({ name, age }: ProfileInfoProps) => {
    return (
        <Typography variant="h5" component="p">
            <StyledNameSpan>{name}</StyledNameSpan>, {age}
        </Typography>
    )
}
