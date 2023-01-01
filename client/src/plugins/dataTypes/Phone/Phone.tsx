import * as React from 'react';
import Dropdown from '~components/dropdown/Dropdown';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import CreatablePillField from '~components/creatablePillField/CreatablePillField';
import { PhoneState, GenerationOptionsType } from './Phone.state';

export const rowStateReducer = (state: PhoneState): GenerationOptionsType => ({ option: state.option });

export const Example = ({ i18n, data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (value: any): void => {
		onUpdate({
			example: value,
			option: value.split('|')
		});
	};

	const options = [
		{ value: '1-Xxx-Xxx-xxxx|(Xxx) Xxx-xxxx', label: i18n.northAmerica },
		{ value: '(01xxxx) xxxxx|(01xxx) xxxxxx|(01x1) xxx xxxx|(011x) xxx xxxx|(02x) xxxx xxxx|03xx xxx xxxx|055 xxxx xxxx|056 xxxx xxxx|070 xxxx xxxx|07624 xxxxxx|076 xxxx xxxx|07xxx xxxxxx|0800 xxx xxxx|08xx xxx xxxx|09xx xxx xxxx|(016977) xxxx|(01xxx) xxxxx|0500 xxxxxx|0800 xxxxxx|0800 1111|0845 46 4x', label: i18n.uk },
		{ value: '0X xx xx xx xx', label: i18n.france },
		{ value: '(0X) xxxx xxxx', label: i18n.australia },
		{ value: '(0xx) xxxxxxxx|(0xxx) xxxxxxxx|(0xxxx) xxxxxxx|(03xxxx) xxxxxx', label: i18n.germany },
		{ value: '0xx-xxx-xxxx', label: i18n.japan },
		{ value: '1-Xxx-Xxx-xxxx|Xxx-xxxx', label: i18n.differentFormats }
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

export const Options = ({ data, coreI18n, onUpdate }: DTOptionsProps): JSX.Element => (
	<CreatablePillField
		error={data.option.length ? '' : coreI18n.requiredField}
		value={data.option}
		onChange={(values: any): void => onUpdate({ ...data, option: values })}
	/>
);

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p dangerouslySetInnerHTML={{ __html: i18n.helpText1 }} />
		<p dangerouslySetInnerHTML={{ __html: i18n.helpText2 }} />
	</>
);

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(100) default NULL',
		field_Oracle: 'varchar2(100) default NULL',
		field_MSSQL: 'VARCHAR(100) NULL'
	}
});
