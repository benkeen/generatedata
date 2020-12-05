import React from 'react';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import styles from './DeleteDataSetDialog.scss';

export type DeleteDataSetDialogProps = {
	visible: boolean;
	dataSetName: string | null;
	onClose: () => void;
	onDelete: () => void;
	i18n: any;
};

const DeleteDataSetDialog = ({ visible, dataSetName, onClose, onDelete, i18n }: DeleteDataSetDialogProps): JSX.Element => (
	<Dialog onClose={onClose} open={visible}>
		<div style={{ width: 420 }}>
			<DialogTitle onClose={onClose}>{i18n.deleteDataSet}</DialogTitle>
			<DialogContent dividers className={styles.contentPanel}>
				<WarningIcon/>
				<div style={{ flex: 1 }}>
					{i18n.deleteDataSetConfirm}
					<div className={styles.dataSetName}>{dataSetName}</div>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="secondary" variant="outlined">{i18n.cancel}</Button>
				<Button onClick={onDelete} color="primary" variant="outlined">{i18n.delete}</Button>
			</DialogActions>
		</div>
	</Dialog>
);

export default DeleteDataSetDialog;
