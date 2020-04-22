import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

// @ts-ignore-line
const theme = createMuiTheme({
	typography: {
		fontFamily: 'garamond, "Open Sans", serif',
		button: {
			fontSize: 'inherit'
		},
	},
	palette: {
		primary: blue,
		tonalOffset: 0.5
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
