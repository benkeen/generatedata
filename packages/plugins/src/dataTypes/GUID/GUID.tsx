import * as React from 'react';
import { DTHelpProps, DTMetadata } from '~types/dataTypes';

export const Help = ({ i18n }: DTHelpProps): JSX.Element => <p>{i18n.help}</p>;

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(36) NOT NULL',
		field_Oracle: 'varchar2(36) NOT NULL',
		field_MSSQL: 'UNIQUEIDENTIFIER NULL'
	}
});
