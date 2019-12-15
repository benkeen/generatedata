import reducerRegistry from '../../store/reducerRegistry';
import * as actions from './generator.actions';

let rowID = 1;

/**
 * This houses the content of the generator. The actual content of each row is dependent based on the
 * Data Type: they can choose to store whatever info in whatever format they want. So this is kind of like a frame.
 */
const reducer = (state = {
	rows: {},
	sortedRows: [],
	dataTypes: [],
	exportTypes: [],
	countries: []
}, action) => {
	switch (action.type) {

		case actions.ADD_ROWS:
			const newRows = {};
			const newRowIDs = [];
			for (let i=0; i<action.payload.numRows; i++) {
				newRows[rowID] = {
					dataType: null,
					options: null,
					example: null
				};
				newRowIDs.push(rowID);
				rowID++;
			}
			return {
				...state,
				rows: {
					...state.rows,
					...newRows
				},
				sortedRows: [
					...state.sortedRows,
					...newRowIDs
				]
			};

		case actions.REMOVE_ROW:
			return {
				...state,
				sortedRows: state.sortedRows.filter((i) => i !== action.payload.id)
			};

		default:
			return state;
	}
};

reducerRegistry.register('generator', reducer);
