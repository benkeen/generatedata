import { generateRandomAlphanumericStr, getRandomNum } from '../../../utils/randomUtils';
import { DTGenerationData, DTGenerateResult } from '../../../../types/dataTypes';
import { AlphanumericState } from './Alphanumeric.ui';
import { DTMetadata } from '../../../../types/dataTypes';

export const rowStateReducer = (state: AlphanumericState): string => state.value;

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const formats = data.rowState.split('|');
	let chosenFormat = formats[0];
	if (formats.length > 1) {
		chosenFormat = formats[getRandomNum(0, formats.length - 1)];
	}
	const val = generateRandomAlphanumericStr(chosenFormat);
	return { display: val };
};

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(255)',
		field_Oracle: 'varchar2(255)',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});
