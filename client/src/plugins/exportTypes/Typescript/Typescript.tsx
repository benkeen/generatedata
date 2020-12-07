import * as React from 'react';
import TextField from '~components/TextField';
import { ETDownloadPacket, ETDownloadPacketResponse, ETSettings, ETState } from '~types/exportTypes';

export interface TypescriptSettings extends ETState {
	typeName: string;
	varName: string;
	isValid: boolean;
}

export const initialState: TypescriptSettings = {
	typeName: 'GeneratedData',
	varName: 'data',
	isValid: true
};

export const Settings: React.ReactNode = ({ data, id, coreI18n, onUpdate }: ETSettings) => { // i18n
	const onChange = (field: string, value: string): void => {
		const newValues = {
			...data,
			[field]: value
		};

		const isValid = newValues.typeName.trim() !== '' && newValues.varName.trim() !== '';
		onUpdate({
			...newValues,
			isValid
		});
	};

	return (
		<div>
			<label htmlFor={`${id}-typeName`}>Type name</label>
			<TextField
				id={`${id}-typeName`}
				error={data.typeName !== '' ? '' : coreI18n.requiredField}
				value={data.typeName}
				style={{ width: '100%', marginBottom: 10 }}
				onChange={(e: any): void => onChange('typeName', e.target.value)}
			/>

			<label>Exported variable name</label>
			<TextField
				error={data.varName !== '' ? '' : coreI18n.requiredField}
				value={data.varName}
				style={{ width: '100%' }}
				onChange={(e: any): void => onChange('varName', e.target.value)}
			/>
		</div>
	);
};

export const getCodeMirrorMode = (): string => 'text/typescript';

export const getDownloadFileInfo = ({ packetId }: ETDownloadPacket): ETDownloadPacketResponse => ({
	filename: `data-${packetId}.ts`,
	fileType: 'application/x-typescript'
});

export const isValid = (settings: TypescriptSettings): boolean => {
	return settings.typeName.trim() !== '' && settings.varName.trim() !== '';
};
