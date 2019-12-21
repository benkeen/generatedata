import reducerRegistry from '../../store/reducerRegistry';
import * as actions from './generator.actions';
import { generate } from 'shortid';
import { getDataTypeDefaultState } from '../../utils/dataTypeUtils';
import { ActionType } from '../../../types/general';

export type DataRow = {
    id: string;
    title: string;
    dataType: string;
    data: any;
};

export type DataRows = {
    [id: string]: DataRow;
}

export type ReducerState = {
    rows: DataRows;
    sortedRows: string[];
};

/**
 * This houses the content of the generator. The actual content of each row is dependent based on the
 * Data Type: they can choose to store whatever info in whatever format they want. So this is kind of like a frame.
 */
const reducer = (state: ReducerState = {
	rows: {},
	sortedRows: [],
	// dataTypes: [],
	// exportTypes: [],
	// countries: []
}, action: ActionType) => {
	switch (action.type) {

		case actions.ADD_ROWS: {
			const newRows: DataRows = {};
			const newRowIDs: string[] = [];
			for (let i = 0; i < action.payload.numRows; i++) {
				const rowId = generate();
				newRows[rowId] = {
					id: rowId,
					title: '',
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

		case actions.CHANGE_TITLE:
			return {
				...state,
				rows: {
					...state.rows,
					[action.payload.id]: {
						...state.rows[action.payload.id],
						title: action.payload.value
					}
				}
			};

		case actions.SELECT_DATA_TYPE:
			return {
				...state,
				rows: {
					...state.rows,
					[action.payload.id]: {
						...state.rows[action.payload.id],
						dataType: action.payload.value,
						data: getDataTypeDefaultState(action.payload.value)
					}
				}
			};

		case actions.CONFIGURE_DATA_TYPE:
			return {
				...state,
				rows: {
					...state.rows,
					[action.payload.id]: {
						...state.rows[action.payload.id],
						data: action.payload.data
					}
				},
			};

		default:
			return state;
	}
};

reducerRegistry.register('generator', reducer);
