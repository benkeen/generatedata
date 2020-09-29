import * as React from 'react';
import { DTHelpProps, DTMetadata, DTOptionsProps } from '~types/dataTypes';

export type TextFixedState = {
	numWords: number;
};

export const initialState: TextFixedState = {
	numWords: 10
};

export const Options = ({ i18n, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
		onUpdate({
			numWords: parseInt(e.currentTarget.value, 10)
		});
	};

	return (
		<>
			{i18n.TextFixed_generate}
			<input
				type="number"
				min="0"
				style={{ width: 50, margin: '0 2px' }}
				value={data.numWords}
				onChange={onChange}
			/>
			{i18n.TextFixed_words}
		</>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p>{i18n.TextFixed_help}</p>;

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'TEXT default NULL',
		field_Oracle: 'BLOB default NULL',
		field_MSSQL: 'VARCHAR(MAX) NULL'
	}
});
