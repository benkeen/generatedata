import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '~components/TextField';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import Portal from '~components/Portal';
import { isValidEmail } from '~utils/generalUtils';
import styles from './Login.scss';
import LoginError from './LoginError.component';

export type LoginDialogProps = {
	visible: boolean;
	onClose: any;
	onSubmit: (email: string, password: string, onError: Function) => void;
	i18n: any;
};

const LoginDialog = ({ visible, onClose, onSubmit, i18n }: LoginDialogProps): JSX.Element => {
	const textFieldRef = useRef<any>();
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [hasLoginError, setLoginError] = useState(false);

	const onLogin = (e: any): void => {
		e.preventDefault();

		let eError = '';
		if (!email.trim()) {
			eError = 'Please enter your email address';
		} else if (!isValidEmail(email)) {
			eError = 'Please enter a valid email address';
		}
		setEmailError(eError);

		const pError = password ? '' : 'Please enter your password';
		setPasswordError(pError);

		if (!eError && !pError) {
			onSubmit(email, password, () => {
				setLoginError(true);

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

	return (
		<>
			<Dialog onClose={onClose} open={visible} className={styles.loginDialog}>
				<form onSubmit={onLogin}>
					<div style={{ width: 380 }}>
						<DialogTitle onClose={onClose}>{i18n.login}</DialogTitle>

						<DialogContent dividers>
							<div>
								<label>{i18n.email}</label>
								<div style={{ marginBottom: 15 }}>
									<TextField
										ref={textFieldRef}
										value={email}
										error={emailError}
										name="email"
										onChange={(e: any): void => updateEmail(e.target.value)}
										style={{ width: '100%' }}
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
									/>
								</div>
							</div>
						</DialogContent>
						<DialogActions>
							<Button type="submit" onClick={onLogin} color="primary" variant="outlined">
								{i18n.login}
							</Button>
						</DialogActions>
					</div>
				</form>
			</Dialog>

			<Portal id="loginErrorPortal">
				<LoginError
					message="Sorry there was an error logging in. Please check your credentials."
					visible={hasLoginError}
					onClose={(): void => setLoginError(false)}
				/>
			</Portal>
		</>
	);
};

export default LoginDialog;
