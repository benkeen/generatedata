import React from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import styles from './SaveDataSet.scss';

export type SaveDataSetDialogProps = {
	visible: boolean;
	isLoggedIn: boolean;
	onRedirectToLogin: () => void;
	onClose: any;
	i18n: any;
};

const SaveDataSetDialog = ({ visible, isLoggedIn, onClose, onRedirectToLogin, i18n }: SaveDataSetDialogProps): JSX.Element => {
	let title = i18n.save;
	let content: any = '';
	let buttons = (
		<Button onClick={onClose} color="primary" variant="outlined">
			{i18n.save}
		</Button>
	);

	if (!isLoggedIn) {
		title = 'Please login';
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
			<div style={{ width: 420 }}>
				<DialogTitle onClose={onClose}>{title}</DialogTitle>
				<DialogContent dividers className={styles.contentPanel}>
					{content}
				</DialogContent>
				<DialogActions>
					{buttons}
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default SaveDataSetDialog;
