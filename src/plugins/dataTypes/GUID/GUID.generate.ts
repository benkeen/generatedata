import { ExportTypeMetadata } from '../../../../types/exportTypes';
import { DTGenerateReturnType } from '../../../../types/dataTypes';
import { generateRandomAlphanumericStr } from '../../../utils/randomUtils';

const generatedGUIDs: any = {};

export const generate = (): DTGenerateReturnType => {
	const placeholderStr = "HHHHHHHH-HHHH-HHHH-HHHH-HHHHHHHHHHHH";
	let guid = generateRandomAlphanumericStr(placeholderStr);

	// pretty sodding unlikely, but just in case. Uniqueness is kinda the point of the Data Type after all.
	while (generatedGUIDs[guid]) {
		guid = generateRandomAlphanumericStr(placeholderStr);
	}
	generatedGUIDs[guid] = true;
	
	return { display: guid };
};

export const getMetadata = (): ExportTypeMetadata => ({
	sql: {
		field: 'varchar(36) NOT NULL',
		field_Oracle: 'varchar2(36) NOT NULL',
		field_MSSQL: 'UNIQUEIDENTIFIER NULL'
	}
});
