import { dataTypesGenerate, dataTypeNames } from '../../build/dataTypesListGenerate';

export const getGenerationOptionsByDataType = (dataType: string) => {
	if (dataTypeNames.indexOf(dataType) === -1) {
		throw new Error(`Missing generation method for: ${dataType}`);
	}
	return dataTypesGenerate[dataType];
};
