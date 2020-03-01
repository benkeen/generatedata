import * as React from 'react';
import { ETSettings } from '../../../../types/exportTypes';

export type DataStructureFormat = 'simple' | 'complex';
export type JSONSettings = {
	stripWhitespace: boolean;
	dataStructureFormat: DataStructureFormat;
};

// export used to supply default state to generator??
export const initialState: JSONSettings = {
	stripWhitespace: false,
	dataStructureFormat: 'simple'
};

export const Settings: React.ReactNode = ({ data, i18n, onUpdate, id }: ETSettings) => {
	const onChange = (field: string, value: any): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	return (
		<>
			<input type="checkbox" id={`${id}-stripWhitespace`} value="1" 
				onChange={(e): void => onChange('stripWhitespace', e.target.checked)} />

			<label htmlFor={`${id}-stripWhitespace`}>{i18n.strip_whitespace}</label><br />

			{i18n.data_structure_format}
			<input type="radio" value="complex" id={`${id}-complex`} />
			<label htmlFor={`${id}-complex`}>{i18n.complex}</label>

			<input type="radio" value="simple" id={`${id}-simple`} />
			<label htmlFor={`${id}-simple`}>{i18n.simple}</label>
		</>
	);
};