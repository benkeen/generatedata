import * as React from 'react';
import { DTHelpProps, DTMetadata } from '~types/dataTypes';

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<>
		<p dangerouslySetInnerHTML={{ __html: i18n.DESC }} />
		<p>
			<span dangerouslySetInnerHTML={{ __html: i18n.help1 }} /> <span dangerouslySetInnerHTML={{ __html: i18n.help2 }} />
		</p>
	</>
);

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'varchar(34)',
		field_Oracle: 'varchar2(34) NULL',
		field_MSSQL: 'VARCHAR(34) NULL'
	}
});
