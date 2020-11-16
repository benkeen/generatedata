import { DTMetadata } from '~types/dataTypes';

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(255) default NULL',
		field_Oracle: 'varchar2(255) default NULL',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});
