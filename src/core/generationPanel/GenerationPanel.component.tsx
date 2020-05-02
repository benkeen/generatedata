import * as React from 'react';
import Button from '@material-ui/core/Button';
import { SmallDialog, DialogTitle, DialogContent, DialogActions } from '../../components/dialogs';
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
};

const GenerationPanel = ({ visible, onClose, i18n, stripWhitespace, numGenerationRows,
	onChangeNumGenerationRows, onGenerate }: GenerationPanelProps): JSX.Element => {
	return (
		<SmallDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={visible}>
			<DialogTitle onClose={onClose}>{i18n.generate}</DialogTitle>
			<DialogContent dividers>
				<div className={styles.intro}>
					Finished building your data set? Great! Time to generate the data. Please note that
					depending on the size of your data and the number of rows, this may take some time to complete.
				</div>

				<div className={styles.row}>
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
			</DialogContent>
			<DialogActions>
				<Button onClick={onGenerate} color="primary" variant="outlined">Generate</Button>
			</DialogActions>
		</SmallDialog>
	);
};

export default GenerationPanel;
