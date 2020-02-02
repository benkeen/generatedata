import * as React from 'react';
import Switch from '@material-ui/core/Switch';
import Dropdown from '../dropdown/Dropdown';
import { getArrayOfSize } from '../../utils/arrayUtils';
import C from '../../core/constants';
import styles from './PreviewPanel.scss';

export type PreviewPanelSettingsProps = {
	theme: string;
	numPreviewRows: number;
	showRowNumbers: boolean;
	enableLineWrapping: boolean;
	previewTextSize: number;
	textSize: number;
	onChangeTheme: Function;
	toggleRowNumbers: Function;
	toggleLineWrapping: Function;
	onChangePreviewTextSize: Function;
	updateNumPreviewRows: Function;
}

const options = getArrayOfSize(10).map((i, index) => ({ value: index + 1, label: index + 1 }));

export const PreviewPanelSettings = ({
	theme, previewTextSize, onChangeTheme, showRowNumbers, enableLineWrapping, toggleRowNumbers, toggleLineWrapping, 
	onChangePreviewTextSize, numPreviewRows, updateNumPreviewRows
}: PreviewPanelSettingsProps): React.ReactElement => {

	return (
		<div className={styles.previewPanelSettings}>
			<div>
				Theme:
				<Dropdown
					value={theme}
					options={C.THEMES}
					onChange={({ value }: any): void => onChangeTheme(value)}
				/>
			</div>
			<div>
				Show line numbers
				<Switch
					checked={showRowNumbers}
					value="checked"
					color="default"
					onChange={(): void => toggleRowNumbers()}
				/>
			</div>
			<div>
				Line Wrapping
				<Switch
					checked={enableLineWrapping}
					value="checked"
					color="default"
					onChange={(): void => toggleLineWrapping()}
				/>
			</div>
			<div>
				Text size
				<input
					type="number"
					value={previewTextSize}
					style={{ width: 60 }}
					onChange={(e: any): void => onChangePreviewTextSize(parseInt(e.target.value, 10))}
				/>
			</div>
			<div>
				Preview rows: 
				<Dropdown
					value={numPreviewRows}
					onChange={(item: any): any => updateNumPreviewRows(item.value)}
					options={options}
				/>
			</div>
		</div>
	);
};
