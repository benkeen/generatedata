import React from 'react';
import { PrimaryButton, NullButton } from '~components/Buttons.component';
import WarningIcon from '@material-ui/icons/Warning';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import styles from './DeleteDataSetDialog.scss';

export type DeleteDataSetDialogProps = {
	visible: boolean;
	onClose: () => void;
	onDelete: () => void;
	i18n: any;
	dataSetName?: string | null;
};

const DeleteDataSetDialog = ({ visible, dataSetName, onClose, onDelete, i18n }: DeleteDataSetDialogProps): JSX.Element => (
	<Dialog onClose={onClose} open={visible}>
		<div style={{ width: 420 }}>
			<DialogTitle onClose={onClose}>{i18n.deleteDataSet}</DialogTitle>
			<DialogContent dividers className={styles.contentPanel}>
				<WarningIcon />
				<div style={{ flex: 1 }}>
					{i18n.deleteDataSetConfirm}
					{dataSetName ? <div className={styles.dataSetName}>{dataSetName}</div> : null}
				</div>
			</DialogContent>
			<DialogActions>
				<NullButton onClick={onClose}>{i18n.cancel}</NullButton>
				<PrimaryButton onClick={onDelete}>{i18n.delete}</PrimaryButton>
			</DialogActions>
		</div>
	</Dialog>
);

export default DeleteDataSetDialog;
