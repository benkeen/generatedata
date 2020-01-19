import { GenerationData, DTGenerateReturnType } from '../../../../types/dataTypes';
import { generateRandomTextStr } from '../../../utils/randomUtils';
import { getLipsumWords } from '../../../utils/stringUtils';
import { ExportTypeMetadata } from '../../../../types/exportTypes';

export const generate = (data: GenerationData): DTGenerateReturnType => {
	const { words } = getLipsumWords();
	const textStr = generateRandomTextStr(words, false, data.rowState.numWords);
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
