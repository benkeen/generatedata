import { getRandomNum } from '../../../utils/randomUtils'; 
import { GenerationData } from '../../../../types/dataTypes';
import { ExportTypeMetadata } from '../../../../types/exportTypes';
import { NumberRangeState } from './NumberRange.ui';

export const rowStateReducer = (state: NumberRangeState) => {
	console.log('...', state);
	return state;
}

export const generate = (data: GenerationData) => {
	console.log(data);
	const { min, max } = data.rowState;
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
