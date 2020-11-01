import MuiTooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

export const HtmlTooltip = withStyles(() => ({
	tooltip: {
		backgroundColor: '#f0f2f5',
		color: 'rgba(0, 0, 0, 0.87)',
		fontSize: 12,
		padding: 15,
		border: '1px solid #ccd0d4'
	},
	arrow: {
		color: '#ccd0d4'
	}
}))(MuiTooltip);

export const Tooltip = withStyles(() => ({
	tooltip: {
		backgroundColor: '#333333',
		maxWidth: 220,
		color: '#dddddd',
		lineHeight: '16px',
		fontSize: 11,
		padding: 10,
	},
	arrow: {
		color: '#333333',
	}
}))(MuiTooltip);

export const ErrorTooltip = withStyles(() => ({
	tooltip: {
		backgroundColor: '#D80000',
		maxWidth: 220,
		color: '#ffffff',
		lineHeight: '16px',
		fontSize: 11,
		padding: 10
	},
	arrow: {
		color: '#D80000'
	}
}))(MuiTooltip);


