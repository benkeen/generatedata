/* istanbul ignore file */
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // typography: {
  //   fontFamily: '"Open Sans", serif',
  //   button: {
  //     fontSize: 'inherit'
  //   }
  // },
  // palette: {
  //   primary: {
  //     main: '#275eb5'
  //   }
  // },
  // transitions: {
  //   create: () => 'none'
  // },
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
    // MuiDialog: {
    //   root: {
    //     // @ts-ignore-line
    //     zIndex: '5000 !important'
    //   }
    // }
  }
  // zIndex: {
  //   // @ts-ignore-line
  //   tooltip: '5001 !important'
  // }
});

export default theme;
