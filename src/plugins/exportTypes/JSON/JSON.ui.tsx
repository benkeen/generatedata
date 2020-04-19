import * as React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { ETSettings } from '../../../../types/exportTypes';

export type DataStructureFormat = 'simple' | 'complex';
export type JSONSettings = {
	dataStructureFormat: DataStructureFormat;
};

export const initialState: JSONSettings = {
	dataStructureFormat: 'simple'
};

export const Settings: React.ReactNode = ({ data, i18n, onUpdate, id }: ETSettings) => {
	const onChange = (field: string, value: any): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	/*
	<input type="radio" name="dataStructureFormat" value="simple" id={`${id}-simple`}
		   checked={data.dataStructureFormat === 'simple'}
		   onChange={(e): void => onChange('dataStructureFormat', e.target.value)} />
	<label htmlFor={`${id}-simple`} style={{ marginRight: 10 }}>{i18n.simple}</label>

	<input type="radio" name="dataStructureFormat" value="complex" id={`${id}-complex`}
		checked={data.dataStructureFormat === 'complex'}
		onChange={(e): void => onChange('dataStructureFormat', e.target.value)} />
	<label htmlFor={`${id}-complex`}>{i18n.complex}</label>
	*/

	return (
		<FormControl component="fieldset">
			<label>{i18n.dataStructureFormat}</label>
			<RadioGroup aria-label="gender" name="dataStructureFormat" value={data.dataStructureFormat}
				onChange={(e): void => {
					console.log('...', e);
					onChange('dataStructureFormat', e.target.value);
				}}>
				<FormControlLabel value="female" control={<Radio />} label={i18n.simple} />
				<FormControlLabel value="male" control={<Radio />} label={i18n.complex} />
			</RadioGroup>
		</FormControl>
	);
};
