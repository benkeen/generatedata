import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Dropdown from '../dropdown/Dropdown';
import { getSortedGroupedDataTypes, getDataTypeHelpComponent } from '../../utils/dataTypeUtils';
// import styles from './HelpDialog.scss';


const dialogStyles = (theme: any) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

// @ts-ignore-line
const DialogTitle = withStyles(dialogStyles)((props: any) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing(2),
		minWidth: 500
	}
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(1)
	}
}))(MuiDialogActions);

export type HelpDialogProps = {
    initialDataType: string;
    visible: boolean;
    onClose: any;
    coreI18n: any;
    i18n: any;
}

const HelpDialog = ({ initialDataType, visible, onClose, coreI18n, i18n }: HelpDialogProps) => {
	const [dataType, setDataType] = React.useState();

    React.useEffect(() => {
		setDataType(initialDataType);
	}, [initialDataType]);

	const dataTypes = getSortedGroupedDataTypes();
	const Help = getDataTypeHelpComponent(dataType);

	return (
		<Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={visible}>
			<DialogTitle onClose={onClose}>
				{coreI18n.help}
			</DialogTitle>
			<DialogContent dividers>
				<Dropdown
					isGrouped={true}
					value={dataType}
					onChange={(i: any) => setDataType(i.value)}
					options={dataTypes}
				/>
				<Help
					coreI18n={coreI18n}
					i18n={i18n}
				/>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={onClose} color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default HelpDialog;
