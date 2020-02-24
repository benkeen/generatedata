import { DTMetadata } from '../../../../types/dataTypes';
import { DTGenerationData, DTGenerateResult } from '../../../../types/dataTypes';
import { getRandomNum } from '../../../utils/randomUtils';
import { BooleanState } from './Boolean.ui';

export const rowStateReducer = (state: BooleanState): string => state.value;

export const generate = (data: DTGenerationData): DTGenerateResult => {
	const placeholderStr: string = data.rowState;
	const formats = placeholderStr.split('|');
	let chosenFormat = formats[0];
	if (formats.length > 1) {
		chosenFormat = formats[getRandomNum(0, formats.length - 1)];
	}
	return { display: chosenFormat.trim() };
};


export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'boolean'
	},
	sql: {
		field: 'varchar(255) default NULL',
		field_Oracle: 'varchar2(255) default NULL',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});
