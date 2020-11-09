import * as React from 'react';
import { DTHelpProps, DTMetadata } from '~types/dataTypes';

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p>{i18n.DESC}</p>;

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
