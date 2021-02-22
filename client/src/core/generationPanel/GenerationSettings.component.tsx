import * as React from 'react';
import NumberFormat from 'react-number-format';
import env from '../../../_env';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import { getI18nString } from '~utils/langUtils';
import { getFormattedNum } from '~utils/numberUtils';
import styles from './ActivityPanel.scss';
import sharedStyles from '../../styles/shared.scss';
import { ErrorTooltip } from '~components/tooltips';
// import { MediumSpinner } from '~components/loaders/loaders';
// import Engine from './Engine.component';

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
	let error = '';
	if (!numRowsToGenerate) {
		error = i18n.requiredField;
	} else if (numRowsToGenerate > env.maxDemoModeRows) {
		error = getI18nString(i18n.overMaxAnonRows, [getFormattedNum(env.maxDemoModeRows)]);
	}

	/*
	<div className={styles.generationOverlayBg} />
	<div className={styles.generationOverlay}>
		<MediumSpinner style={{ margin: 15 }} />
		<div className={styles.generationLabel}>
			Generated <b>100</b> / <b>1000</b>
		</div>
	</div>
	*/

	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 400 }}>
				<DialogTitle onClose={onClose}>{i18n.generate}</DialogTitle>
				<DialogContent dividers className={styles.generationSettingsContent}>
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
						disabled={!!error}
						disableElevation
						variant="contained">{i18n.generate}</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default GenerationPanel;
