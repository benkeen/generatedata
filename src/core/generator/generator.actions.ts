import { GDAction } from '../../../types/general';
import { getGenerationOptionsByDataType } from '../../utils/dataTypeGenerationUtils';
import * as selectors from './generator.selectors';
import { getDataTypeDefaultState } from '../../utils/dataTypeUtils';
import { generateExportData } from './generator';


export const ADD_ROWS = 'ADD_ROWS';

export const addRows = (numRows: number): GDAction => ({
	type: ADD_ROWS,
	payload: {
		numRows
	}
});

export const REMOVE_ROW = 'REMOVE_ROW';
export const removeRow = (id: string): GDAction => ({ type: REMOVE_ROW, payload: { id } });

export const CHANGE_TITLE = 'CHANGE_TITLE';
export const onChangeTitle = (id: string, value: string): GDAction => ({
	type: CHANGE_TITLE,
	payload: {
		id, value
	}
});

export const SELECT_DATA_TYPE = 'SELECT_DATA_TYPE';
export const onSelectDataType = (id: string, dataType: string): any => {
	return (dispatch: any, getState: any): any => {
		const state = getState();
		const dataTypeDefaultState = getDataTypeDefaultState(dataType);

		// complex bit! We have interdependencies between the data types. A region field will change the value of a 
		// city field, for example. So we DO need to regenerate everything here and not just the row that just 
		// changes. We also need to map dependencies explicitly in the Data Type export settings, so we can later on 
		// ALSO update any other affected fields by this change
		const template = selectors.getGenerationTemplate(state);
		const { generate, getMetadata, rowStateReducer } = getGenerationOptionsByDataType(dataType);

		// *** update the row in template here for dataTypeDefaultState *** 
		Object.keys(template).forEach((processOrder: any) => {
			template[processOrder].forEach((row: any, index: number) => {
				if (row.id !== id) {
					return;
				}
				template[processOrder][index] = {
					...row,
					dataType,
					rowState: rowStateReducer ? rowStateReducer(dataTypeDefaultState) : dataTypeDefaultState,
					generateFunc: generate,
					colMetadata: getMetadata ? getMetadata() : null
				};
			});
		});

		// now regenerate the whole data set again (this could be smarter once we figure out dependencies)
		const data = generateExportData({
			numResults: selectors.getNumPreviewRows(state),
			columnTitles: selectors.getColumnTitles(state),
			template
		});
		const sortedRows = selectors.getSortedRows(state);
		const dataIndex = sortedRows.indexOf(id);

		// pull out the generated values for this index
		const generatedPreviewData: any[] = data.rows.map((i) => i[dataIndex]);

		// now update the store in one go
		dispatch({
			type: SELECT_DATA_TYPE,
			payload: {
				id,
				value: dataType,
				data: dataTypeDefaultState,
				generatedPreviewData
			}
		});
	};
};

export const CONFIGURE_DATA_TYPE = 'CONFIGURE_DATA_TYPE';
export const onConfigureDataType = (id: string, data: any): GDAction => ({
	type: CONFIGURE_DATA_TYPE,
	payload: {
		id, data
	}
});

export const REPOSITION_ROW = 'REPOSITION_ROW';
export const repositionRow = (id: string, newIndex: number): GDAction => ({
	type: REPOSITION_ROW,
	payload: {
		id, newIndex
	}
});

export const TOGGLE_GRID = 'TOGGLE_GRID';
export const toggleGrid = (): GDAction => ({ type: TOGGLE_GRID });

export const TOGGLE_PREVIEW = 'TOGGLE_PREVIEW';
export const togglePreview = (): GDAction => ({ type: TOGGLE_PREVIEW });

export const REFRESH_PREVIEW = 'REFRESH_PREVIEW';
export const refreshPreview = (): any => {

	return (dispatch: any, getState: any): any => {
		const state = getState();
		const template = selectors.getGenerationTemplate(state);

		const data = generateExportData({
			numResults: selectors.getNumPreviewRows(state),
			columnTitles: selectors.getColumnTitles(state),
			template
		});

		console.log('!!!', data);

		// now update the store in one go
		// dispatch({
		// 	type: SELECT_DATA_TYPE,
		// 	payload: {
		// 		id,
		// 		value: dataType,
		// 		data: dataTypeDefaultState,
		// 		generatedPreviewData
		// 	}
		// });
	};
};

export const TOGGLE_LAYOUT = 'TOGGLE_LAYOUT';
export const toggleLayout = (): GDAction => ({ type: TOGGLE_LAYOUT });

export const UPDATE_NUM_PREVIEW_ROWS = 'UPDATE_NUM_PREVIEW_ROWS';
export const updateNumPreviewRows = (numRows: number): GDAction => ({ type: UPDATE_NUM_PREVIEW_ROWS, payload: { numRows } });

export const CHANGE_THEME = 'CHANGE_THEME';
export const changeTheme = (theme: string): GDAction => ({ type: CHANGE_THEME, payload: { theme } });

export const TOGGLE_SHOW_ROW_NUMBERS = 'TOGGLE_SHOW_ROW_NUMBERS';
export const toggleShowRowNumbers = (): GDAction => ({ type: TOGGLE_SHOW_ROW_NUMBERS });

export const TOGGLE_LINE_WRAPPING = 'TOGGLE_LINE_WRAPPING';
export const toggleLineWrapping = (): GDAction => ({ type: TOGGLE_LINE_WRAPPING });

export const SET_PREVIEW_TEXT_SIZE = 'SET_PREVIEW_TEXT_SIZE';
export const setPreviewTextSize = (previewTextSize: number): GDAction => ({
	type: SET_PREVIEW_TEXT_SIZE,
	payload: {
		previewTextSize
	}
});
