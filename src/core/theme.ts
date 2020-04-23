import { createMuiTheme } from '@material-ui/core/styles';
import color from '@material-ui/core/colors/indigo';

// @ts-ignore-line
const theme = createMuiTheme({
	typography: {
		fontFamily: 'garamond, "Open Sans", serif',
		button: {
			fontSize: 'inherit'
		},
	},
	palette: {
		primary: color
	},
	overrides: {
		MuiDialog: {
			root: {
				zIndex: '5000 !important'
			}
		}
	},
	props: {
		MuiButtonBase: {
			disableRipple: true
		}
	}
});

export default theme;
