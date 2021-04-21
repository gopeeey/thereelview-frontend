import { createMuiTheme } from '@material-ui/core/styles';
import * as fonts from './fonts';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#9B0E01'
        },
        secondary: {
            main: '#eaeaea'
        },
        blackish: {
            main: '#070100'
        },
        transPrimary: {
            main: 'rgba(0, 162, 5, 0.7)',
            light: 'rgb(0, 162, 5, 0.4)',
            dark: 'rgb(0, 162, 5, 0.849567)'
        },
        transSecondary: {
            main: 'rgba(250, 250, 250, 0.8)',
            light: 'rgba(250, 250, 250, 0.4)',
            dark: 'rgba(250, 250, 250, 0.849567)'
        },
        link: {
            main: '#0d81b6',
        },
        error: {
            main: 'rgb(214, 23, 23)'
        },
        text: {
            primary: '#eaeaea'
        }
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [
                    fonts.MsBold,
                    fonts.MsLight,
                    fonts.MsRegular,
                    fonts.MsSemiBold,
                    fonts.MsMedium
                ],
            },
        },
    },
    typography: {
        fontFamily: 'Ms_Semi_Bold, Arial',
        h1: {
            fontFamily: 'Ms_Light, Arial'
        },
        h2: {
            fontFamily: 'Ms_Light, Arial'
        },
        h3: {
            fontFamily: 'Ms_Light, Arial'
        },
        body1: {
            fontFamily: 'Ms_Semi_Bold, Arial'
        },
        body2: {
            fontFamily: 'Ms_Semi_Bold, Arial'
        },
        button: {
            fontFamily: 'Ms_Bold, Arial'
        },
        bold: {
            fontFamily: 'Ms_Bold, Arial'
        },
        light: {
            fontFamily: 'Ms_Light, Arial'
        },
        semiBold: {
            fontFamily: 'Ms_Semi_Bold, Arial'
        },
        medium: {
            fontFamily: 'Ms_Medium, Arial'
        },
        regular: {
            fontFamily: 'Ms_Regular, Arial'
        }

    }
});

export default theme;