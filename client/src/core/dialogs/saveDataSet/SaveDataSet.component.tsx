import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TextField from '~components/TextField';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import styles from './SaveDataSet.scss';

export type SaveDataSetDialogProps = {
	visible: boolean;
	isLoggedIn: boolean;
	onRedirectToLogin: () => void;
	onClose: any;
	onSave: (dataSetName: string) => void;
	i18n: any;
};

const SaveDataSetDialog = ({
	visible, isLoggedIn, onClose, onSave, onRedirectToLogin, i18n
}: SaveDataSetDialogProps): JSX.Element => {
	const newDataSetNameField = useRef<HTMLInputElement>();
	const [newDataSetName, setNewDataSetName] = useState('');
	const [newDataSetNameError, setNewDataSetErrorName] = useState('');

	let title = i18n.save;
	let content = (
		<div className={styles.newDataSet}>
			<TextField
				ref={newDataSetNameField}
				error={newDataSetNameError}
				placeholder={i18n.dataSetName}
				autoFocus
				value={newDataSetName}
				onChange={(e: any): void => {
					setNewDataSetName(e.target.value);
					setNewDataSetErrorName('');
				}}
			/>
		</div>
	);

	const saveDataSet = (e: any): void => {
		e.preventDefault();

		if (!newDataSetName.trim()) {
			setNewDataSetErrorName(i18n.missingDataSetName);
			newDataSetNameField.current!.focus();
		} else {
			onSave(newDataSetName);
			// TODO loading spinner
		}
	};

	let buttons = (
		<Button type="submit" color="primary" variant="outlined">
			{i18n.save}
		</Button>
	);

	if (!isLoggedIn) {
		title = i18n.pleaseLogin;
		content = (
			<div className={styles.notLoggedIn}>
				<PersonAddIcon />
				In order to save your data sets you first need an account. Please login or register below.
			</div>
		);
		buttons = (
			<>
				<Button onClick={onRedirectToLogin} color="primary" variant="outlined">
					{i18n.login}
				</Button>
				<Button onClick={onClose} color="primary" variant="outlined">
					{i18n.register}
				</Button>
			</>
		);
	}

	return (
		<Dialog onClose={onClose} open={visible}>
			<form onSubmit={saveDataSet}>
				<div style={{ width: 420 }}>
					<DialogTitle onClose={onClose}>{title}</DialogTitle>
					<DialogContent dividers className={styles.contentPanel}>
						{content}
					</DialogContent>
					<DialogActions>
						{buttons}
					</DialogActions>
				</div>
			</form>
		</Dialog>
	);
};

export default SaveDataSetDialog;
