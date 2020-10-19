import * as React from 'react';
import { DTExampleProps, DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';
import CreatablePillField from '~components/CreatablePillField/CreatablePillField';
import styles from './Constant.scss';
import sharedStyles from '../../../styles/shared.scss';

type CleanedRowState = {
	loopCount: number;
	values: any[];
}

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

export const Options = ({ i18n, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const onChange = (field: string, value: string): void => {
		onUpdate({
			...data,
			[field]: value
		});
	};

	return (
		<div className={styles.options}>
			<div style={{ marginBottom: 2 }}>
				<label>{i18n.loopCount}</label>
				<input
					type="number"
					value={data.loopCount}
					style={{ width: 50 }}
					onChange={(e): void => onChange('loopCount', e.target.value)} />
			</div>
			<div className={styles.values}>
				<label>{i18n.values}</label>
				<CreatablePillField
					value={data.values}
					onChange={(values: any): void => onUpdate({ ...data, values })}
					placeholder="Press enter to add item"
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
export const rowStateReducer = ({ loopCount, values }: ConstantState): CleanedRowState => ({ loopCount, values });

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'TEXT default NULL',
		field_Oracle: 'BLOB default NULL',
		field_MSSQL: 'VARCHAR(MAX) NULL',
		field_Postgres: 'TEXT NULL'
	}
});
