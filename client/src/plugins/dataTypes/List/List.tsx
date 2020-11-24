import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import Dropdown from '~components/dropdown/Dropdown';
import CreatablePillField from '~components/creatablePillField/CreatablePillField';
import TextField from '~components/TextField';

export type ListType = 'exactly' | 'atMost';

export type ListState = {
	example: string;
	listType: ListType;
	exactly: string;
	atMost: string;
	values: string[];
};

export const initialState: ListState = {
	example: '1|3|5|7|9|11|13|15|17|19',
	listType: 'exactly',
	exactly: '1',
	atMost: '1',
	values: ['1', '3', '5', '7', '9', '11', '13', '15', '17', '19']
};

export const Example = ({ data, onUpdate, i18n }: DTExampleProps): JSX.Element => {
	const onChange = (example: any): void => {
		onUpdate({
			...data,
			example: example,
			values: example.split('|')
		});
	};

	const options = [
		{ value: '1|3|5|7|9|11|13|15|17|19', label: i18n.example1 },
		{ value: '2|4|6|8|10|12|14|16|18|20', label: i18n.example2 },
		{ value: '1|2|3|4|5|6|7|8|9|10', label: '1-10' },
		{ value: i18n.oneToTen, label: i18n.example3 },
		{ value: '1|2|3|5|7|11|13|17|19|23|29|31|37|41|43|47|53|59|61|67|71|73|79|83|89|97', label: i18n.example4 },
		{ value: i18n.colours, label: i18n.example5 },
		{ value: i18n.relationshipStates, label: i18n.example6 },
		{ value: i18n.prefix, label: i18n.example7 },
		{ value: i18n.departmentNames, label: i18n.example8 },
		{ value: i18n.companies, label: i18n.example9 },
		{ value: i18n.drugNames, label: i18n.example10 },
		{ value: i18n.foodTypes, label: i18n.example11 },
		{ value: i18n.carBrands, label: i18n.example12 }
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

export const Options = ({ coreI18n, i18n, data, id, onUpdate }: DTOptionsProps): JSX.Element => {
	const exactlyField = React.useRef<any>();
	const atMostField = React.useRef<any>();

	const onChange = (field: string, value: any): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	const exactlyError = data.exactly ? '' : coreI18n.requiredField;
	const atMostError = data.atMost ? '' : coreI18n.requiredField;

	return (
		<>
			<div style={{ margin: 4 }}>
				<input
					type="radio"
					id={`listType1-${id}`}
					value="exactly"
					checked={data.listType === 'exactly'}
					onChange={(): void => {
						onChange('listType', 'exactly');
						exactlyField.current.focus();
					}}
				/>
				<label htmlFor={`listType1-${id}`}>{i18n.exactly}</label>
				<TextField
					error={exactlyError}
					ref={exactlyField}
					type="number"
					min={1}
					id={`dtListExactly_${id}`}
					value={data.exactly}
					style={{ margin: '0 6px 0 4px', width: 50 }}
					onChange={(e: any): void => {
						onUpdate({
							...data,
							exactly: e.target.value,
							listType: 'exactly'
						});
					}}
				/>
				<input
					type="radio"
					id={`listType2-${id}`}
					value="atMost"
					checked={data.listType === 'atMost'}
					onChange={(): void => {
						onChange('listType', 'atMost');
						atMostField.current.focus();
					}}
				/>
				<label htmlFor={`listType2-${id}`}>{i18n.atMost}</label>
				<TextField
					error={atMostError}
					ref={atMostField}
					type="number"
					min={1}
					id={`dtListAtMost_${id}`}
					value={data.atMost}
					style={{ margin: '0 6px 0 4px', width: 50 }}
					onChange={(e: any): void => {
						onUpdate({
							...data,
							atMost: e.target.value,
							listType: 'atMost'
						});
					}}
				/>
			</div>
			<div>
				<CreatablePillField
					value={data.values}
					onChange={(values: any): void => onUpdate({ ...data, values })}
				/>
			</div>
		</>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p dangerouslySetInnerHTML={{ __html: i18n.help }} />;

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'infer'
	},
	sql: {
		field: 'varchar(255) default NULL',
		field_Oracle: 'varchar2(255) default NULL',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});

export const rowStateReducer = ({ example, listType, exactly, atMost, values }: ListState): any => {
	const cleanExactly = (listType === 'exactly' && listType.trim() === '') ? 1 : parseInt(exactly, 10);
	const cleanAtMost = (listType === 'atMost' && listType.trim() === '') ? 1 : parseInt(atMost, 10);

	return {
		example,
		listType,
		exactly: cleanExactly,
		atMost: cleanAtMost,
		values
	};
};
