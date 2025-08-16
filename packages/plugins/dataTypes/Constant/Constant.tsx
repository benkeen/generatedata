import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTMetadata, DTMetadataType, DTOptionsProps } from '~types/dataTypes';
import CreatablePillField from '~components/creatablePillField/CreatablePillField';
import TextField from '~components/TextField';
import { isBoolean } from '~utils/generalUtils';
import { isNumeric } from '~utils/numberUtils';
import styles from './Constant.scss';
import sharedStyles from '../../../styles/shared.scss';

export type GenerationOptionsType = {
	loopCount: number;
	values: any[];
};

export type ConstantState = {
	loopCount: number;
	values: string[];
};

export const initialState: ConstantState = {
	loopCount: 2,
	values: ['1', '2']
};

export const Example = ({ coreI18n }: DTExampleProps): JSX.Element => (
	<div className={sharedStyles.emptyCol}>{coreI18n.seeHelpDialog}</div>
);

export const Options = ({ i18n, coreI18n, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const onChange = (field: string, value: string): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	const loopCountError = data.loopCount ? '' : coreI18n.requiredField;
	const valuesError = data.values.length ? '' : coreI18n.requiredField;

	return (
		<div className={styles.options}>
			<div style={{ marginBottom: 2 }}>
				<label>{i18n.loopCount}</label>
				<TextField
					error={loopCountError}
					type="number"
					value={data.loopCount}
					style={{ width: 50 }}
					onChange={(e: any): void => onChange('loopCount', e.target.value)} />
			</div>
			<div className={styles.values}>
				<label>{i18n.values}</label>
				<CreatablePillField
					error={valuesError}
					value={data.values}
					onChange={(values: any): void => onUpdate({ ...data, values })}
					placeholder={coreI18n.pressEnterAddItem}
				/>
			</div>
		</div>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p>
			{i18n.help1}
		</p>
		<ul>
			<li>{i18n.help2}</li>
			<li>{i18n.help3}</li>
			<li>{i18n.help4}</li>
		</ul>
		<p>
			{i18n.help5}
		</p>
	</>
);

// this assumes validation has already been performed. Perhaps a `valid` flag should be set in the state?
export const rowStateReducer = ({ loopCount, values }: ConstantState): GenerationOptionsType => ({ loopCount, values });

export const getMetadata = (rowData: ConstantState): DTMetadata => {
	let dataType: DTMetadataType = 'string';
	const allNumbers = rowData.values.every(isNumeric);
	if (allNumbers) {
		dataType = 'number';
	} else {
		const allBoolean = rowData.values.every(isBoolean);
		if (allBoolean) {
			dataType = 'boolean';
		}
	}

	return {
		general: {
			dataType
		},
		sql: {
			field: 'TEXT default NULL',
			field_Oracle: 'BLOB default NULL',
			field_MSSQL: 'VARCHAR(MAX) NULL',
			field_Postgres: 'TEXT NULL'
		}
	};
};
