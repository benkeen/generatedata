import * as React from 'react';
import Button from '@material-ui/core/Button';
import { SmallDialog, DialogTitle, DialogContent, DialogActions } from '~components/dialogs';
import { CircularProgressWithLabel } from '~components/loaders';
import styles from './GenerationPanel.scss';

export type GenerationPanelProps = {
	visible: boolean;
	onChangeNumGenerationRows: (numRows: number) => void;
	onClose: () => void;
	onGenerate: () => void;
	numGenerationRows: number;
	i18n: any;
	stripWhitespace: boolean;
	onToggleStripWhitespace: () => void;
	isGenerating: boolean;
};

const GenerationPanel = ({ visible, onClose, i18n, stripWhitespace, numGenerationRows, onChangeNumGenerationRows,
	onGenerate, isGenerating }: GenerationPanelProps): JSX.Element => {


	const onCloseDialog = () => {
		if (isGenerating) {
			// TODO
		}
		onClose();
	};

	const getContent = () => {
		if (isGenerating) {
			return (
				<CircularProgressWithLabel value={10} />
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
						value={numGenerationRows}
						onChange={(e: any) => onChangeNumGenerationRows(e.target.value)}
					/> rows
				</div>

				<div className={styles.row}>
					<input type="checkbox" id="stripWhitespace" checked={stripWhitespace} />
					<label htmlFor="stripWhitespace">strip whitespace from generated content</label>
				</div>
			</>
		);
	};

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
