import { DTMetadata, DTGenerationData, DTGenerateResult } from '~types/dataTypes';
import { generateRandomAlphanumericStr, getRandomArrayValue } from '~utils/randomUtils';
import { PhoneState } from './Phone.ui';

export const rowStateReducer = (state: PhoneState): string[] => state.option;

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const item: any = getRandomArrayValue(data.rowState);
	return { display: generateRandomAlphanumericStr(item) };
};

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(100) default NULL',
		field_Oracle: 'varchar2(100) default NULL',
		field_MSSQL: 'VARCHAR(100) NULL'
	}
});
