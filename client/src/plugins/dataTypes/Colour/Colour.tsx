import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import Dropdown from '../OrganizationNumber/OrganizationNumber';

export const enum ColourFormat {
	hex = 'hex',
	rgb = 'rgb',
}

export type ColourState = {
	example: string;
	values: string[];
	format: ColourFormat;
};

export const initialState: ColourState = {
	example: 'Yes|No',
	values: ['Yes', 'No'],
	format: ColourFormat.hex
};

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (value: any): void => {
		onUpdate({
			example: value,
			value: value
		});
	};

	const options = [
		{ value: 'any', label: 'Any colour' },
		{ value: '', label: 'Blues' },
		{ value: '', label: 'Blues' },
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

export const Options = ({ coreI18n, data, onUpdate }: DTOptionsProps): JSX.Element => (
	<div>
		<select>
			<option>Any colour</option>
			<option>Colour</option>
		</select>
		<input size={8} />

		<span>|</span>

		<select>
			<option>Hex</option>
			<option>RGB</option>
		</select>
	</div>
);

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		...
	</>
);

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'string(12) default NULL',
		field_Oracle: 'varchar2(12) default NULL',
		field_MSSQL: 'VARCHAR(12) NULL'
	}
});

export const rowStateReducer = (state: ColourState): string[] => state.values;
