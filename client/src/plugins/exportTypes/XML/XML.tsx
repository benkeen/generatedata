import * as React from 'react';
import styles from './XML.scss';
import {
	ETDownloadPacket,
	ETDownloadPacketResponse,
	ETSettings,
	ETState,
	ETValidateTitleField
} from '~types/exportTypes';
import TextField from '~components/TextField';

export type GenerationOptionsType = {
	rootNodeName: string;
	recordNodeName: string;
	useCustomExportFormat: boolean;
	customFormat: string;
}

export interface XMLSettings extends ETState, GenerationOptionsType {}

export const initialState: XMLSettings = {
	rootNodeName: 'records',
	recordNodeName: 'record',
	useCustomExportFormat: false,
	customFormat: '',
	isValid: true
};

export const Settings = ({ data, i18n, coreI18n, id, onUpdate }: ETSettings): JSX.Element => {
	const onChange = (prop: string, value: any): void => {
		onUpdate({
			...data,
			[prop]: value
		});
	};

	let rootNodeNameError = '';
	if (data.rootNodeName.trim() === '') {
		rootNodeNameError = coreI18n.requiredField;
	} else if (!isValidNodeName(data.rootNodeName)) {
		rootNodeNameError = i18n.invalidNodeName;
	}

	let recordNodeNameError = '';
	if (data.recordNodeName.trim() === '') {
		recordNodeNameError = coreI18n.requiredField;
	} else if (!isValidNodeName(data.recordNodeName)) {
		recordNodeNameError = i18n.invalidNodeName;
	}

	return (
		<>
			<div className={styles.row}>
				<label htmlFor={`${id}-rootNodeName`}>{i18n.rootNodeName}</label>
				<TextField
					error={rootNodeNameError}
					id={`${id}-rootNodeName`}
					value={data.rootNodeName}
					onChange={(e: any): void => onChange('rootNodeName', e.target.value)}
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor={`${id}-recordNodeName`}>{i18n.recordNodeName}</label>
				<TextField
					error={recordNodeNameError}
					id={`${id}-recordNodeName`}
					value={data.recordNodeName}
					onChange={(e: any): void => onChange('recordNodeName', e.target.value)}
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

export const isValidNodeName = (str: string): boolean => {
	const valid = new RegExp('^[_a-zA-Z][\-\.0-9a-zA-Z_]*$');
	return valid.test(str);
};

export const validateTitleField: ETValidateTitleField = (title, i18n) => {
	if (!isValidNodeName(title)) {
		return i18n.invalidNodeName;
	}
	return null;
};
