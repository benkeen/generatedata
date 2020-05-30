import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../components/dialogs';
import styles from './ClearGrid.scss';

export type ClearGridProps = {
	visible: boolean;
	onClose: any;
	onClear: () => void;
	i18n: any;
};

const ClearGridDialog = ({ visible, onClose, onClear, i18n }: ClearGridProps): JSX.Element => (
	<Dialog onClose={onClose} open={visible}>
		<DialogTitle onClose={onClose}>Clear grid</DialogTitle>
		<DialogContent dividers className={styles.contentPanel}>
			<div>
				Are you sure you want to clear the page? This will lose any changes you've made.
			</div>
		</DialogContent>
		<DialogActions>
			<Button onClick={onClose} color="primary" variant="outlined">
				{i18n.yes}
			</Button>
			<Button onClick={onClose} color="primary" variant="outlined">
				{i18n.no}
			</Button>
		</DialogActions>
	</Dialog>
);

export default ClearGridDialog;
