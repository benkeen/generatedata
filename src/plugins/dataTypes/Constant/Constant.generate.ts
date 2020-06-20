import { DTGenerateResult, DTGenerationData, DTMetadata } from '~types/dataTypes';
import { ConstantState } from './Constant.ui';

type CleanedRowState = {
	loopCount: number;
	values: any[];
}

// this assumes validation has already been performed. Perhaps a `valid` flag should be set in the state?
export const rowStateReducer = ({ loopCount, values }: ConstantState): CleanedRowState => ({ loopCount, values });

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const rowNum = data.rowNum;
	const { loopCount, values } = data.rowState;
	const numValues = values.length;

	let value = '';
	if (numValues === 1) {
		value = values[0];
	} else {
		let itemIndex = Math.floor((rowNum-1) / loopCount);
		if (itemIndex > numValues - 1) {
			itemIndex = (itemIndex % numValues);
		}
		value = values[itemIndex];
	}

	return {
		display: value
	};
};

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
