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

export const getNonEmptySortedRows = createSelector(
    getSortedRowsArray,
    (rows) => rows.filter((row: any) => row.dataType !== null)
);

// TODO this would be in a separate bundle loaded async along with the export, dataType + country generation code
export const getDataForExportType = createSelector(
    getNonEmptySortedRows,
    (rows) => {

        console.log(rows);

        return {
            numResults: 500,
            template: rows.map(({ title, dataType, data }: any) => {

                console.log('data type? ', dataType);

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
