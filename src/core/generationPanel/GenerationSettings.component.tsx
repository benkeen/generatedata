import * as React from 'react';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import styles from './ActivityPanel.scss';

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
}: GenerationSettingsProps): JSX.Element => (
	<Dialog onClose={onClose} open={visible}>
		<div style={{ width: 360 }}>
			<DialogTitle onClose={onClose}>Generate</DialogTitle>
			<DialogContent dividers>
				<div className={`${styles.row} ${styles.generationRow}`}>
					Generate
					<NumberFormat
						value={numRowsToGenerate}
						displayType="input"
						autoFocus
						thousandSeparator={true}
						onValueChange={({ value }): void => onChangeNumRowsToGenerate(parseInt(value, 10))}
					/>
					rows
				</div>
				<div className={styles.row} style={{ marginBottom: 16 }}>
					<input
						type="checkbox"
						id="stripWhitespace"
						checked={stripWhitespace}
						onChange={onToggleStripWhitespace}
					/>
					<label htmlFor="stripWhitespace">strip whitespace from generated content</label>
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
					variant="contained">{i18n.generate}</Button>
			</DialogActions>
		</div>
	</Dialog>
);

export default GenerationPanel;
