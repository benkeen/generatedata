import React from 'react';
import Dropdown, { DropdownOption } from '../dropdown/Dropdown';
import { exportTypeOptions } from '../../utils/exportTypeUtils';
import * as styles from './ExportSettings.scss';
import { ExportSettingsTab } from './ExportSettings.types';

export type ExportTypeTabProps = {
	exportType: string;
	i18n: any;
	exportTypeI18n: any;
	onChangeExportType: (exportType: string) => void;
	exportSettingsTab: ExportSettingsTab;
	ExportTypeSettings: any;
};

export const ExportTypeTab = ({
	exportType, i18n, exportTypeI18n, onChangeExportType, ExportTypeSettings
}: ExportTypeTabProps): JSX.Element => {
	return (
		<div className={styles.tabContent}>
			<div className={styles.row}>
				<div className={styles.label}>Format</div>
				<div className={styles.field}>
					<div style={{ width: 180 }}>
						<Dropdown
							value={exportType}
							options={exportTypeOptions}
							onChange={({ value }: DropdownOption): any => onChangeExportType(value)}
						/>
					</div>
				</div>
			</div>
			<ExportTypeSettings
				coreI18n={i18n}
				i18n={exportTypeI18n}
			/>
		</div>
	);
};
