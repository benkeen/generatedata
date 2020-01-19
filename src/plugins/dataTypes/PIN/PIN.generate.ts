import { getRandomNum } from '../../../utils/randomUtils';
import { ExportTypeMetadata } from '../../../../types/exportTypes';
import { DTGenerateReturnType } from '../../../../types/dataTypes';

export const generate = (): DTGenerateReturnType => ({ display: getRandomNum(1111, 9999) });

export const getMetadata = (): ExportTypeMetadata => ({
	general: {
		dataType: 'number'
	},
	sql: {
		field: 'varchar(4)',
		field_Oracle: 'varchar2(4)',
		field_MSSQL: 'VARCHAR(4) NULL'
	}
});
