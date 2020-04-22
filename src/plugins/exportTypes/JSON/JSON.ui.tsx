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

export const Settings: React.ReactNode = ({ data, i18n, onUpdate }: ETSettings) => {
	const onChange = (field: string, value: any): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};
	return (
		<FormControl component="fieldset">
			<label>{i18n.dataStructureFormat}</label>
			<RadioGroup aria-label="gender" name="dataStructureFormat" value={data.dataStructureFormat}
				onChange={(e, value): void => onChange('dataStructureFormat', value)}>
				<FormControlLabel value="simple" control={<Radio />} label={i18n.simple} />
				<FormControlLabel value="complex" control={<Radio />} label={i18n.complex} />
			</RadioGroup>
		</FormControl>
	);
};
