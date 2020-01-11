import { createSelector } from 'reselect';
import { getGenerationOptionsByDataType } from '../../utils/dataTypeGenerationUtils';
import { getDataTypeProcessOrders } from '../../utils/dataTypeUtils';
import { GenerationTemplate } from '../../../types/general';

export const getRows = (state: any) => state.generator.rows;
export const getSortedRows = (state: any) => state.generator.sortedRows;
export const isGridVisible = (state: any) => state.generator.showGrid;
export const isPreviewVisible = (state: any) => state.generator.showPreview;
export const getBuilderLayout = (state: any) => state.generator.builderLayout;
export const getNumPreviewRows = (state: any) => state.generator.numPreviewRows;

export const getNumRows = createSelector(
	getSortedRows,
	(rows) => rows.length
);

export const getSortedRowsArray = createSelector(
	getRows,
	getSortedRows,
	(rows, sorted) => sorted.map((id: string) => ({ ...rows[id], id }))
);

export const getNonEmptySortedRows = createSelector(
    getSortedRowsArray,
    (rows) => rows.filter((row: any) => row.dataType !== null)
);

export const getColumnTitles = createSelector(
    getSortedRowsArray,
    (rows) => rows.map((row: any) => row.title)
);


// TODO need to sort this out now!! We need this immediately as the user selects
// this will be in a separate bundle loaded async along with the export, dataType + country generation code
export const getGenerationTemplate = createSelector(
    getNonEmptySortedRows,
    (rows): GenerationTemplate => {
        const processOrders = getDataTypeProcessOrders();

        const templateByProcessOrder: any = {};
        rows.map(({ title, dataType, data }: any, colIndex: number) => {
            const processOrder = processOrders[dataType];

            // TODO another assumption here. We need to validate the whole component right-up front during the
            // build step and throw a nice error saying what's missing
            const { generate, getMetadata, getGenerationSettings } = getGenerationOptionsByDataType(dataType);

            if (!templateByProcessOrder[processOrder]) {
                templateByProcessOrder[processOrder] = [];
            }

            templateByProcessOrder[processOrder].push({
                title,
                dataType,
                colIndex,

                // settings for the DT cell
                generationSettings: getGenerationSettings(data),

                // DT methods for the actual generation of this cell
                generateFunc: generate,
                colMetadata: getMetadata()
            });
        });

        // TODO sort by process order (keys) here

        return templateByProcessOrder;
    }
);
