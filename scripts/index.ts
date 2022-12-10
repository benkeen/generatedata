import { DataSetConfig, DataTypeGenerationOptions, ExportType, GenerationSettings } from '~types/generator';
import { generateDataTypes } from '../client/src/utils/generatorUtils';

// no point requiring users to supply a colIndex. We can add that ourselves.
export type DataTypeGenerationOptionsWithColIndex = DataTypeGenerationOptions & {
    colIndex: number;
}

const dataTypesInterface = {

};

const exportTypesInterface = {

};

// this'll be the only functional export
const generate = {

};

(async () => {
    const settings: GenerationSettings = {
        rows: 100
    };

    const dataConfig: DataSetConfig = {
        rows: [],
        exportType: {
            plugin: ExportType.JSON,
            settings: {
                dataStructureFormat: 'simple'
            }
        }
    };

    await generateDataTypes(dataConfig, settings);
})();
