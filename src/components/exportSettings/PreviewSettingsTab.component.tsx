import React from 'react';
import Dropdown from '../dropdown/Dropdown';
import Switch from '@material-ui/core/Switch';
import { getArrayOfSize } from '../../utils/arrayUtils';
import C from '../../core/constants';
import * as styles from './ExportSettings.scss';

export type PreviewSettingsTabProps = {
	theme: string;
	numPreviewRows: number;
	showRowNumbers: boolean;
	enableLineWrapping: boolean;
	previewTextSize: number;
	onChangeTheme: Function;
	toggleRowNumbers: Function;
	toggleLineWrapping: Function;
	onChangePreviewTextSize: Function;
	updateNumPreviewRows: Function;
};

const previewRowOptions = getArrayOfSize(C.MAX_PREVIEW_ROWS - C.MIN_PREVIEW_ROWS + 1).map((i, index) => {
	const rowNum = index + C.MIN_PREVIEW_ROWS;
	return {
		value: rowNum,
		label: rowNum
	};
});

export const PreviewSettingsTab = ({
	theme, numPreviewRows, showRowNumbers, enableLineWrapping, previewTextSize, onChangeTheme,
	toggleRowNumbers, toggleLineWrapping, onChangePreviewTextSize, updateNumPreviewRows
}: PreviewSettingsTabProps): JSX.Element => {
	return (
		<div className={styles.tabContent}>
			<div className={styles.row}>
				<div className={styles.label}>Theme</div>
				<div className={styles.field}>
					<Dropdown
						value={theme}
						options={C.THEMES}
						onChange={({ value }: any): void => onChangeTheme(value)}
					/>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>Show line numbers</div>
				<div className={styles.field}>
					<Switch
						checked={showRowNumbers}
						value="checked"
						color="default"
						onChange={(): void => toggleRowNumbers()}
					/>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>Line wrapping</div>
				<div className={styles.field}>
					<Switch
						checked={enableLineWrapping}
						value="checked"
						color="default"
						onChange={(): void => toggleLineWrapping()}
					/>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>Text size</div>
				<div className={styles.field}>
					<input
						type="number"
						value={previewTextSize}
						style={{ width: 60 }}
						onChange={(e: any): void => onChangePreviewTextSize(parseInt(e.target.value, 10))}
					/>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>Preview rows</div>
				<div className={styles.field}>
					<div style={{ width: 120 }}>
						<Dropdown
							value={numPreviewRows}
							onChange={(item: any): any => updateNumPreviewRows(item.value)}
							options={previewRowOptions}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
