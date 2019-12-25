import { createSelector } from 'reselect';

// TODO
import * as JSON from '../../plugins/exportTypes/JSON/JSON.generator';


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


/*
    numResults (& batch num etc)

    // ordered
    template: [
        {
            title: 'blah',
            generateFunc: ...,  (from DataType)
            dataTypeState: ..., (from DataType)
            metadata: ...       (from DataType)
        }
    ]
*/

export const getDataForExportType = createSelector(
    getSortedRowsArray,
    (rows) => {
        return {
            numResults: 500,
            template: rows.map(({ title, dataType, data }: any) => ({
                title,
                dataTypeRowSettings: data,
                generateFunc: null,
                metadata: null
            }))
        };
    }
);
