import * as React from 'react';
import RadioPill, { RadioPillRow } from '~components/radioPills/RadioPill';
import styles from './Javascript.scss';
import { ETDownloadPacket, ETDownloadPacketResponse, ETState } from '~types/exportTypes';

export type JavascriptExportFormat = 'variable' | 'es6' | 'commonJs';
export interface ProgrammingLanguageState extends ETState {
	jsExportFormat: JavascriptExportFormat;
}

export const initialState: ProgrammingLanguageState = {
	jsExportFormat: 'variable',
	isValid: true
};

export const Settings = ({ i18n, id, data, onUpdate }: any): JSX.Element => {
	const onChange = (prop: string, value: any): void => {
		onUpdate({
			...data,
			[prop]: value
		});
	};

	return (
		<div className={styles.jsExportFormat}>
			{i18n.format}
			<RadioPillRow>
				<RadioPill
					label={i18n.variable}
					onClick={(): void => onChange('jsExportFormat', 'variable')}
					name={`${id}-js-export-format`}
					checked={data.jsExportFormat === 'variable'}
				/>
				<RadioPill
					label={i18n.es6Format}
					onClick={(): void => onChange('jsExportFormat', 'es6')}
					name={`${id}-js-export-format`}
					checked={data.jsExportFormat === 'es6'}
				/>
				<RadioPill
					label={i18n.commonJsFormat}
					onClick={(): void => onChange('jsExportFormat', 'commonJs')}
					name={`${id}-js-export-format`}
					checked={data.jsExportFormat === 'commonJs'}
				/>
			</RadioPillRow>
		</div>
	);
};

export const getCodeMirrorMode = (): string => 'text/javascript';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => {
	return {
		filename: `data-${packetId}.js}`,
		fileType: ''
	};
};
