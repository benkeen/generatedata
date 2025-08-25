import MuiTooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

export const HtmlTooltip = styled(MuiTooltip)(() => ({
	tooltip: {
		backgroundColor: '#ffffff',
		color: 'rgba(0, 0, 0, 0.87)',
		fontSize: 12,
		padding: 0,
		boxShadow: '3px 3px 6px #999999'
	},
	arrow: {
		color: '#ffffff'
	}
}));

export const Tooltip = styled(MuiTooltip)(() => ({
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
}));

export const ErrorTooltip = styled(MuiTooltip)(() => ({
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
}));
