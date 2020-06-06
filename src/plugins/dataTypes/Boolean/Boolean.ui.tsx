import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';
import Dropdown from '../../../components/dropdown/Dropdown';
import CreatablePillField from '../../../components/CreatablePillField';

export type BooleanState = {
	example: string;
	values: string[];
};

export const initialState: BooleanState = {
	example: 'Yes|No',
	values: ['Yes', 'No']
};

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (value: any): void => {
		onUpdate({
			example: value,
			values: value.split('|')
		});
	};

	const options = [
		{ value: 'Yes|No', label: i18n.exampleYesNo },
		{ value: 'True|False', label: i18n.exampleTrueFalse },
		{ value: 'true|false', label: i18n.exampleTrueFalseLower },
		{ value: '0|1', label: i18n.exampleZeroOne },
		{ value: 'Y|N', label: i18n.exampleYesNoShort },
		{ value: 'T|F', label: i18n.exampleTrueFalseShort }
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

export const Options = ({ data, onUpdate }: DTOptionsProps): JSX.Element => (
	<CreatablePillField
		value={data.values}
		onChange={(values: any): void => onUpdate({ ...data, values })}
	/>
);

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.DESC}
			{i18n.helpIntro}
		</p>

		<ul>
			<li>{i18n.exampleYesNo}</li>
			<li>{i18n.exampleFalseTrue}</li>
			<li>{i18n.exampleZeroOne}</li>
			<li>{i18n.exampleYesNoShort}</li>
			<li>{i18n.exampleFalseTrueShort}</li>
			<li>{i18n.exampleFalseTrueLower}</li>
		</ul>

		<p>
			{i18n.text_double_quotes}
		</p>
	</>
);
