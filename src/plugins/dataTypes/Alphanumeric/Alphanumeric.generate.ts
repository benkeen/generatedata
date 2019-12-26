import { generateRandomAlphanumericStr, getRandomNum } from '../../../utils/utils';
import { DataTypeGenerateType } from '../../../../types/general';

export const generate = (data: DataTypeGenerateType) => {
	const formats = data.generationOptions.split('|');
	let chosenFormat = formats[0];
	if (formats.length > 1) {
		chosenFormat = formats[getRandomNum(0, formats.length-1)];
	}
	const val = generateRandomAlphanumericStr(chosenFormat);
	return { display: val };
};

export const getMetadata = () => ({
	SQLField: 'varchar(255)',
	SQLField_Oracle: 'varchar2(255)',
	SQLField_MSSQL: 'VARCHAR(255) NULL'
});
