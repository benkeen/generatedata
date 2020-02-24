import { DTMetadata, DTGenerationData, DTGenerateResult } from '../../../../types/dataTypes';
import { generateRandomAlphanumericStr, getRandomArrayValue } from '../../../utils/randomUtils';
import { PhoneState } from './Phone.ui';

export const rowStateReducer = (state: PhoneState): string => state.option;

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const phoneStr = generateRandomAlphanumericStr(data.rowState);
	const formats = phoneStr.split('|');
	let chosenFormat = formats[0];
	if (formats.length > 1) {
		chosenFormat = getRandomArrayValue(formats);
	}
	return { display: chosenFormat };
};

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(100) default NULL',
		field_Oracle: 'varchar2(100) default NULL',
		field_MSSQL: 'VARCHAR(100) NULL'
	}
});
