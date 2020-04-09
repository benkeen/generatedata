import { DTMetadata } from '../../../../types/dataTypes';
import { AutoIncrementState } from './AutoIncrement.ui';
import { DTGenerationData, DTGenerateResult } from '../../../../types/dataTypes';

// TODO: perhaps put the parseFloat()'s here. It'll only execute once prior to generation, so it's performant - and will
// be more forgiving than on every key change on the UI
export const rowStateReducer = (state: AutoIncrementState): Partial<AutoIncrementState> => ({
	incrementStart: state.incrementStart,
	incrementValue: state.incrementValue,
	incrementPlaceholder: state.incrementPlaceholder
});

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const rowNum = data.rowNum;
	const { incrementStart, incrementValue, incrementPlaceholder } = data.rowState;

	let value = ((rowNum - 1) * incrementValue) + incrementStart;
	console.log('generating...');

	if (incrementPlaceholder) {
		value = value.replace(/\${INCR}/g, value);
	}
	return { display: value };
};

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'number' // liiiiies! only conditional a number
	},
	sql: {
		field: 'mediumint',
		field_Oracle: 'number default NULL',
		field_MSSQL: 'INTEGER NULL',
		field_Postgres: 'integer NULL'
	}
});
