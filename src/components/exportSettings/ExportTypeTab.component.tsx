import React from 'react';
import Dropdown, { DropdownOption } from '../dropdown/Dropdown';
import { exportTypeOptions } from '../../utils/exportTypeUtils';
import * as styles from './ExportSettings.scss';

export type ExportTypeTabProps = {
	exportType: string;
	onChangeExportType: (exportType: string) => void;
};

export const ExportTypeTab = ({
	exportType, onChangeExportType
}: ExportTypeTabProps): JSX.Element => {
	return (
		<div className={styles.tabContent}>
			<div className={styles.row}>
				<div className={styles.label}>Export Type</div>
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
		</div>
	);
};
