import { DTHelpProps, DTMetadata } from '../../';

export const Help = ({ i18n }: DTHelpProps) => <p>{i18n.DESC}</p>;

export const getMetadata = (): DTMetadata => ({
  sql: {
    field: 'varchar(255)',
    field_Oracle: 'varchar2(255)',
    field_MSSQL: 'VARCHAR(255) NULL'
  }
});
