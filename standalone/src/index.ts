import {
    DataTypeGenerationOptions, DataTypeWorkerInterface,
    ExportType,
    GDTemplate, WorkerInterface
} from '~types/generator';
import { DataType } from '../../client/_plugins';
import { generate } from '../../client/src/utils/generatorUtils';
import workerUtils from '../../client/src/utils';
import { getI18nStrings } from './utils/i18n';
import { GDLocale } from '~types/general';

// no point requiring users to supply a colIndex. We can add that ourselves.
export type DataTypeGenerationOptionsWithColIndex = DataTypeGenerationOptions & {
    colIndex: number;
}

const dataTypesInterface = {

};

const exportTypesInterface = {

};

/**
 * Used by both the node and binary scripts. It takes the user's template and fluffs it out with all the necessary
 * values needed by the generation script.
 * @param template
 */
const getNormalizedGDTemplate = (template: GDTemplate): GDTemplate => {
    return {
        generationSettings: {
            locale: 'en',
            stripWhitespace: false,
            packetSize: 100,
            ...template.generationSettings
        },
        dataTemplate: template.dataTemplate,
        exportSettings: template.exportSettings
    };
};

const doStuff = (template: GDTemplate) => {
    // TODO add validation step here

    const normalizedTemplate = getNormalizedGDTemplate(template);
    const i18n = getI18nStrings(normalizedTemplate.generationSettings.locale as GDLocale)

    const dataTypeInterface: DataTypeWorkerInterface = {};


    generate(normalizedTemplate, { i18n, workerUtils, dataTypeInterface });
};

const getWorkerInterface = (workerPath: string): WorkerInterface => {
    let workerInterface: WorkerInterface;

    // workerInterface = {
    //     send: worker.postMessage,
    //     onSuccess: onRegisterSuccess,
    //     onError: onRegisterError
    // };

    return workerInterface;
};


(async () => {
    const template: GDTemplate = {
        generationSettings: {
            numRows: 1000
        },
        dataTemplate: [
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
        exportSettings: {
            plugin: ExportType.JSON,
            settings: {
                dataStructureFormat: 'simple'
            }
        }
    };

     await doStuff(template);
})();
