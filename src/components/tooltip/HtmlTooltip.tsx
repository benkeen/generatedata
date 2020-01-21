import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const HtmlTooltip = withStyles(() => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 220,
		border: '1px solid #dadde9',
	},
	arrow: {
		color: '#dadde9'
	}
}))(Tooltip);


export default HtmlTooltip;