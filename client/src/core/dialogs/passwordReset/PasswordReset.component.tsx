import React, { useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import TextField from '~components/TextField';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import { isValidEmail } from '~utils/generalUtils';
import { DialogLoadingSpinner } from '~components/loaders/loaders';
import styles from './PasswordReset.scss';

export type PasswordResetDialogProps = {
	visible: boolean;
	isLoggingIn: boolean;
	onClose: () => void;
	onExited: () => void;
	onSubmit: (email: string, onError: Function) => void;
	showLoginDialog: () => void;
	i18n: any;
};

const PasswordResetDialog = ({ visible, onClose, isLoggingIn, onSubmit, onExited, showLoginDialog, i18n }: PasswordResetDialogProps): JSX.Element => {
	const textFieldRef = useRef<any>();
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');

	useEffect(() => {
		if (!visible) {
			setEmail('');
			return;
		}
	}, [visible]);

	const onLogin = (e: any): void => {
		e.preventDefault();

		let eError = '';
		if (!email.trim()) {
			eError = i18n.validationNoEmail;
		} else if (!isValidEmail(email)) {
			eError = i18n.validationInvalidEmail;
		}
		setEmailError(eError);

		if (!eError) {
			onSubmit(email, () => {
				// addToast({
				// 	type: 'error',
				// 	message: i18n.userNotFound
				// });
				//
				// if (textFieldRef && textFieldRef.current) {
				// 	textFieldRef.current.select();
				// 	textFieldRef.current.focus();
				// }
			});
		}
	};

	const updateEmail = (email: string): void => {
		if (emailError) {
			setEmailError('');
		}
		setEmail(email);
	};

	return (
		<>
			<Dialog onClose={onClose} open={visible} className={styles.loginDialog} onExited={onExited}>
				<form onSubmit={onLogin}>
					<div style={{ width: 380 }}>
						<DialogTitle onClose={onClose}>{i18n.passwordReset}</DialogTitle>
						<DialogContent dividers>
							<label>{i18n.email}</label>
							<div style={{ marginBottom: 15 }}>
								<TextField
									ref={textFieldRef}
									value={email}
									error={emailError}
									name="email"
									onChange={(e: any): void => updateEmail(e.target.value)}
									style={{ width: '100%' }}
									disabled={isLoggingIn}
									autoFocus
								/>
							</div>
						</DialogContent>
						<DialogActions className={styles.actionsRow}>
							<div className={styles.loginLink} onClick={showLoginDialog}>
								<div>
									<ArrowLeftIcon />
									{i18n.backToLogin}
								</div>
							</div>
							<Button type="submit" color="primary" variant="outlined" disabled={isLoggingIn}>
								{i18n.sendEmail}
							</Button>
						</DialogActions>
					</div>
				</form>
				<DialogLoadingSpinner visible={isLoggingIn} />
			</Dialog>
		</>
	);
};

export default PasswordResetDialog;
