import React from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import styles from './DeleteAccount.scss';

export type DeleteAccountDialogProps = {
	visible: boolean;
	onClose: () => void;
	onDelete: () => void;
	i18n: any;
	// dataSetName?: string | null;
};

const DeleteAccountDialog = ({ visible, onClose, onDelete, i18n }: DeleteAccountDialogProps): JSX.Element => (
	<Dialog onClose={onClose} open={visible}>
		<div style={{ width: 420 }}>
			<DialogTitle onClose={onClose}>{i18n.deleteAccount}</DialogTitle>
			<DialogContent dividers className={styles.contentPanel}>
				<p>
					Are you sure you want to delete this account?
				</p>

				<p className={styles.accountName}>
					<b>Tom Jones</b>
				</p>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="secondary" variant="outlined">{i18n.cancel}</Button>
				<Button onClick={onDelete} color="primary" variant="outlined">{i18n.delete}</Button>
			</DialogActions>
		</div>
	</Dialog>
);

export default DeleteAccountDialog;
