import * as React from 'react';
import styles from './XML.scss';
import { ETDownloadPacket, ETDownloadPacketResponse, ETSettings, ETState } from '~types/exportTypes';

export interface XMLSettings extends ETState {
	rootNodeName: string;
	recordNodeName: string;
	useCustomExportFormat: boolean;
	customFormat: string;
}

export const initialState: XMLSettings = {
	rootNodeName: 'records',
	recordNodeName: 'record',
	useCustomExportFormat: false,
	customFormat: '',
	isValid: true
};

export const Settings = ({ data, i18n, id, onUpdate }: ETSettings): JSX.Element => {
	const onChange = (prop: string, value: any): void => {
		onUpdate({
			...data,
			[prop]: value
		});
	};

	return (
		<>
			<div className={styles.row}>
				<label htmlFor={`${id}-rootNodeName`}>{i18n.rootNodeName}</label>
				<input
					type="text"
					id={`${id}-rootNodeName`}
					value={data.rootNodeName}
					onChange={(e): void => onChange('rootNodeName', e.target.value)}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor={`${id}-recordNodeName`}>{i18n.recordNodeName}</label>
				<input
					type="text"
					id={`${id}-recordNodeName`}
					value={data.recordNodeName}
					onChange={(e): void => onChange('recordNodeName', e.target.value)}
				/>
			</div>
		</>
	);
};

export const getCodeMirrorMode = (): string => 'text/html';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
	filename: `data-${packetId}.xml`,
	fileType: 'text/xml'
});
