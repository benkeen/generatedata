import * as React from 'react';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import styles from './ActivityPanel.scss';
import sharedStyles from '../../styles/shared.scss';
import { ErrorTooltip } from '~components/tooltips';

export type GenerationSettingsProps = {
	visible: boolean;
	onChangeNumRowsToGenerate: (numRows: number) => void;
	onClose: () => void;
	onGenerate: () => void;
	numRowsToGenerate: number;
	i18n: any;
	stripWhitespace: boolean;
	onToggleStripWhitespace: () => void;
};

const GenerationPanel = ({
	visible, onClose, i18n, stripWhitespace, numRowsToGenerate, onChangeNumRowsToGenerate, onToggleStripWhitespace,
	onGenerate
}: GenerationSettingsProps): JSX.Element => {
	const error = !numRowsToGenerate ? i18n.requiredField : '';

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 360 }}>
				<DialogTitle onClose={onClose}>{i18n.generate}</DialogTitle>
				<DialogContent dividers>
					<div className={`${styles.row} ${styles.generationRow}`}>
						{i18n.generate}
						<ErrorTooltip title={error} arrow disableHoverListener={!error} disableFocusListener={!error}>
							<NumberFormat
								className={error ? sharedStyles.errorField : ''}
								value={numRowsToGenerate}
								displayType="input"
								autoFocus
								thousandSeparator={true}
								onValueChange={({ value }): void => onChangeNumRowsToGenerate(parseInt(value, 10))}
							/>
						</ErrorTooltip>
						{i18n.rows}
					</div>
					<div className={styles.row} style={{ marginBottom: 16 }}>
						<input
							type="checkbox"
							id="stripWhitespace"
							checked={stripWhitespace}
							onChange={onToggleStripWhitespace}
						/>
						<label htmlFor="stripWhitespace">{i18n.stripWhitespace}</label>
					</div>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={onClose}
						color="default">{i18n.cancel}</Button>
					<Button
						type="submit"
						onClick={onGenerate}
						color="primary"
						disabled={!numRowsToGenerate}
						variant="contained">{i18n.generate}</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default GenerationPanel;
