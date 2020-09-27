import * as React from 'react';
import RadioPill, { RadioPillRow } from '~components/radioPills/RadioPill';
import styles from './HTML.scss';
import { DTSettingsProps } from '~types/dataTypes';

type ExportFormat = 'table' | 'ul' | 'dl';

export type HTMLSettings = {
	exportFormat: ExportFormat;
};

export const initialState: HTMLSettings = {
	exportFormat: 'table'
};

export const Settings = ({ i18n, id, data, onUpdate }: DTSettingsProps): JSX.Element => {
	const onChange = (exportFormat: ExportFormat): void => {
		onUpdate({
			...data,
			exportFormat
		});
	};

	return (
		<div className={styles.row}>
			{i18n.dataFormat}
			<RadioPillRow className={styles.row}>
				<RadioPill
					label="table"
					onClick={(): void => onChange('table')}
					name={`${id}-dataFormat`}
					checked={data.exportFormat === 'table'}
				/>
				<RadioPill
					label="ul"
					onClick={(): void => onChange('ul')}
					name={`${id}-dataFormat`}
					checked={data.exportFormat === 'ul'}
				/>
				<RadioPill
					label="dl"
					onClick={(): void => onChange('dl')}
					name={`${id}-dataFormat`}
					checked={data.exportFormat === 'dl'}
				/>
			</RadioPillRow>
		</div>
	);
};

export const getCodeMirrorMode = (): string => 'text/html';
