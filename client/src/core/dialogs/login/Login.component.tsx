import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

// @ts-ignore-line
import Cookies from 'js-cookie';
import Button from '@material-ui/core/Button';
import TextField from '~components/TextField';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import styles from './Login.scss';

export type ClearType = 'dataOnly' | 'everything';

export type LoginDialogProps = {
	visible: boolean;
	onClose: any;
	onClear: (clearType: ClearType) => void;
	i18n: any;
};

const LOGIN_MUTATION = gql`
	mutation LoginMutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`;

const LoginDialog = ({ visible, onClose, onClear, i18n }: LoginDialogProps): JSX.Element => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [login, { data }] = useMutation(LOGIN_MUTATION);

	const loginUser = async () => {
		const response = await login({
			variables: {
				email,
				password
			}
		});

		if (response) {
			console.log(response);

			Cookies.set('token', response.data.login.token);
		}
	};

	return (
		<Dialog onClose={onClose} open={visible} className={styles.loginDialog}>
			<div style={{ width: 380 }}>
				<DialogTitle onClose={onClose}>{i18n.login}</DialogTitle>

				<DialogContent dividers>
					<div>
						<label>{i18n.email}</label>
						<div style={{ marginBottom: 15 }}>
							<TextField
								value={email}
								onChange={(e: any): void => setEmail(e.target.value)}
								style={{ width: '100%' }}
								autoFocus
							/>
						</div>

						<label>{i18n.password}</label>
						<div style={{ marginBottom: 15 }}>
							<TextField
								type="password"
								value={password}
								onChange={(e: any): void => setPassword(e.target.value)}
								style={{ width: '100%' }}
							/>
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={loginUser} color="primary" variant="outlined">
						{i18n.login}
					</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default LoginDialog;
