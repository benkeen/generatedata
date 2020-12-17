import { Dispatch } from 'redux';
import * as selectors from './generator.selectors';
import { ExportSettingsTab } from '../../generator/exportSettings/ExportSettings.types';
import { DataTypeFolder, ExportTypeFolder } from '../../../../_plugins';
import { requestDataTypeBundle } from '~utils/dataTypeUtils';
import { registerInterceptors } from '../../actionInterceptor';
import * as coreUtils from '~utils/coreUtils';
import { getStrings } from '~utils/langUtils';
import { getUniqueString } from '~utils/stringUtils';
import { loadExportTypeBundle, getExportTypeInitialState } from '~utils/exportTypeUtils';
import { DTBundle } from '~types/dataTypes';
import { GDAction } from '~types/general';
import C from '../../constants';
import { getUnchangedData } from '../../generationPanel/generation.helpers';
import { ClearType } from '../../dialogs/clearGrid/ClearGrid.component';
import { DataSetListItem } from '~types/dataSets';
import { getUnique } from '~utils/arrayUtils';

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
export const onSelectDataType = (dataType: DataTypeFolder, gridRowId?: string): any => {
	return (dispatch: any, getState: any): any => loadDataTypeBundle(dispatch, getState, dataType, gridRowId);
};

export const loadDataTypeBundle = (dispatch: Dispatch, getState: any, dataType: DataTypeFolder, gridRowId?: string): void => {
	const dataTypeI18n = selectors.getDataTypeI18n(getState());

	let defaultTitle: string | null = null;
	if (dataTypeI18n && dataTypeI18n[dataType]) {
		defaultTitle = dataTypeI18n[dataType].DEFAULT_TITLE ? dataTypeI18n[dataType].DEFAULT_TITLE : dataType.toLowerCase();
		const titles = selectors.getTitles(getState());
		defaultTitle = getUniqueString(defaultTitle as string, titles);
	}

	requestDataTypeBundle(dataType)
		.then((bundle: DTBundle) => {
			dispatch(dataTypeLoaded(dataType));
			if (bundle.actionInterceptors) {
				registerInterceptors(dataType, bundle.actionInterceptors);
			}

			// if it's been selected within the grid, select the row and update the preview panel
			if (gridRowId) {
				dispatch({
					type: SELECT_DATA_TYPE,
					payload: {
						id: gridRowId,
						value: dataType,
						data: bundle.initialState,
						defaultTitle
					}
				});
				dispatch(refreshPreview([gridRowId]));
			} else {
				dispatch(checkPreviewPanelDependenciesLoaded());
			}
		});
};

export const CONFIGURE_DATA_TYPE = 'CONFIGURE_DATA_TYPE';
export const onConfigureDataType = (id: string, data: any, triggeredByInterceptor = false): any => {
	return (dispatch: any): any => {
		const configureDataType = (disp: any): any => new Promise((resolve: any) => {
			disp({
				type: CONFIGURE_DATA_TYPE,
				triggeredByInterceptor,
				payload: {
					id, data
				}
			});
			resolve();
		});
		configureDataType(dispatch).then(() => dispatch(refreshPreview([id])));
	};
};

export const CONFIGURE_EXPORT_TYPE = 'CONFIGURE_EXPORT_TYPE';
export const configureExportType = (data: any): GDAction => ({
	type: CONFIGURE_EXPORT_TYPE,
	payload: {
		data
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

export const REFRESH_PREVIEW_DATA = 'REFRESH_PREVIEW_DATA';

// this re-generates the preview panel data. This doesn't have to be called on boot-up because the preview data is
// generated on the fly, saved in the store and rehydrated when the app loads
export const refreshPreview = (idsToRefresh: string[] = [], onComplete: any = null): any => {
	const dataTypeWorker = coreUtils.getDataTypeWorker('preview');

	return (dispatch: any, getState: any): any => {
		const state = getState();
		const template = selectors.getGenerationTemplate(state);
		const dataTypePreviewData = { ...selectors.getDataTypePreviewData(state) };
		const sortedRows = selectors.getSortedRows(state);
		const columns = selectors.getColumns(state);

		const unchanged = getUnchangedData(idsToRefresh, columns, dataTypePreviewData);

		// here we DO need to generate the data independently of the final string in the appropriate export type format.
		// That allows us to tease out what changes on each keystroke in the UI and only refresh specific fields - it's
		// far clearer to the end user that way
		dataTypeWorker.postMessage({
			numResults: C.MAX_PREVIEW_ROWS,
			batchSize: C.MAX_PREVIEW_ROWS,
			unchanged,
			columns,
			i18n: getStrings(),
			template,
			workerResources: {
				workerUtils: coreUtils.getWorkerUtils(),
				dataTypes: coreUtils.getDataTypeWorkerMap(selectors.getRowDataTypes(state) as DataTypeFolder[]),
				countries: coreUtils.getCountries()
			}
		});

		dataTypeWorker.onmessage = (resp: MessageEvent): void => {
			const { data } = resp;
			const { generatedData } = data;

			sortedRows.forEach((id: string, index: number) => {
				if (idsToRefresh.length && idsToRefresh.indexOf(id) === -1) {
					return;
				}
				dataTypePreviewData[id] = generatedData.map((row: any): any => row[index]);
			});

			// great! So we've generated the data we need and manually only changed those lines that have just changed
			// by the user via the UI. The CodeMirrorWrapper component handles passing off that info to the export type
			// web worker to generate the final string
			dispatch({
				type: REFRESH_PREVIEW_DATA,
				payload: {
					dataTypePreviewData
				}
			});

			if (onComplete) {
				dispatch(onComplete());
			}
		};
	};
};

export const TOGGLE_LAYOUT = 'TOGGLE_LAYOUT';
export const toggleLayout = (): GDAction => ({ type: TOGGLE_LAYOUT });

export const UPDATE_NUM_PREVIEW_ROWS = 'UPDATE_NUM_PREVIEW_ROWS';
export const updateNumPreviewRows = (numRows: number): GDAction => ({ type: UPDATE_NUM_PREVIEW_ROWS, payload: { numRows } });

export const CHANGE_THEME = 'CHANGE_THEME';
export const changeTheme = (theme: string): GDAction => ({ type: CHANGE_THEME, payload: { theme } });

export const TOGGLE_SHOW_LINE_NUMBERS = 'TOGGLE_SHOW_LINE_NUMBERS';
export const toggleShowLineNumbers = (): GDAction => ({ type: TOGGLE_SHOW_LINE_NUMBERS });

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

export const SELECT_EXPORT_TYPE = 'SELECT_EXPORT_TYPE';
export const onSelectExportType = (exportType: ExportTypeFolder): any => {
	return (dispatch: any): any => {
		dispatch({
			type: SELECT_EXPORT_TYPE,
			payload: {
				exportType
			}
		});

		loadExportTypeBundle(exportType)
			.then((bundle: DTBundle) => {
				dispatch(exportTypeLoaded(exportType, bundle.initialState));
				dispatch(checkPreviewPanelDependenciesLoaded());
			});
	};
};

export const EXPORT_TYPE_LOADED = 'EXPORT_TYPE_LOADED';
export const exportTypeLoaded = (exportType: ExportTypeFolder, initialState: any): GDAction => ({
	type: EXPORT_TYPE_LOADED,
	payload: {
		exportType,
		initialState
	}
});

export const DATA_TYPE_LOADED = 'DATA_TYPE_LOADED';
export const dataTypeLoaded = (dataType: DataTypeFolder): GDAction => ({
	type: DATA_TYPE_LOADED,
	payload: {
		dataType
	}
});

export const SHOW_GENERATION_SETTINGS_PANEL = 'SHOW_GENERATION_SETTINGS_PANEL';
export const showGenerationSettingsPanel = (): GDAction => ({ type: SHOW_GENERATION_SETTINGS_PANEL });

export const HIDE_START_GENERATION_PANEL = 'HIDE_START_GENERATION_PANEL';
export const hideStartGenerationPanel = (): GDAction => ({ type: HIDE_START_GENERATION_PANEL });

export const UPDATE_NUM_ROWS_TO_GENERATE = 'UPDATE_NUM_ROWS_TO_GENERATE';
export const updateNumRowsToGenerate = (numRowsToGenerate: number): GDAction => ({
	type: UPDATE_NUM_ROWS_TO_GENERATE,
	payload: {
		numRowsToGenerate
	}
});

export const TOGGLE_STRIP_WHITESPACE = 'TOGGLE_STRIP_WHITESPACE';
export const toggleStripWhitespace = (): GDAction => ({ type: TOGGLE_STRIP_WHITESPACE });

export const CLEAR_GRID = 'CLEAR_GRID';
export const RESET_GENERATOR = 'RESET_GENERATOR';
export const clearGrid = (clearType: ClearType): any => (dispatch: Dispatch, getState: any): void => {
	if (clearType === "everything") {
		const loadedExportTypes = selectors.getLoadedExportTypesArray(getState());

		const exportTypeInitialStates: any = {};
		loadedExportTypes.forEach((et: ExportTypeFolder) => {
			exportTypeInitialStates[et] = getExportTypeInitialState(et);
		});

		dispatch({
			type: RESET_GENERATOR,
			payload: {
				exportTypeInitialStates
			}
		});
	} else {
		dispatch({ type: CLEAR_GRID });
	}

	dispatch(addRows(5));
};

export const SET_PANEL_SIZE = 'SET_PANEL_SIZE';
export const setPanelSize = (size: number): GDAction => ({
	type: SET_PANEL_SIZE,
	payload: {
		size
	}
});

export const CHANGE_SMALL_SCREEN_VISIBLE_PANEL = 'CHANGE_SMALL_SCREEN_VISIBLE_PANEL';
export const changeSmallScreenVisiblePanel = (): GDAction => ({ type: CHANGE_SMALL_SCREEN_VISIBLE_PANEL });

export const checkPreviewPanelDependenciesLoaded = (): any => (dispatch: Dispatch, getState: any): void => {
	if (selectors.previewPanelDependenciesLoaded(getState())) {
		const shouldPopulate = selectors.shouldGeneratePreviewRows(getState());

		if (shouldPopulate) {
			const rowIds = selectors.getRowIds(getState());
			dispatch(refreshPreview(rowIds, setInitialDependenciesLoaded));
		} else {
			dispatch(setInitialDependenciesLoaded());
		}
	}
};

export const SET_INITIAL_DEPENDENCIES_LOADED = 'SET_INITIAL_DEPENDENCIES_LOADED';
export const setInitialDependenciesLoaded = (): GDAction => ({ type: SET_INITIAL_DEPENDENCIES_LOADED });

export const LOAD_DATA_SET = 'LOAD_DATA_SET';
export const loadDataSet = (dataSet: DataSetListItem): any => async (dispatch: Dispatch, getState: any): Promise<any> => {
	const { exportType, exportTypeSettings, rows, sortedRows } = JSON.parse(dataSet.content);

	const dataTypes = sortedRows.map((hash: string) => rows[hash].dataType).filter((dataType: DataTypeFolder | null) => dataType !== null);
	const uniqueDataTypes = getUnique(dataTypes);

	// load all the datasets and export type
	onSelectExportType(exportType);
	uniqueDataTypes.forEach((dataType: DataTypeFolder) => loadDataTypeBundle(dispatch, getState, dataType));

	dispatch({
		type: LOAD_DATA_SET,
		payload: {
			exportType,
			exportTypeSettings,
			rows,
			sortedRows,
			dataSetId: dataSet.dataSetId,
			dataSetName: dataSet.dataSetName
		}
	});
};
