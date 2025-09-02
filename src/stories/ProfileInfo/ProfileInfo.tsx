import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
export interface ProfileInfoProps {
    name: string
    age: number
}

export const ProfileInfo = ({ name, age }: ProfileInfoProps) => {
    return (
        <Box>
            <Typography variant="h5" component="p">
                <Box
                    component="span"
                    sx={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        hyphens: 'auto',
                        lineHeight: 1.2,
                    }}
                >
                    {name}
                </Box>
                , {age}
            </Typography>
        </Box>
    )
}
