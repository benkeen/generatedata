import { generateRandomAlphanumericStr, getRandomNum } from '../../../utils/utils';
import { GenerationData } from '../../../../types/dataTypes';
import { AlphanumericState } from './Alphanumeric.ui';
import { ExportTypeMetadata } from '../../../../types/exportTypes';

export const getGenerationSettings = (state: AlphanumericState) => state.value;


export const generate = (data: GenerationData) => {
	const formats = data.generationSettings.split('|');
	let chosenFormat = formats[0];
	if (formats.length > 1) {
		chosenFormat = formats[getRandomNum(0, formats.length-1)];
	}
	const val = generateRandomAlphanumericStr(chosenFormat);
	return { display: val };
};

export const getMetadata = (): ExportTypeMetadata => ({
	sql: {
	    field: 'varchar(255)',
        field_Oracle: 'varchar2(255)',
        field_MSSQL: 'VARCHAR(255) NULL'
    }
});
