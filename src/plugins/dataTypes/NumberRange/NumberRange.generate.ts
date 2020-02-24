import { getRandomNum } from '../../../utils/randomUtils';
import { DTMetadata, DTGenerationData, DTGenerateResult } from '../../../../types/dataTypes';
import { NumberRangeState } from './NumberRange.ui';

export const rowStateReducer = (state: NumberRangeState): NumberRangeState => state;

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { min, max } = data.rowState;
	return {
		display: getRandomNum(min, max)
	};
};

export const getMetadata = (): DTMetadata => ({
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
