import * as utils from '../../../utils/utils';

export const generate = (generationContextData) => {
	const formats = generationContextData.generationOptions.split('|')
	let chosenFormat = formats[0];
	if (formats.length > 1) {
		chosenFormat = formats[utils.getRandomNum(0, formats.length-1)];
	}
	const val = utils.generateRandomAlphanumericStr(chosenFormat);
	return { display: val };
};

export const getRowGenerationOptionsUI = (postdata, colNum, numCols) => {
// 	if (!postdata["dtOption_$colNum"]) || empty($postdata["dtOption_$colNum"])) {
// 		return false;
// 	}
// 	return $postdata["dtOption_$colNum"];
};

export const getRowGenerationOptionsAPI = (json, numCols) => {
	// if (empty($json->settings->placeholder)) {
	// 	return false;
	// }
	// return $json->settings->placeholder;
};

export const getDataTypeMetadata = () => ({
	SQLField: 'varchar(255)',
	SQLField_Oracle: 'varchar2(255)',
	SQLField_MSSQL: 'VARCHAR(255) NULL'
});
