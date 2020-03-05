import { GDAction } from '../../../types/general';
import * as selectors from './generator.selectors';
import { generateExportData } from './generator';
import { ExportSettingsTab } from '../../components/exportSettings/ExportSettings.types';
import { ExportTypeFolder, DataTypeFolder } from '../../_plugins';
import { loadDataTypeBundle } from '../../utils/dataTypeUtils';
import { loadExportTypeBundle } from '../../utils/exportTypeUtils';
import { EXPORT_TYPE_LOADED } from '../init/init.actions';
import { DTBundle } from '../../../types/dataTypes';

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

export const selectExportType = (exportType: ExportTypeFolder): any => {
	return (dispatch: any): any => {
		loadExportTypeBundle(exportType)
			.then(() => {
				dispatch({
					type: EXPORT_TYPE_LOADED,
					payload: exportType
				});
			});
	};
};

export const SELECT_DATA_TYPE = 'SELECT_DATA_TYPE';
export const onSelectDataType = (id: string, dataType: DataTypeFolder): any => {
	return (dispatch: any): any => {
		loadDataTypeBundle(dataType)
			.then((bundle: DTBundle) => {
				dispatch({
					type: SELECT_DATA_TYPE,
					payload: {
						id,
						value: dataType,
						data: bundle.initialState
					}
				});
				dispatch(refreshPreview([id]));
			});
	};
};

export const CONFIGURE_DATA_TYPE = 'CONFIGURE_DATA_TYPE';
export const onConfigureDataType = (id: string, data: any): any => {
	return (dispatch: any): any => {
		const configureDataType = (disp: any): any => new Promise((resolve: any) => {
			disp({
				type: CONFIGURE_DATA_TYPE,
				payload: {
					id, data
				}
			});
			resolve();
		});
		configureDataType(dispatch).then(() => dispatch(refreshPreview([id])));
	};
};

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

export const REFRESH_PREVIEW_DATA = 'REFRESH_PREVIEW_DATA';
export const refreshPreview = (idsToRefresh: string[] = []): any => {
	return (dispatch: any, getState: any): any => {
		const state = getState();
		const template = selectors.getGenerationTemplate(state);
		const sortedRows = selectors.getSortedRows(state);

		const data = generateExportData({
			numResults: selectors.getNumPreviewRows(state),
			columnTitles: selectors.getColumnTitles(state),
			template
		});

		const previewData: any = {};
		sortedRows.forEach((id: string, index: number) => {
			if (idsToRefresh.length && idsToRefresh.indexOf(id) === -1) {
				return;
			}
			previewData[id] = data.rows.map((row: any): any => row[index]);
		});

		dispatch({
			type: REFRESH_PREVIEW_DATA,
			payload: {
				previewData
			}
		});
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

export const TOGGLE_EXPORT_SETTINGS = 'TOGGLE_EXPORT_SETTINGS';
export const toggleExportSettings = (tab?: ExportSettingsTab): GDAction => ({
	type: TOGGLE_EXPORT_SETTINGS,
	payload: {
		tab
	}
});

export const CHANGE_EXPORT_TYPE = 'CHANGE_EXPORT_TYPE';
export const changeExportType = (exportType: string): GDAction => ({
	type: CHANGE_EXPORT_TYPE,
	payload: {
		exportType
	}
});
