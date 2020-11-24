import React from 'react';
import Dropdown from '~components/dropdown/Dropdown';
import Switch from '@material-ui/core/Switch';
import { getArrayOfSize } from '~utils/arrayUtils';
import * as styles from './ExportSettings.scss';
import C from '../../constants';

export type PreviewSettingsTabProps = {
	theme: string;
	numPreviewRows: number;
	showLineNumbers: boolean;
	enableLineWrapping: boolean;
	previewTextSize: number;
	onChangeTheme: Function;
	toggleLineNumbers: Function;
	toggleLineWrapping: Function;
	onChangePreviewTextSize: Function;
	updateNumPreviewRows: Function;
	i18n: any;
};

const previewRowOptions = getArrayOfSize(C.MAX_PREVIEW_ROWS - C.MIN_PREVIEW_ROWS + 1).map((i, index) => {
	const rowNum = index + C.MIN_PREVIEW_ROWS;
	return {
		value: rowNum,
		label: rowNum
	};
});

export const PreviewSettingsTab = ({
	theme, numPreviewRows, showLineNumbers, enableLineWrapping, previewTextSize, onChangeTheme,
	toggleLineNumbers, toggleLineWrapping, onChangePreviewTextSize, updateNumPreviewRows, i18n
}: PreviewSettingsTabProps): JSX.Element => {
	return (
		<div className={styles.tabContent}>
			<div className={styles.row}>
				<div className={styles.label}>{i18n.theme}</div>
				<div className={styles.field}>
					<Dropdown
						value={theme}
						options={C.THEMES}
						onChange={({ value }: any): void => onChangeTheme(value)}
					/>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>{i18n.showLineNumbers}</div>
				<div className={styles.field}>
					<Switch
						checked={showLineNumbers}
						value="checked"
						color="primary"
						onChange={(): void => toggleLineNumbers()}
					/>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>{i18n.lineWrapping}</div>
				<div className={styles.field}>
					<Switch
						checked={enableLineWrapping}
						value="checked"
						color="primary"
						onChange={(): void => toggleLineWrapping()}
					/>
				</div>
			</div>
			<div className={styles.row}>
				<div className={styles.label}>{i18n.textSize}</div>
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
				<div className={styles.label}>{i18n.previewRows}</div>
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
