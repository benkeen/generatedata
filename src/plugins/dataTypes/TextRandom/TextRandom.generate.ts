import { GenerationData, DTGenerateReturnType } from '../../../../types/dataTypes';
import { generateRandomTextStr } from '../../../utils/randomUtils';
import { getLipsumWords } from '../../../utils/stringUtils';
import { ExportTypeMetadata } from '../../../../types/exportTypes';

export const generate = (data: GenerationData): DTGenerateReturnType => {
	const { startsWithLipsum, minWords, maxWords } = data.rowState;
	const { words } = getLipsumWords();
	const textStr = generateRandomTextStr(words, startsWithLipsum, minWords, maxWords);
	return {
		display: textStr
	};
};

export const getMetadata = (): ExportTypeMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'TEXT default NULL',
		field_Oracle: 'BLOB default NULL',
		field_MSSQL: 'VARCHAR(MAX) NULL'
	}
});
