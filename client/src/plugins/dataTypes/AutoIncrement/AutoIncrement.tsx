import * as React from 'react';
import Dropdown from '~components/dropdown/Dropdown';
import TextField from '~components/TextField';
import { isNumeric } from '~utils/numberUtils';
import { DTExampleProps, DTHelpProps, DTMetadata, DTMetadataType, DTOptionsProps } from '~types/dataTypes';
import { AutoIncrementState, GenerationOptionsType } from './AutoIncrement.state';
import styles from './AutoIncrement.scss';

export const Example = ({ data, onUpdate }: DTExampleProps): JSX.Element => {
	const onChange = (value: string): void => {
		const [incrementStart, incrementValue, incrementPlaceholder] = value.split(',');

		onUpdate({
			example: value,
			incrementStart,
			incrementValue,
			incrementPlaceholder
		});
	};

	const options = [
		{ value: '1,1,', label: '1, 2, 3, 4, 5, 6...' },
		{ value: '100,1,', label: '100, 101, 102, 103, 104...' },
		{ value: '0,2,', label: '0, 2, 4, 6, 8, 10...' },
		{ value: '0,5,', label: '0, 5, 10, 15, 20, 25...' },
		{ value: '1000,-1,', label: '1000, 999, 998, 997...' },
		{ value: '0,-1,', label: '0, -1, -2, -3, -4...' },
		{ value: '0,0.5,', label: '0, 0.5, 1, 1.5, 2...' },
		{ value: '1,1,ROW-{{INCR}}', label: 'ROW-1, ROW-2, ROW-3,...' },
		{ value: '2,4,{{INCR}}i', label: '2i, 4i, 6i, 8i...' }
	];

	return (
		<Dropdown
			value={data.example}
			onChange={(i: any): void => onChange(i.value)}
			options={options}
		/>
	);
};

export const Options = ({ coreI18n, i18n, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const onChange = (field: string, value: number | string): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	const incStartError = data.incrementStart.trim() === '' ? coreI18n.requiredField : '';
	const incValueError = data.incrementValue.trim() === '' ? coreI18n.requiredField : '';

	return (
		<div className={styles.options}>
			<div style={{ marginBottom: 2 }}>
				<span>{i18n.startAt}</span>
				<TextField
					error={incStartError}
					style={{ width: 60, marginRight: 2 }}
					value={data.incrementStart}
					onChange={(e: any): void => onChange('incrementStart', e.target.value)}
				/>

				<span>{i18n.increment}</span>
				<TextField
					error={incValueError}
					style={{ width: 60 }}
					value={data.incrementValue}
					onChange={(e: any): void => onChange('incrementValue', e.target.value)}
				/>
			</div>

			<div>
				<span>{i18n.placeholderStr}</span>
				<TextField
					style={{ width: 100 }}
					value={data.incrementPlaceholder}
					onChange={(e: any): void => onChange('incrementPlaceholder', e.target.value)}
				/>
			</div>
		</div>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.helpIntro}
		</p>
		<p dangerouslySetInnerHTML={{ __html: i18n.helpPara2 }} />
		<ul>
			<li><b>ROW-{'{{INCR}}'}</b> -&gt; ROW-1, ROW-2, ROW-3, ROW-4, ...</li>
			<li><b>{'{{INCR}}'}F</b> -&gt; 1F, 2F, 3F, 4F, ...</li>
		</ul>
	</>
);

export const getMetadata = (rowData: AutoIncrementState): DTMetadata => {
	let dataType: DTMetadataType = isNumeric(rowData.incrementStart) && isNumeric(rowData.incrementValue) ? 'number' : 'string';

	// if there's a placeholder defined, set it to a string if it contains any chars besides numbers & {{INCR}}, even spaces
	if (rowData.incrementPlaceholder.trim()) {
		const val = rowData.incrementPlaceholder.replace(/{{INCR}}/g, '');
		dataType = val === '' || /^[\d\.]+$/.test(val) ? 'number' : 'string';
	}

	return {
		general: {
			dataType
		},
		sql: {
			field: 'mediumint',
			field_Oracle: 'number default NULL',
			field_MSSQL: 'INTEGER NULL',
			field_Postgres: 'integer NULL'
		}
	};
};

export const rowStateReducer = (state: AutoIncrementState): GenerationOptionsType => {
	const incrementStart = (state.incrementStart) ? parseFloat(state.incrementStart) : 0;
	const incrementValue = (state.incrementValue) ? parseFloat(state.incrementValue) : 0;

	return {
		incrementStart,
		incrementValue,
		incrementPlaceholder: state.incrementPlaceholder
	};
};
