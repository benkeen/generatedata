import { createSelector } from 'reselect';
import { getGenerationOptionsByDataType } from '../../utils/dataTypeGenerationUtils';
import { getDataTypeProcessOrders } from '../../utils/dataTypeUtils';

export const getRows = (state: any) => state.generator.rows;
export const getSortedRows = (state: any) => state.generator.sortedRows;

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

// TODO this will be in a separate bundle loaded async along with the export, dataType + country generation code.
export const getDataForExportType = createSelector(
    getNonEmptySortedRows,
    (rows) => {
        const processOrders = getDataTypeProcessOrders();

        const templateByProcessOrder: any = {};
        rows.map(({ title, dataType, data }: any) => {

            const processOrder = processOrders[dataType];

            // TODO another assumption here. We need to validate the whole component right-up front during the
            // build step and throw a nice error saying what's missing
            const { generate, getMetadata } = getGenerationOptionsByDataType(dataType);

            if (!templateByProcessOrder[processOrder]) {
                templateByProcessOrder[processOrder] = [];
            }

            templateByProcessOrder[processOrder].push({
                title,

                // data for the DT row
                dataTypeRowState: data,

                // actual DT methods
                generateFunc: generate,
                metadata: getMetadata()
            });
        });

        return {
            numResults: 500,
            template: templateByProcessOrder
        };
    }
);
