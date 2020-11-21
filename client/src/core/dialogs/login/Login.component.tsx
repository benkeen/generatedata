import React from 'react';
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

const LoginDialog = ({ visible, onClose, onClear, i18n }: LoginDialogProps): JSX.Element => {
	return (
		<Dialog onClose={onClose} open={visible} className={styles.loginDialog}>
			<div style={{ width: 380 }}>
				<DialogTitle onClose={onClose}>Login</DialogTitle>

				<DialogContent dividers>
					<div>
						<label>{i18n.email}</label>
						<div style={{ marginBottom: 15 }}>
							<TextField
								value={'test@gmail.com'}
								onChange={() => {}}
								style={{ width: '100%' }}
								autoFocus
							/>
						</div>

						<label>{i18n.password}</label>
						<div style={{ marginBottom: 15 }}>
							<TextField
								type="password"
								value={'test@gmail.com'}
								style={{ width: '100%' }}
							/>
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary" variant="outlined">
						{i18n.login}
					</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default LoginDialog;
