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

const options = getArrayOfSize(10).map((i, index) => ({ value: index + 1, label: index + 1 }));

export const PreviewSettingsTab = ({
	theme, numPreviewRows, showRowNumbers, enableLineWrapping, previewTextSize, onChangeTheme,
	toggleRowNumbers, toggleLineWrapping, onChangePreviewTextSize, updateNumPreviewRows
}: PreviewSettingsTabProps): JSX.Element => {
	return (
		<div className={styles.tabContent}>
			<div className={styles.row}>
				<div className={styles.label}>Theme</div>
				<div className={styles.field}>
					<div style={{ width: 180 }}>
						<Dropdown
							value={theme}
							options={C.THEMES}
							onChange={({ value }: any): void => onChangeTheme(value)}
						/>
					</div>
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
							options={options}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
