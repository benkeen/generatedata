import { DTMetadata, DTGenerationData, DTGenerateResult } from '~types/dataTypes';
import { generateRandomTextStr } from '../../../utils/randomUtils';
import { getLipsumWords } from '../../../utils/stringUtils';

export const generate = ({ rowState }: DTGenerationData): DTGenerateResult => {
	const { words } = getLipsumWords();
	const textStr = generateRandomTextStr(words, false, rowState.numWords);
	return {
		display: textStr
	};
};

export const getMetadata = (): DTMetadata => ({
	general: {
		dataType: 'string'
	},
	sql: {
		field: 'TEXT default NULL',
		field_Oracle: 'BLOB default NULL',
		field_MSSQL: 'VARCHAR(MAX) NULL'
	}
});
