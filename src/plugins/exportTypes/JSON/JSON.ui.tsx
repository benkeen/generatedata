import * as React from 'react';
import { ETSettings } from '../../../../types/exportTypes';

export type DataStructureFormat = 'simple' | 'complex';
export type JSONSettings = {
	stripWhitespace: boolean;
	dataStructureFormat: DataStructureFormat;
};

export const initialState: JSONSettings = {
	stripWhitespace: false,
	dataStructureFormat: 'simple'
};

export const Settings: React.ReactNode = ({ data, i18n, onUpdate, id }: ETSettings) => {
	const onChange = (field: string, value: any): void => {
		console.log('value? ', value);
		onUpdate({
			...data,
			[field]: value
		});
	};

	return (
		<>
			<div>
				<input
					type="checkbox"
					id={`${id}-stripWhitespace`}
					checked={data.stripWhitespace}
					onChange={(): void => onChange('stripWhitespace', !data.stripWhitespace)}
				/>
				<label htmlFor={`${id}-stripWhitespace`} >{i18n.stripWhitespace}</label><br />
			</div>

			<div>
				<span style={{ marginRight: 10 }}>{i18n.dataStructureFormat}</span>
				<input type="radio" name="dataStructureFormat" value="complex" id={`${id}-complex`}
					checked={data.dataStructureFormat === 'complex'}
					onChange={(e): void => onChange('dataStructureFormat', e.target.value)} />
				<label htmlFor={`${id}-complex`} style={{ marginRight: 10 }}>{i18n.complex}</label>

				<input type="radio" name="dataStructureFormat" value="simple" id={`${id}-simple`}
					checked={data.dataStructureFormat === 'simple'}
					onChange={(e): void => onChange('dataStructureFormat', e.target.value)} />
				<label htmlFor={`${id}-simple`}>{i18n.simple}</label>
			</div>
		</>
	);
};
