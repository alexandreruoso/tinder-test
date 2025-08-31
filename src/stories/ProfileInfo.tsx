import { Typography, Box } from '@mui/material'

export interface ProfileInfoProps {
    /** The name of the user */
    name: string
    /** The age of the user */
    age: number
}

/**
 * A molecule that displays a user's name and age in a styled overlay bar,
 * intended to be placed on top of a ProfilePicture.
 */
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
