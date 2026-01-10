/* istanbul ignore file */
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Open Sans", serif',
    button: {
      fontSize: 'inherit'
    }
  },
  palette: {
    primary: {
      main: '#275eb5'
    }
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiButtonGroup: {
      defaultProps: {
        disableRipple: true
      }
    }
  },
  // see: https://mui.com/material-ui/customization/default-theme/?expand-path=$.zIndex
  zIndex: {
    // @ts-ignore-line
    tooltip: '5006 !important'
  }
});

export default theme;
