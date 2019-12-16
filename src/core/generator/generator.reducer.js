import reducerRegistry from '../../store/reducerRegistry';
import * as actions from './generator.actions';
import { generate } from 'shortid';
import { getDataTypeDefaultState } from '../../utils/dataTypeUtils';

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

		case actions.ADD_ROWS: {
			const newRows = {};
			const newRowIDs = [];
			for (let i = 0; i < action.payload.numRows; i++) {
				const rowId = generate();
				newRows[rowId] = {
					id: rowId,
					dataType: null,
					data: null
				};
				newRowIDs.push(rowId);
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
		}

		case actions.REMOVE_ROW:
			return {
				...state,
				sortedRows: state.sortedRows.filter((i) => i !== action.payload.id)
			};

		case actions.CHANGE_DATA_TYPE:
			return {
				...state,
				rows: {
					...state.rows,
					[action.payload.id]: {
						...state.rows[action.payload.id],
						dataType: action.payload.value,
						data: getDataTypeDefaultState(action.payload.value)
					}
				},
			};

		default:
			return state;
	}
};

reducerRegistry.register('generator', reducer);
