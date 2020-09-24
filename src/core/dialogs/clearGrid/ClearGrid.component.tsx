import * as React from 'react';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import styles from './ClearGrid.scss';

export type ClearGridProps = {
	visible: boolean;
	onClose: any;
	onClear: () => void;
	i18n: any;
};

const ClearGridDialog = ({ visible, onClose, onClear, i18n }: ClearGridProps): JSX.Element => (
	<Dialog onClose={onClose} open={visible}>
		<div style={{ width: 420 }}>
			<DialogTitle onClose={onClose}>{i18n.clearPage}</DialogTitle>
			<DialogContent dividers className={styles.contentPanel}>
				<WarningIcon />
				<div>
					{i18n.clearPageConfirmation}
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClear} color="secondary" variant="outlined">
					{i18n.yes}
				</Button>
				<Button onClick={onClose} color="primary" variant="outlined">
					{i18n.no}
				</Button>
			</DialogActions>
		</div>
	</Dialog>
);

export default ClearGridDialog;
