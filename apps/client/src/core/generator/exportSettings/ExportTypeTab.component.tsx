import React from 'react';
import Dropdown, { DropdownOption } from '~components/dropdown/Dropdown';
import { getGroupedExportTypes } from '~utils/exportTypes';
import * as styles from './ExportSettings.scss';
import { ExportSettingsTab } from './ExportSettings.types';
import { MediumSpinner } from '~components/loaders/loaders';

export type ExportTypeTabProps = {
	exportType: string;
	i18n: any;
	exportTypeI18n: any;
	onChangeExportType: (exportType: string) => void;
	onUpdate: any;
	exportSettingsTab: ExportSettingsTab;
	SettingsComponent: any;
	exportTypeSettings: any;
};

export const ExportTypeTab = ({
	exportType,
	i18n,
	exportTypeI18n,
	onChangeExportType,
	SettingsComponent,
	onUpdate,
	exportTypeSettings
}: ExportTypeTabProps) => {
	let spinnerStyles = styles.spinner;
	if (SettingsComponent) {
		spinnerStyles += ` ${styles.fadeOut}`;
	}

	return (
		<div className={`${styles.tabContent} tour-exportTypeTabContent`}>
			<div className={`${styles.row} ${styles.exportFormatRow}`}>
				<div className={styles.label}>{i18n.format}</div>
				<div className={`${styles.field} tour-exportTypeDropdown`}>
					<div style={{ width: 180 }}>
						<Dropdown
							isGrouped={true}
							value={exportType}
							options={getGroupedExportTypes()}
							onChange={({ value }: DropdownOption): any => onChangeExportType(value)}
						/>
					</div>
				</div>
			</div>

			<div className="tour-exportTypeSettings">
				{SettingsComponent ? (
					<SettingsComponent
						id={`exportTypeSettings-${exportType}`}
						coreI18n={i18n}
						i18n={exportTypeI18n}
						onUpdate={onUpdate}
						data={exportTypeSettings}
					/>
				) : null}
			</div>
			<MediumSpinner className={spinnerStyles} />
		</div>
	);
};
