import * as React from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

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

export const DialogTitle = withStyles(dialogStyles)((props: any): any => {
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

export const DialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing(2)
	}
}))(MuiDialogContent);

export const DialogActions = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(1)
	}
}))(MuiDialogActions);

// @ts-ignore-line
export const Dialog = withStyles(() => ({
	root: {
		zIndex: '5005 !important',
		width: '100%'
	},
	paper: {
		maxWidth: 800,
		maxHeight: 500,
		width: '100%',
		height: '100%' // ensures the modal doesn't change size when the user filters the list of DTs
	}
}))(MuiDialog);

// TODO Code reuse much? Figure out how to do this better.
// @ts-ignore-line
export const SmallDialog = withStyles(() => ({
	root: {
		zIndex: '5000 !important',
		width: '100%'
	},
	paper: {
		maxWidth: 500,
		width: '100%'
	}
}))(MuiDialog);
