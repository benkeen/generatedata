import { getRandomNum } from '../../../utils/randomUtils'; 
import { GenerationData } from '../../../../types/dataTypes';
import { ExportTypeMetadata } from '../../../../types/exportTypes';

export const generate = (data: GenerationData) => {
	const { min, max } = data.generationSettings;
	return {
		display: getRandomNum(min, max)
	};
};

export const getMetadata = (): ExportTypeMetadata => ({
	general: {
		dataType: 'number'
	},
	sql: {
	    field: 'mediumint default NULL',
        field_Oracle: 'varchar2(50) default NULL',
		field_MSSQL: 'INTEGER NULL',
		field_Postgres: 'integer NULL',
    }
});
