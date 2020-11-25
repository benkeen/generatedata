import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import styles from './ClearGrid.scss';

export type ClearType = 'dataOnly' | 'everything';

export type ClearGridProps = {
	visible: boolean;
	onClose: any;
	onClear: (clearType: ClearType) => void;
	i18n: any;
};

const ClearGridDialog = ({ visible, onClose, onClear, i18n }: ClearGridProps): JSX.Element => {
	const [clearType, onChangeClearType] = useState<ClearType>('dataOnly');

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 420 }}>
				<DialogTitle onClose={onClose}>{i18n.clearPage}</DialogTitle>
				<DialogContent dividers className={styles.contentPanel}>
					<WarningIcon/>
					<div>
						<div style={{ marginBottom: 8 }}>
							{i18n.clearPageConfirmation}
						</div>
						<ul>
							<li>
								<input
									type="radio"
									name="gdClearPageOption"
									id="gdClearPageOption1"
									checked={clearType === 'dataOnly'}
									onChange={(): void => onChangeClearType('dataOnly')}
								/>
								<label htmlFor="gdClearPageOption1">{i18n.clearDataGridOnly}</label>
							</li>
							<li>
								<input
									type="radio"
									name="gdClearPageOption"
									id="gdClearPageOption2"
									checked={clearType === 'everything'}
									onChange={(): void => onChangeClearType('everything')}
								/>
								<label htmlFor="gdClearPageOption2">{i18n.resetEverything}</label>
							</li>
						</ul>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={(): void => onClear(clearType)} color="secondary" variant="outlined" className="clearGrid">
						{i18n.yes}
					</Button>
					<Button onClick={onClose} color="primary" variant="outlined" className="cancelClearGrid">
						{i18n.no}
					</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default ClearGridDialog;
