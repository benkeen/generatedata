import React from 'react';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';
import { PrimaryButton } from '~components/Buttons.component';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import styles from './ClearPage.scss';

export type ClearPageDialogProps = {
	visible: boolean;
	onClose: any;
	onClear: () => void;
	i18n: any;
};

const ClearPageDialog = ({ visible, onClose, onClear, i18n }: ClearPageDialogProps): JSX.Element => (
	<Dialog onClose={onClose} open={visible}>
		<div style={{ width: 420 }}>
			<DialogTitle onClose={onClose}>{i18n.clearPage}</DialogTitle>
			<DialogContent dividers className={styles.contentPanel}>
				<WarningIcon />
				<div>
					<div style={{ marginBottom: 8 }}>{i18n.clearPageConfirmation}</div>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClear} color="secondary" variant="outlined" className="clearPage">
					{i18n.yes}
				</Button>
				<PrimaryButton onClick={onClose} className="cancelClearPage">
					{i18n.no}
				</PrimaryButton>
			</DialogActions>
		</div>
	</Dialog>
);

export default ClearPageDialog;
