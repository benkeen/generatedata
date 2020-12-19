import MuiTooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

export const HtmlTooltip = withStyles(() => ({
	tooltip: {
		backgroundColor: '#ffffff',
		color: 'rgba(0, 0, 0, 0.87)',
		fontSize: 12,
		padding: 0,
		boxShadow: '1px 2px 3px #999999'
	},
	arrow: {
		color: '#ffffff'
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


