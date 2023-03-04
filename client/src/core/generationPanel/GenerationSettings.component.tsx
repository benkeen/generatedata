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
import { MediumSpinner } from '~components/loaders/loaders';
import Engine from './Engine.container';
import { DataPacket } from '~store/packets/packets.reducer';
import * as coreUtils from '~utils/coreUtils';
import CheckIcon from '@material-ui/icons/Check';
import { GenerationWorkerActionType } from '~core/generator/generation.types';

export type GenerationSettingsProps = {
	visible: boolean;
	packet: DataPacket | null;
	isLoggedIn: boolean;
	isGenerating: boolean;
	onChangeNumRowsToGenerate: (numRows: number) => void;
	onClose: () => void;
	onGenerate: () => void;
	onAbort: () => void;
	onDownload: () => void;
	numRowsToGenerate: number;
	i18n: any;
	stripWhitespace: boolean;
	onToggleStripWhitespace: () => void;
	workerResources: any;
};

const GenerationSettingsPanel = ({
	visible, isLoggedIn, onClose, i18n, stripWhitespace, numRowsToGenerate, onChangeNumRowsToGenerate,
	onToggleStripWhitespace, onGenerate, isGenerating, packet, onAbort, onDownload
}: GenerationSettingsProps): JSX.Element => {
	let error = '';

	if (!numRowsToGenerate) {
		error = i18n.requiredField;
	} else if (!isLoggedIn && numRowsToGenerate > env.maxDemoModeRows) {
		error = getI18nString(i18n.overMaxAnonRows, [getFormattedNum(env.maxDemoModeRows)]);
	}

	const getEngine = (): JSX.Element | null => {
		if (!visible || !isGenerating) {
			return null;
		}

		return (
			<Engine />
		);
	};

	const getGenerationOverlay = (): JSX.Element | null => {
		if (!isGenerating || !packet) {
			return null;
		}

		const { numGeneratedRows } = packet;

		if (packet.numGeneratedRows === numRowsToGenerate) {
			return (
				<>
					<div className={styles.generationOverlayBg} />
					<div className={styles.generationComplete}>
						<CheckIcon fontSize="large" />
						{i18n.dataGenerated}
					</div>
				</>
			);
		}

		return (
			<>
				<div className={styles.generationOverlayBg} />
				<div className={styles.generationOverlay}>
					<MediumSpinner style={{ margin: 15 }} />
					<div className={styles.generationLabel}>
						{i18n.generated} <b>{numGeneratedRows}</b> / <b>{numRowsToGenerate}</b>
					</div>
				</div>
			</>
		);
	};

	let buttonLabel = i18n.generate;
	let actionButtonClick = onGenerate;
	let actionButtonDisabled = !!error;

	if (packet) {
		if (packet.numGeneratedRows === numRowsToGenerate) {
			buttonLabel = i18n.download;
			actionButtonClick = onDownload;
			actionButtonDisabled = false;
		}
	}

	const closeModal = (): void => {
		if (packet) {
			const { generationWorkerId } = packet;
			const generationWorker = coreUtils.getGenerationWorker(generationWorkerId);

			onAbort();
			onClose();
			generationWorker.postMessage({ action: GenerationWorkerActionType.Abort });
			coreUtils.destroyGenerationWorker(generationWorkerId);
		} else {
			onClose();
		}
	};

	let cancelButton: any = <Button onClick={closeModal} color="default">{i18n.cancel}</Button>;
	if (packet && packet.numGeneratedRows === numRowsToGenerate) {
		cancelButton = null;
	}

	return (
		<>
			<Dialog onClose={onClose} open={visible}>
				<div style={{ width: 400 }}>
					<DialogTitle onClose={closeModal}>{i18n.generate}</DialogTitle>
					<DialogContent dividers className={styles.generationSettingsContent}>
						{getGenerationOverlay()}
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
						<div style={{ display: 'flex', width: '100%' }}>
							<div style={{ flex: 1 }} />
							<div>
								{cancelButton}
								<Button
									type="submit"
									onClick={actionButtonClick}
									color="primary"
									disabled={actionButtonDisabled}
									disableElevation
									variant="contained"
								>
									{buttonLabel}
								</Button>
							</div>
						</div>
					</DialogActions>
				</div>
			</Dialog>
			{getEngine()}
		</>
	);
};

export default GenerationSettingsPanel;
