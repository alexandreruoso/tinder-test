import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    typography: {
        h1: {
            fontSize: '1.5rem',
            '@media (min-width:600px)': {
                fontSize: '2rem',
            },
            '@media (min-width:960px)': {
                fontSize: '2.5rem',
            },
        },
        h5: {
            fontSize: '1.1rem',
            '@media (min-width:600px)': { fontSize: '1.25rem' },
            '@media (min-width:960px)': { fontSize: '1.5rem' },
        },
        h6: {
            fontSize: '1rem',
            '@media (min-width:600px)': { fontSize: '1.1rem' },
            '@media (min-width:960px)': { fontSize: '1.25rem' },
        },
        caption: {
            fontSize: '0.75rem',
            '@media (min-width:600px)': { fontSize: '0.8rem' },
        },
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    paddingLeft: '16px',
                    paddingRight: '16px',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                },
            },
        },
    },
})
