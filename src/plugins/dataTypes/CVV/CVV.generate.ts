// @author Ben Keen <ben.keen@gmail.com>, origin code Zeeshan Shaikh
// @package DataTypes
import { getRandomNum } from '../../../utils/randomUtils';
import { DTGenerateResult, DTMetadata } from '../../../../types/dataTypes';

export const generate = (): DTGenerateResult => ({ display: getRandomNum(111, 999) });

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(255)',
		field_Oracle: 'varchar2(255)',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});
