import React from 'react'
import { create } from 'jss'
import JssProvider from 'react-jss/lib/JssProvider'
import {
    MuiThemeProvider,
    createMuiTheme,
    createGenerateClassName,
    jssPreset,
    withStyles,
} from 'material-ui/styles'
import purple from 'material-ui/colors/purple'
import green from 'material-ui/colors/green'
import CssBaseline from 'material-ui/CssBaseline'


const styles = theme => ({
    '@global': {
        a: {
            color: '#F67280',
        },
        TextField: {
            marginTop: '100px',
        },
    },
})

const theme = createMuiTheme({
    palette: {
        // type: 'dark',
        primary: {
            light: '#6C5B7B',
            main: '#355C7D',
            dark: '#355C7D',
            contrastText: '#fff',
        },
        secondary: {
            light: '#F8B195',
            main: '#F67280',
            dark: '#C06C84',
            contrastText: '#000',
        },
        education: {
            main: green[700],
        },
    },
    overrides: {
        MuiInput: {
            underline: {
                '&:hover:not($disabled):before': {
                    backgroundColor: '#355C7D',
                },
            },
        },
    },
})


const jss = create(jssPreset())
const generateClassName = createGenerateClassName()

const withTheme = (Component) => {
    const WithTheme = (props) => {
        return (
            <JssProvider jss={jss} generateClassName={generateClassName}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...props} />
                </MuiThemeProvider>
            </JssProvider>
        )
    }
    return withStyles(styles)(WithTheme)
}

export default withTheme
