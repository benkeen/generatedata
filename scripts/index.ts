import {
    GenerationDataSet,
    DataTypeGenerationOptions,
    DataTypeWorkerInterface,
    ExportType,
    GenerationSettings
} from '~types/generator';
import { generateDataTypes } from '../client/src/utils/generatorUtils';
import { CountryDataType, CountryNamesMap } from '~types/countries';
import { GenerationTemplate } from '~types/general';
import { DataType } from "../client/_plugins";

// no point requiring users to supply a colIndex. We can add that ourselves.
export type DataTypeGenerationOptionsWithColIndex = DataTypeGenerationOptions & {
    colIndex: number;
}

const dataTypesInterface = {

};

const exportTypesInterface = {

};

// this'll be the only functional export
const generate = (dataConfig: GenerationDataSet, settings: GenerationSettings) => {


    // generateDataTypes({
    //     numResults: settings.rows,
    //     batchSize: 100,
    //     i18n: any;
    //     countryNames: CountryNamesMap;
    //     dataTypeInterface: DataTypeWorkerInterface;
    //     template: GenerationTemplate; // bear in mind this has been grouped by process order. Check type.
    //     onBatchComplete: OnBatchComplete;
    //     countryData: CountryDataType;
    // });
};

// test code
(async () => {
    const settings: GenerationSettings = {
        rows: 1000,
    };

    const dataConfig: GenerationDataSet = {
        rows: [
            {
                plugin: DataType.Names,
                title: 'First Name',
                settings: {
                    options: ['Name']
                }
            },
            {
                plugin: DataType.Names,
                title: 'Last Name',
                settings: {
                    options: ['Surname']
                }
            }
        ],
        exportType: {
            plugin: ExportType.JSON,
            settings: {
                dataStructureFormat: 'simple'
            }
        }
    };

     await generate(dataConfig, settings);
})();
