import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '~components/TextField';
// import * as styles from '../Account.scss';

export type ChangePasswordProps = {
	onSave: (password: string) => void;
	i18n: any;
};

const ChangePassword = ({ onSave, i18n }: ChangePasswordProps): JSX.Element => {
	const currentPasswordField = useRef<HTMLInputElement>();
	const [currentPassword, setCurrentPassword] = useState('');

	const passwordField = useRef<HTMLInputElement>();
	const [password, setPassword] = useState('');

	const password2Field = useRef<HTMLInputElement>();
	const [password2, setPassword2] = useState('');
	const [password2Error, setPassword2Error] = useState('');

	const handleSave = (e: any): void => {
		e.preventDefault();

		if (isValid(true)) {
			onSave(password);
		}
	};

	// TODO move validation errors to RIGHT of field, and making them show up immediately would be nice
	const isValid = (showErrors = false): boolean => {
		let hasError = false;
		if (currentPassword.trim() === '') {
			hasError = true;
		}

		if (password.trim() === '') {
			hasError = true;
		} else if (password2.trim() === '') {
			hasError = true;
		} else if (password !== password2) {
			if (showErrors) {
				setPassword2Error(i18n.validationDifferentNewPasswords);
				password2Field.current!.focus();
				hasError = true;
			}
		}

		return !hasError;
	};

	const submitButtonEnabled = isValid();

	return (
		<form onSubmit={handleSave} autoComplete="off">
			<div style={{ marginBottom: 10, width: 400 }}>
				<label>Current password</label>
				<div style={{ marginBottom: 15, paddingBottom: 20, borderBottom: '1px solid #dddddd' }}>
					<TextField
						type="password"
						ref={currentPasswordField}
						value={currentPassword}
						name="currentPassword"
						onChange={(e: any): void => setCurrentPassword(e.target.value)}
						style={{ width: 220 }}
						autoFocus
					/>
				</div>

				<label>{i18n.password}</label>
				<div style={{ marginBottom: 15 }}>
					<TextField
						type="password"
						ref={passwordField}
						value={password}
						name="password"
						onChange={(e: any): void => setPassword(e.target.value)}
						style={{ width: 220 }}
					/>
				</div>

				<label>{i18n.reenterPassword}</label>
				<div style={{ marginBottom: 15 }}>
					<TextField
						type="password"
						ref={password2Field}
						value={password2}
						error={password2Error}
						name="password2"
						onChange={(e: any): void => setPassword2(e.target.value)}
						autocomplete="off"
						style={{ width: 220 }}
					/>
				</div>
			</div>

			<div>
				<Button
					type="submit"
					color="primary"
					variant="contained"
					disabled={!submitButtonEnabled}
					disableElevation
				>
					{i18n.update}
				</Button>
			</div>
		</form>
	);
};

export default ChangePassword;

