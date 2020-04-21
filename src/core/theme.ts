import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	typography: {
		fontFamily: 'garamond, "Open Sans", serif',
		button: {
			fontSize: 'inherit'
		}
	},
	overrides: {
	// 	MuiTypography: {
	// 	}
	// 	button: {
	// 		fontSize: 'inherit'
	// 	}
	}
});

export default theme;
