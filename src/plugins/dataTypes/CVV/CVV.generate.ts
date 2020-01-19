// @author Ben Keen <ben.keen@gmail.com>, origin code Zeeshan Shaikh
// @package DataTypes
import { getRandomNum } from '../../../utils/randomUtils';
import { ExportTypeMetadata } from '../../../../types/exportTypes';
import { DTGenerateReturnType } from '../../../../types/dataTypes';

export const generate = (): DTGenerateReturnType => ({ display: getRandomNum(111, 999) });

export const getMetadata = (): ExportTypeMetadata => ({
	sql: {
		field: 'varchar(255)',
		field_Oracle: 'varchar2(255)',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});
