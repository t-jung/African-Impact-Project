
import { createMuiTheme } from "@material-ui/core/styles";

import "@fontsource/roboto";

const theme = createMuiTheme({
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
        }
    },
    typography: {
        fontFamily: 'Roboto',
    }
})

export default theme