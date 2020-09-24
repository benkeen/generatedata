import * as React from 'react';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';
import { Dialog, DialogContent } from '~components/dialogs';
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
	visible, onClose, i18n, stripWhitespace, numRowsToGenerate, onChangeNumRowsToGenerate, onGenerate
}: GenerationSettingsProps): JSX.Element => {
	return (
		<Dialog onClose={onClose} open={visible}>
			<div style={{ width: 360, height: 156, padding: 22 }}>
				<DialogContent style={{ padding: 0 }}>
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
						<input type="checkbox" id="stripWhitespace" checked={stripWhitespace} />
						<label htmlFor="stripWhitespace">strip whitespace from generated content</label>
					</div>
					<Button
						type="submit"
						onClick={onGenerate}
						color="primary"
						style={{ float: 'right' }}
						variant="contained">{i18n.generate}</Button>
					<Button
						onClick={onClose}
						color="default"
						style={{ float: 'right', marginRight: 8 }}>{i18n.cancel}</Button>
				</DialogContent>
			</div>
		</Dialog>
	);
};

export default GenerationPanel;
