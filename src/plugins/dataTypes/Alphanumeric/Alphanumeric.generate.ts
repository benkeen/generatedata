import { generateRandomAlphanumericStr, getRandomNum } from '../../../utils/utils';
import { DataTypeGenerateType } from '../../../../types/general';
import { AlphanumericState } from './Alphanumeric.ui';

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

// TODO maybe a type registry? Export Types could register things they want via types & here you could get typings info
// about every one of them
export const getMetadata = () => ({
	SQLField: 'varchar(255)',
	SQLField_Oracle: 'varchar2(255)',
	SQLField_MSSQL: 'VARCHAR(255) NULL'
});
