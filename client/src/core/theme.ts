/* istanbul ignore file */
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: {
		fontFamily: 'garamond, "Open Sans", serif',
		button: {
			fontSize: 'inherit'
		},
	},
	palette: {
		primary: {
			main: '#275eb5'
		}
	},
	overrides: {
		MuiDialog: {
			root: {
				// @ts-ignore-line
				zIndex: '5000 !important'
			}
		}
	},
	props: {
		MuiButtonBase: {
			disableRipple: true
		}
	},
	zIndex: {
		// @ts-ignore-line
		tooltip: '5001 !important'
	}
});

export default theme;
