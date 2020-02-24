import { getRandomNum } from '../../../utils/randomUtils';
import { DTMetadata, DTGenerateResult } from '../../../../types/dataTypes';

export const generate = (): DTGenerateResult => ({ display: getRandomNum(1111, 9999) });

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'number'
	},
	sql: {
		field: 'varchar(4)',
		field_Oracle: 'varchar2(4)',
		field_MSSQL: 'VARCHAR(4) NULL'
	}
});
