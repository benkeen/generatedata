import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { PrimaryButton } from '~components/Buttons.component';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import { Tooltip } from '~components/tooltips';
import styles from './ClearPage.scss';

export const enum ClearPageType {
	dataOnly = 'dataOnly',
	everything = 'everything'
}

export type ClearPageDialogProps = {
	visible: boolean;
	onClose: any;
	onClear: (clearType: ClearPageType) => void;
	i18n: any;
};

const ClearPageDialog = ({ visible, onClose, onClear, i18n }: ClearPageDialogProps): JSX.Element => {
	const [clearType, onChangeClearType] = useState<ClearPageType>(ClearPageType.dataOnly);

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
									checked={clearType === ClearPageType.dataOnly}
									onChange={(): void => onChangeClearType(ClearPageType.dataOnly)}
								/>
								<label htmlFor="gdClearPageOption1">{i18n.clearDataGridOnly}</label>
							</li>
							<li className={styles.clearPageSelection}>
								<input
									type="radio"
									name="gdClearPageOption"
									id="gdClearPageOption2"
									checked={clearType === 'everything'}
									onChange={(): void => onChangeClearType(ClearPageType.everything)}
								/>
								<label htmlFor="gdClearPageOption2">{i18n.resetEverything}</label>
								<Tooltip title={i18n.clearAllDesc} arrow>
									<InfoIcon />
								</Tooltip>
							</li>
						</ul>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={(): void => onClear(clearType)} color="secondary" variant="outlined" className="clearGrid">
						{i18n.yes}
					</Button>
					<PrimaryButton onClick={onClose} className="cancelClearGrid">
						{i18n.no}
					</PrimaryButton>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default ClearPageDialog;
