import { createMuiTheme } from "@material-ui/core/styles";

import "@fontsource/roboto";

const theme = createMuiTheme({
    spacing: [0, 2, 3, 5, 8],
    palette: {
        background : {
            main: '#E5E5E5',
        },
        primary : {
            main: '#0b3142'
        },
        secondary : {
            main: '#FFC0C0'
        },
        someGreen : {
            main: '#8fcca5'
        },
        someBlue : {
            main: '#568ea3'
        },
        secondaryBackground: {
            main: '#FFDCC3'
        },
        verificationBackground: {
            main: '#bfded6'
        },
        green: {
            main: '#c5dca0'
        },
        yellowLemon: {
            main: '#eab676'
        },
        pink: {
            main: '#efced6'
        },
        blue: {
            main: '#a0dae0'
        }
    },
    typography: {
        fontFamily: 'Roboto',
    }
})

export default theme