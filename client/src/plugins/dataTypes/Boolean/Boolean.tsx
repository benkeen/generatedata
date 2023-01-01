import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import Dropdown from '~components/dropdown/Dropdown';
import CreatablePillField from '~components/creatablePillField/CreatablePillField';
import { BooleanState, GenerationOptionsType } from './Boolean.state';

export const Example = ({ data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (value: any): void => {
		onUpdate({
			example: value,
			values: value.split('|')
		});
	};

	const options = [
		{ value: 'Yes|No', label: 'Yes / No' },
		{ value: 'true|false', label: 'true / false' },
		{ value: 'True|False', label: 'True / False' },
		{ value: '0|1', label: '0 / 1' },
		{ value: 'Y|N', label: 'Y / N' },
		{ value: 'T|F', label: 'T / F' },
		{ value: 'On|Off', label: 'On / Off' },
		{ value: 'Down|Up', label: 'Down / Up' }
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
	<CreatablePillField
		error={data.values.length ? '' : coreI18n.requiredField}
		value={data.values}
		onChange={(values: any): void => onUpdate({ ...data, values })}
	/>
);

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p dangerouslySetInnerHTML={{ __html: `${i18n.DESC} ${i18n.helpIntro}` }} />
	</>
);

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'boolean'
	},
	sql: {
		field: 'varchar(255) default NULL',
		field_Oracle: 'varchar2(255) default NULL',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});

export const rowStateReducer = (state: BooleanState): GenerationOptionsType => ({ values: state.values });
