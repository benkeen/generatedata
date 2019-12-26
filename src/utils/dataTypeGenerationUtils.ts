import { dataTypesGenerate, dataTypeNames } from '../../build/dataTypesListGenerate';

export const getGenerationOptionsByDataType = (dataType: string) => {
    if (dataTypeNames.indexOf(dataType) === -1) {
        console.error('Missing generation method for ', dataType);
        return;
    }
    return dataTypesGenerate[dataType];
};
