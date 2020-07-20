import * as React from 'react';
import Button from '@material-ui/core/Button';
import { SmallDialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import { CircularProgressWithLabel } from '~components/loaders';
import styles from './GenerationPanel.scss';

export type GenerationPanelProps = {
	visible: boolean;
	onChangeNumRowsToGenerate: (numRows: number) => void;
	onClose: () => void;
	onGenerate: () => void;
	numRowsToGenerate: number;
	i18n: any;
	stripWhitespace: boolean;
	onToggleStripWhitespace: () => void;
	numGeneratedRows: number;
	isGenerating: boolean;
};

const GenerationPanel = ({ visible, onClose, i18n, stripWhitespace, numGeneratedRows, numRowsToGenerate, onChangeNumRowsToGenerate,
	onGenerate, isGenerating }: GenerationPanelProps): JSX.Element => {

	const onCloseDialog = () => {
		if (isGenerating) {
			// TODO
		}
		onClose();
	};

	const getContent = () => {
		if (isGenerating) {
			const percentage = Math.round((numGeneratedRows / numRowsToGenerate) * 100);

			return (
				<div>
					<h3>Step 1: Generating data</h3>
					<CircularProgressWithLabel value={percentage} />
				</div>
			);
		}

		return (
			<>
				<div className={styles.intro}>
					Finished building your data set? Great! Time to generate the data. Please note that
					depending on the size of your data and the number of rows, this may take some time to complete.
				</div>

				<div className={`${styles.row} ${styles.generationRow}`}>
					Generate
					<input
						type="number"
						value={numRowsToGenerate}
						onChange={(e: any) => onChangeNumRowsToGenerate(e.target.value)}
					/> rows
				</div>

				<div className={styles.row}>
					<input type="checkbox" id="stripWhitespace" checked={stripWhitespace} />
					<label htmlFor="stripWhitespace">strip whitespace from generated content</label>
				</div>
			</>
		);
	};

	// TODO move clearGeneration code to onExit. That seems to run after the fade-out transition is complete
	return (
		<SmallDialog onClose={onCloseDialog} aria-labelledby="customized-dialog-title" open={visible}>
			<DialogTitle onClose={onCloseDialog}>{i18n.generate}</DialogTitle>
			<DialogContent dividers>
				{getContent()}
			</DialogContent>
			<DialogActions>
				<Button onClick={onGenerate} color="primary" variant="outlined">Generate</Button>
			</DialogActions>
		</SmallDialog>
	);
};

export default GenerationPanel;
