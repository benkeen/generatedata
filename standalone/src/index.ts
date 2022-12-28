require('browser-env')();

import {
    DataTypeGenerationOptions,
    DataTypeWorkerInterface,
    ExportType,
    GDTemplate,
    WorkerInterface
} from '~types/generator';
import { DataType, dataTypeGenerateMethods } from '../../client/_plugins';
import countryNames from '../../client/_namePlugins';
import { generate } from '../../client/src/utils/generatorUtils';
import workerUtils from '../../client/src/utils';
import { getI18nStrings } from './utils/i18n';
import { GDLocale, GenerationTemplate } from '~types/general';
import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
import { convertRowsToGenerationTemplate } from '~store/generator/generator.selectors';

// no point requiring users to supply a colIndex. We can add that ourselves.
export type DataTypeGenerationOptionsWithColIndex = DataTypeGenerationOptions & {
    colIndex: number;
}

/**
 * Used by both the node and binary scripts. It takes the user's template and fluffs it out with all the necessary
 * values needed by the generation script.
 * @param template
 */
const getNormalizedGDTemplate = (template: GDTemplate): GDTemplate => ({
    generationSettings: {
        locale: 'en',
        stripWhitespace: false,
        packetSize: 100,
        ...template.generationSettings
    },

    // TODO need to prefill all
    dataTemplate: template.dataTemplate,
    exportSettings: template.exportSettings
});

const doStuff = (template: GDTemplate) => {
    // TODO add validation step here

    const normalizedTemplate = getNormalizedGDTemplate(template);
    const i18n = getI18nStrings(normalizedTemplate.generationSettings.locale as GDLocale)
    const dataTypeInterface = getWorkerInterface();

    generate(normalizedTemplate, {
        i18n,
        workerUtils,
        dataTypeInterface,
        template: convertPublicToInternalTemplate(normalizedTemplate.dataTemplate),
        countryNames
    });
};

let newRowId = 1;
const convertPublicToInternalTemplate = (rows: DataTypeGenerationOptions[]): GenerationTemplate => {
    const cleanRows = rows.map((row) => ({
        // for some situations, users can supply their own IDs; this pads the ones that don't have it
        id: row.id || newRowId++,
        title: row.title,
        dataType: row.plugin,
        rowState: row.settings
    }));

    return convertRowsToGenerationTemplate(cleanRows);
};


const getWorkerInterface = (): DataTypeWorkerInterface => {
    const workerInterface: DataTypeWorkerInterface = {};

    Object.keys(dataTypeGenerateMethods).forEach((dataType) => {
        workerInterface[dataType] = {
            context: 'node',
            send: (payload: DTGenerationData): DTGenerateResult => {
                // @ts-ignore
                return dataTypeGenerateMethods[dataType as DataType](payload, workerUtils)
            }
        }
    });

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
