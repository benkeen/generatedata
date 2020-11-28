import React, { useEffect } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const Alert = (props: AlertProps): JSX.Element => <MuiAlert elevation={6} variant="filled" {...props} />;

const LoginError = ({ message, visible, onClose }: any): JSX.Element => {
	const [open, setOpen] = React.useState(false);

	const handleClose = (): void => {
		setOpen(false);
		onClose();
	};

	useEffect(() => {
		setOpen(visible);
	}, [visible]);

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center'
			}}
			open={open}
			autoHideDuration={50000}
			onClose={handleClose}
		>
			<Alert onClose={handleClose} severity="error">{message}</Alert>
		</Snackbar>
	);
};

export default LoginError;
