import React from 'react';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import styles from './DeleteDataSetDialog.scss';

export type DeleteDataSetDialogProps = {
	visible: boolean;
	dataSetName: string;
	onClose: any;
	i18n: any;
};

const DeleteDataSetDialog = ({ visible, dataSetName, onClose, i18n }: DeleteDataSetDialogProps): JSX.Element => (
	<Dialog onClose={onClose} open={visible}>
		<div style={{ width: 420 }}>
			<DialogTitle onClose={onClose}>Delete Data Set</DialogTitle>
			<DialogContent dividers className={styles.contentPanel}>
				<WarningIcon/>
				<div>
					<div style={{ marginBottom: 8 }}>
						Are you sure you want to delete this Data Set?

						<div className={styles.dataSetName}>{dataSetName}</div>
					</div>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="secondary" variant="outlined" className="clearGrid">
					{i18n.cancel}
				</Button>
				<Button onClick={onClose} color="primary" variant="outlined" className="cancelClearGrid">
					{i18n.delete}
				</Button>
			</DialogActions>
		</div>
	</Dialog>
);

export default DeleteDataSetDialog;
