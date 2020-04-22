import { createMuiTheme } from '@material-ui/core/styles';

// @ts-ignore-line
const theme = createMuiTheme({
	typography: {
		fontFamily: 'garamond, "Open Sans", serif',
		button: {
			fontSize: 'inherit'
		},
	},
	// palette: {
	// 	type: 'dark'
	// 	// primary: {
	// 	// 	main: '#2684ff'
	// 	// }
	// },
	overrides: {
	// 	MuiTypography: {
	// 	}
	// 	button: {
	// 		fontSize: 'inherit'
	// 	}
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
