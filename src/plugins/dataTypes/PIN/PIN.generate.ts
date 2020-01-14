import { getRandomNum } from '../../../utils/randomUtils';
import { ExportTypeMetadata } from '../../../../types/exportTypes';

export const generate = () => ({ display: getRandomNum(1111, 9999) });

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
