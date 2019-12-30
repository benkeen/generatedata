import { generateRandomAlphanumericStr, getRandomNum } from '../../../utils/utils';
import { DataTypeGenerateType } from '../../../../types/general';
import { AlphanumericState } from './Alphanumeric.ui';
import { ExportTypeMetadata } from '../../../../types/exportTypes';

export const getGenerationSettings = (state: AlphanumericState) => state.value;


export const generate = (data: DataTypeGenerateType) => {
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
	    SQLField: 'varchar(255)',
        SQLField_Oracle: 'varchar2(255)',
        SQLField_MSSQL: 'VARCHAR(255) NULL'
    }
});
