import MuiTooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

export const HtmlTooltip = withStyles(() => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 220,
		border: '1px solid #dadde9',
		fontSize: 12,
		padding: 10
	},
	arrow: {
		color: '#dadde9'
	}
}))(MuiTooltip);

export const Tooltip = withStyles(() => ({
	tooltip: {
		backgroundColor: '#333333',
		maxWidth: 220,
		color: '#dddddd',
		lineHeight: '16px',
		fontSize: 11,
		padding: 10
	},
	arrow: {
		color: '#333333'
	}
}))(MuiTooltip);
