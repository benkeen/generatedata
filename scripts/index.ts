import {
    DataSetConfig,
    DataTypeGenerationOptions,
    DataTypeWorkerInterface,
    ExportType,
    GenerationSettings
} from '~types/generator';
import { generateDataTypes } from '../client/src/utils/generatorUtils';
import {CountryDataType, CountryNamesMap} from "~types/countries";
import {GenerationTemplate} from "~types/general";

// no point requiring users to supply a colIndex. We can add that ourselves.
export type DataTypeGenerationOptionsWithColIndex = DataTypeGenerationOptions & {
    colIndex: number;
}

const dataTypesInterface = {

};

const exportTypesInterface = {

};

// this'll be the only functional export
const generate = (dataConfig: DataSetConfig, settings: GenerationSettings) => {
    // generateDataTypes({
    //     numResults: number;
    //     batchSize: number;
    //     i18n: any;
    //     countryNames: CountryNamesMap;
    //     dataTypeInterface: DataTypeWorkerInterface;
    //     template: GenerationTemplate; // bear in mind this has been grouped by process order. Check type.
    //     onBatchComplete: OnBatchComplete;
    //     countryData: CountryDataType;
    // })
};

// test code
(async () => {
    const settings: GenerationSettings = {
        rows: 100
    };

    const dataConfig: DataSetConfig = { // maybe GenerationDataSet for consistency with second param naming?
        rows: [],
        exportType: {
            plugin: ExportType.JSON,
            settings: {
                dataStructureFormat: 'simple'
            }
        }
    };

     await generate(dataConfig, settings);
})();
