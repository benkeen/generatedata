import { ExportTypeMetadata } from '../../../../types/exportTypes';
import { GenerationData, DTGenerateReturnType } from '../../../../types/dataTypes';
import { getLipsumWords, toTitleCase } from '../../../utils/stringUtils';
import { generateRandomTextStr } from '../../../utils/randomUtils';
import { getRandomNum, getRandomArrayValue } from '../../../utils/randomUtils';

const { words } = getLipsumWords();

export const generate = ({ i18n }: GenerationData): DTGenerateReturnType => {
	const { streetTypes, poBox, apNum } = i18n;
	const streetName = toTitleCase(generateRandomTextStr(words, false, 1));
	const streetType = getRandomArrayValue(streetTypes);

	const format = getRandomNum(1, 4);
	let streetAddress = '';
	switch (format) {
		case 1:
			streetAddress = `${poBox} ${getRandomNum(100, 999)}, ${getRandomNum(100, 9999)} ${streetName} ${streetType}`;
			break;
		case 2:
			streetAddress = `${getRandomNum(100, 999)}-${getRandomNum(100, 9999)} ${streetName} ${streetType}`;
			break;
		case 3:
			streetAddress = `${apNum}${getRandomNum(100, 999)}-${getRandomNum(100, 9999)} ${streetName} ${streetType}`;
			break;
		case 4:
			streetAddress = `${getRandomNum(100, 9999)} ${streetName} ${streetType}`;
			break;
	}

	return {
		display: streetAddress
	};
};

export const getMetadata = (): ExportTypeMetadata => ({
	sql: {
		field: 'varchar(255) default NULL',
		field_Oracle: 'varchar2(255) default NULL',
		field_MSSQL: 'VARCHAR(255) NULL'
	}
});
