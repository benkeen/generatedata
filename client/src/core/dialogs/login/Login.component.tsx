import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '~components/TextField';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import { isValidEmail, addToast } from '~utils/generalUtils';
import { DialogLoadingSpinner } from '~components/loaders/loaders';
import { hasVendorLogin, getVendorLoginButtons } from '~utils/authUtils';
import styles from './Login.scss';

const showVendorLoginColumn = hasVendorLogin();
const vendorLoginButtons = getVendorLoginButtons();

export type LoginDialogProps = {
	visible: boolean;
	isLoggingIn: boolean;
	onClose: () => void;
	onExited: () => void;
	onSubmit: (email: string, password: string, onError: Function) => void;
	i18n: any;
};

/**
 * The login dialog has baked-in support for standard logging into our database, but also optionally supports
 * logging in via external vendors: Google, Facebook and Github.
 */
const LoginDialog = ({ visible, onClose, isLoggingIn, onSubmit, onExited, i18n }: LoginDialogProps): JSX.Element => {
	const textFieldRef = useRef<any>();
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const onLogin = (e: any): void => {
		e.preventDefault();

		let eError = '';
		if (!email.trim()) {
			eError = i18n.validationNoEmail;
		} else if (!isValidEmail(email)) {
			eError = i18n.validationInvalidEmail;
		}
		setEmailError(eError);

		const pError = password ? '' : i18n.validationNoPassword;
		setPasswordError(pError);

		if (!eError && !pError) {
			onSubmit(email, password, () => {
				addToast({
					type: 'error',
					message: i18n.userNotFound
				});

				if (textFieldRef && textFieldRef.current) {
					textFieldRef.current.select();
					textFieldRef.current.focus();
				}
			});
		}
	};

	const updateEmail = (email: string): void => {
		if (emailError) {
			setEmailError('');
		}
		setEmail(email);
	};

	const updatePassword = (password: string): void => {
		if (passwordError) {
			setPasswordError('');
		}
		setPassword(password);
	};

	let width = 380;
	let layoutClass = '';

	if (showVendorLoginColumn) {
		width = 500;
		layoutClass = styles.withSecondCol;
	}

	const getSecondColumn = (): JSX.Element | null => {
		if (!showVendorLoginColumn) {
			return null;
		}

		// @ts-ignore-line
		const buttons = vendorLoginButtons.map((VendorButton, index) => <VendorButton key={index} />);

		return (
			<>
				<div className={styles.separator}>
					<div>or</div>
				</div>
				<div className={styles.col}>
					{buttons}
				</div>
			</>
		);
	};

	return (
		<>
			<Dialog onClose={onClose} open={visible} className={styles.loginDialog} onExited={onExited}>
				<form onSubmit={onLogin}>
					<div style={{ width }}>
						<DialogTitle onClose={onClose}>{i18n.login}</DialogTitle>
						<DialogContent dividers>
							<div className={layoutClass}>
								<div className={styles.col}>
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

									<label>{i18n.password}</label>
									<div style={{ marginBottom: 15 }}>
										<TextField
											type="password"
											error={passwordError}
											name="password"
											value={password}
											onChange={(e: any): void => updatePassword(e.target.value)}
											style={{ width: '100%' }}
											disabled={isLoggingIn}
										/>
									</div>
								</div>
								{getSecondColumn()}
							</div>
						</DialogContent>
						<DialogActions>
							<Button type="submit" color="primary" variant="outlined" disabled={isLoggingIn}>
								{i18n.login}
							</Button>
						</DialogActions>
					</div>
				</form>
				<DialogLoadingSpinner visible={isLoggingIn} />
			</Dialog>
		</>
	);
};

export default LoginDialog;
