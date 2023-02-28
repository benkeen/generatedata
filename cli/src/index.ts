/**
 * This file is boiled down to dist/index.js and is the "main" entry in the package.json file. Users
 * can import it and get access to the main `generate` method to programmatically generate random data.
 *
 * The command line script (bin/generatedata.js) is separate. That imports this code but provides a wrapper over the
 * functionality to show a progress indicator, allow for arguments + error handling etc.
 */

import path from 'path';
import fs from 'fs';
import {
    DataTemplateRow,
    DataTypeWorkerInterface,
    ExportType,
    GDTemplate
} from '~types/generator';
import { DataType } from '../../client/_plugins';
import { dataTypeNodeData, exportTypeNodeData } from '../_cliTypes';
import countryNames from '../../client/_namePlugins';
import { generate as generateUtils } from '../../client/src/utils/generatorUtils';
import workerUtils from '../../client/src/utils';
import { GDLocale, GenerationTemplate } from '~types/general';
import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
import { convertRowsToGenerationTemplate } from '~store/generator/generator.selectors';
import { getCountryData } from '~utils/countryUtils';
import { setLocale } from '~utils/langUtils';

export { availableLocales } from '../../client/_env';
export { DataType, ExportType, GDTemplate };

const getI18nStrings = (locale: GDLocale): any => {
    const localeFile = path.join(__dirname, `./_i18n/${locale}.json`);
    return JSON.parse(fs.readFileSync(localeFile, 'utf8'));
};

/**
 * Takes the user's template and fluffs it out with all the necessary values needed by the generation script.
 */
const getNormalizedGDTemplate = (template: GDTemplate): GDTemplate => ({
    generationSettings: {
        locale: 'en',
        stripWhitespace: false,
        packetSize: 100,
        target: 'return',
        ...template.generationSettings
    },

    // TODO need to prefill all
    dataTemplate: template.dataTemplate,
    exportSettings: template.exportSettings
});

const getColumns = (rows: DataTemplateRow[]) => {
    return rows.map((row) => ({
        title: row.title,
        dataType: row.plugin,
        id: row.id || newRowId++,
        metadata: {} // TODO...
    }));
};

export type GDParams = {
    onBatchComplete: ({ isLastBatch, numGeneratedRows, batchData }: any) => void;
}

/**
 * The primary export
 * @param template
 */
const generate = async (template: GDTemplate, params?: GDParams): Promise<string> => {
    const normalizedTemplate = getNormalizedGDTemplate(template);

    // initialize the locale. This is used for a few things in the app for the generated date
    const locale = normalizedTemplate.generationSettings.locale as GDLocale;
    const i18n = getI18nStrings(normalizedTemplate.generationSettings.locale as GDLocale)
    setLocale(locale, i18n);

    const dataTypeInterface = getWorkerInterface();
    const exportTypeInterface = getExportTypeWorkerInterface(normalizedTemplate.exportSettings.plugin as ExportType);

    let inMemoryResult = '';
    return new Promise((resolve) => {
        const onComplete = (data: string, settings: any) => {

            // consumers can optionally pass an onBatchComplete callback that'll be called after each batch is processed.
            // This is used by the command line binary to provide a progress bar
            if (params?.onBatchComplete) {
                params.onBatchComplete({
                    isLastBatch: settings.isLastBatch,
                    numGeneratedRows: settings.numGeneratedRows,
                    batchData: data
                });
            }

            inMemoryResult += data;
            if (settings.isLastBatch) {
                resolve(inMemoryResult);
            }
        };

        generateUtils({
            i18n,
            workerUtils,
            dataTypeInterface,
            exportTypeInterface,
            exportTypeSettings: normalizedTemplate.exportSettings.settings,
            generationSettings: normalizedTemplate.generationSettings,
            template: convertPublicToInternalTemplate(normalizedTemplate.dataTemplate),
            countryNames,
            countryData: getCountryData(),
            onComplete,
            columns: getColumns(normalizedTemplate.dataTemplate)
        });
    });
};

export default generate;

let newRowId = 1;
const convertPublicToInternalTemplate = (rows: DataTemplateRow[]): GenerationTemplate => {
    const cleanRows = rows.map((row) => ({
        // for some situations, users can supply their own IDs so they can map data together. This pads the ones that
        // don't have it
        id: row.id || newRowId++,
        title: row.title,
        dataType: row.plugin,
        data: row.settings
    }));

    return convertRowsToGenerationTemplate(cleanRows);
};


const getWorkerInterface = (): DataTypeWorkerInterface => {
    const workerInterface: DataTypeWorkerInterface = {};

    Object.keys(dataTypeNodeData).forEach((dataType) => {
        workerInterface[dataType] = {
            context: 'node',
            send: (payload: DTGenerationData): DTGenerateResult => {
                // this extends whatever settings the user supplied with the default values defined by the Data Type,
                // so the data passed to the DT's generate method is complete
                const fullPayload = {
                    ...payload,
                    rowState: {
                        ...dataTypeNodeData[dataType as DataType].defaultGenerationOptions,
                        ...payload.rowState
                    }
                };
                return dataTypeNodeData[dataType as DataType].generate(fullPayload, workerUtils)
            }
        }
    });

    return workerInterface;
};

const getExportTypeWorkerInterface = (exportType: ExportType) => {
    return {
        context: 'node',
        send: (payload: any) => {
            // this extends whatever settings the user supplied with the default values defined by the Data Type,
            // so the data passed to the DT's generate method is complete
            const fullPayload = {
                ...payload,
                // TODO note name difference with DTs
                settings: {
                    ...exportTypeNodeData[exportType].defaultGenerationOptions,
                    ...payload.settings
                }
            };
            return exportTypeNodeData[exportType].generate(fullPayload, workerUtils)
        }
    };
};
