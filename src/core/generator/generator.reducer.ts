import { AnyAction } from 'redux';
import reducerRegistry from '../../store/reducerRegistry';
import * as actions from './generator.actions';
import { generate } from 'shortid';
import { getDataTypeDefaultState } from '../../utils/dataTypeUtils';
import { BuilderLayout } from '../../components/builder/Builder.component';

export type DataRow = {
    id: string;
    title: string;
    dataType: string | null;
    data: any;
};

export type DataRows = {
    [id: string]: DataRow;
}

export type ReducerState = {
    rows: DataRows;
    sortedRows: string[];
    showGrid: boolean;
    showPreview: boolean;
    builderLayout: BuilderLayout;
    numPreviewRows: number;
    selectedExportType: string;
    exportTypeSettings: any;
};

/**
 * This houses the content of the generator. The actual content of each row is dependent based on the
 * Data Type: they can choose to store whatever info in whatever format they want. So this is kind of like a frame.
 */
export const reducer = (state: ReducerState = {
	rows: {},
	sortedRows: [],
    showGrid: true,
    showPreview: true,
    builderLayout: 'horizontal',
    numPreviewRows: 5,
    selectedExportType: 'JSON',
    exportTypeSettings: null
}, action: AnyAction) => {
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

        case actions.REPOSITION_ROW: {
            const newArray = state.sortedRows.filter((i) => i !== action.payload.id);
            newArray.splice(action.payload.newIndex, 0, action.payload.id);
            return {
                ...state,
                sortedRows: newArray
            };
        }

        case actions.TOGGLE_GRID: {
            const newState = {
                ...state,
                showGrid: !state.showGrid
            };
            if (!state.showPreview) {
                newState.showPreview = true;
            }
			return newState;
		}

        case actions.TOGGLE_PREVIEW: {
            const newState = {
                ...state,
                showPreview: !state.showPreview
            };
            if (!state.showGrid) {
                newState.showGrid = true;
            }
            return newState;
        }

        case actions.TOGGLE_LAYOUT:
            return {
                ...state,
                builderLayout: state.builderLayout === 'horizontal' ? 'vertical' : 'horizontal'
            };

        case actions.UPDATE_NUM_PREVIEW_ROWS:
            return {
                ...state,
                numPreviewRows: action.payload.numRows
            };

		default:
			return state;
	}
};

reducerRegistry.register('generator', reducer);
