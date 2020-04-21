import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
// import Dropdown from '../dropdown/Dropdown';
import { getSortedGroupedDataTypes, getDataTypeExports } from '../../utils/dataTypeUtils';
import styles from './HelpDialog.scss';

const dialogStyles = (theme: any): any => ({
	root: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: 6,
		color: theme.palette.grey[500]
	}
});

// @ts-ignore-line
const DialogTitle = withStyles(dialogStyles)((props: any): React.ReactNode => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h5">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon fontSize="large" />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing(2)
	}
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(1)
	}
}))(MuiDialogActions);

// @ts-ignore-line
const Dialog = withStyles(() => ({
	// @ts-ignore-line
	root: {
		// @ts-ignore-line
		zIndex: '5000 !important',
		color: 'red',
		width: '100%'
	},
	paper: {
		maxWidth: 1000
	}
}))(MuiDialog);

export type HelpDialogProps = {
	initialDataType: string;
	visible: boolean;
	onClose: any;
	coreI18n: any;
	i18n: any;
}

const HelpDialog = ({ initialDataType, visible, onClose, coreI18n, i18n }: HelpDialogProps): JSX.Element => {
	const [dataType, setDataType] = React.useState();

	React.useEffect(() => {
		setDataType(initialDataType);
	}, [initialDataType]);

	const dataTypes = getSortedGroupedDataTypes();
	const { Help } = getDataTypeExports(dataType);

	/*
	<Dropdown
		isGrouped={true}
		value={dataType}
		onChange={(i: any): void => setDataType(i.value)}
		options={dataTypes}
	/>
	*/

	return (
		<Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={visible}>
			<DialogTitle onClose={onClose}>
				Data Types
			</DialogTitle>
			<DialogContent dividers className={styles.contentPanel}>
				<div className={styles.dataTypeList}>
					<input type="text" placeholder="Filter Data Types" autoFocus />
				</div>
				<div className={styles.helpContent}>
					<Help
						coreI18n={coreI18n}
						i18n={i18n}
					/>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary" variant="outlined">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default HelpDialog;
