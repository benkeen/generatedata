import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import { PrimaryButton, NullButton } from '~components/Buttons.component';
import styles from './DeleteAccount.scss';

export type DeleteAccountDialogProps = {
	visible: boolean;
	name: string;
	onClose: () => void;
	onDelete: () => void;
	onExited: () => void;
	i18n: any;
};

const DeleteAccountDialog = ({ visible, name, onClose, onDelete, onExited, i18n }: DeleteAccountDialogProps) => (
	<Dialog
		onClose={onClose}
		open={visible}
		TransitionProps={{
			onExited
		}}
	>
		<div style={{ width: 420 }}>
			<DialogTitle onClose={onClose}>{i18n.deleteAccount}</DialogTitle>
			<DialogContent dividers className={styles.contentPanel}>
				<p>{i18n.confirmDeleteAccount}</p>

				<p className={styles.accountName}>
					<b>{name}</b>
				</p>
			</DialogContent>
			<DialogActions>
				<NullButton onClick={onClose}>{i18n.cancel}</NullButton>
				<PrimaryButton onClick={onDelete}>{i18n.delete}</PrimaryButton>
			</DialogActions>
		</div>
	</Dialog>
);

export default DeleteAccountDialog;
