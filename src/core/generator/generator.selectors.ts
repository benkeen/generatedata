import { createSelector } from 'reselect';
import { getGenerationOptionsByDataType } from '../../utils/dataTypeGenerationUtils';

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


// TODO this would be in a separate bundle loaded async along with the export, dataType + country generation code
export const getDataForExportType = createSelector(
    getSortedRowsArray,
    (rows) => {
        return {
            numResults: 500,
            template: rows.map(({ title, dataType, data }: any) => {

                // TODO another assumption here. Maybe validate the whole component right-up front during the
                // build step and throw a nice error saying what's missing
                const { generate, getMetadata } = getGenerationOptionsByDataType(dataType);

                return {
                    title,
                    dataTypeRowSettings: data,
                    generateFunc: generate,
                    metadata: getMetadata()
                };
            })
        };
    }
);
