import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '~components/TextField';
// import * as styles from '../Account.scss';

export type ChangePasswordProps = {
	onSave: (password: string) => void;
	i18n: any;
};

const ChangePassword = ({ onSave, i18n }: ChangePasswordProps) => {
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');

	const handleSave = () => {
		onSave(password);
	};

	return (
		<>
			<div style={{ marginBottom: 10 }}>
				<label>{i18n.password}</label>
				<div style={{ marginBottom: 15 }}>
					<TextField
						type="password"
						value={password}
						name="password"
						onChange={(e: any): void => setPassword(e.target.value)}
						style={{ width: 220 }}
						autoFocus
					/>
				</div>

				<label>Re-enter password</label>
				<div style={{ marginBottom: 15 }}>
					<TextField
						type="password"
						value={password2}
						name="password2"
						onChange={(e: any): void => setPassword2(e.target.value)}
						style={{ width: 220 }}
					/>
				</div>
			</div>

			<div>
				<Button onClick={handleSave} color="primary" variant="contained" disableElevation>{i18n.save}</Button>
			</div>
		</>
	);
};

export default ChangePassword;

