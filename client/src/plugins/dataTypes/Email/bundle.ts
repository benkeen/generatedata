import { DTBundle, DTMetadata } from '~types/dataTypes';

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'varchar(255) default NULL',
		field_Oracle: 'varchar2(255) default NULL',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});

const bundle: DTBundle = {
	getMetadata
};

export default bundle;
