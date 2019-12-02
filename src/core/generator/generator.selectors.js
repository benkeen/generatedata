import { createSelector } from 'reselect';

export const getRows = (state) => state.generator.rows;
export const getSortedRows = (state) => state.generator.sortedRows;

export const getSortedRowsArray = createSelector(
	getRows,
	getSortedRows,
	(rows, sorted) => sorted.map((id) => ({ ...rows[id], id }))
);
