import { createMuiTheme } from '@material-ui/core/styles';

// @ts-ignore-line
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
		tooltip: '5001 !important'
	}
});

export default theme;
