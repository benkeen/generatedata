import * as selectors from './generator.selectors';
import { ExportSettingsTab } from '../../exportSettings/ExportSettings.types';
import { DataTypeFolder, ExportTypeFolder } from '../../../_plugins';
import { requestDataTypeBundle } from '~utils/dataTypeUtils';
import { getUniqueString } from '~utils/stringUtils';
import { loadExportTypeBundle } from '~utils/exportTypeUtils';
import * as coreUtils from '~utils/coreUtils';
import { registerInterceptors } from '../../actionInterceptor';
import { getStrings } from '~utils/langUtils';
import { DTBundle } from '~types/dataTypes';
import { GDAction } from '~types/general';
import C from '../../constants';
import { Dispatch } from 'redux';

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
	const dataTypeWorker = coreUtils.getDataTypeWorker();

	return (dispatch: any, getState: any): any => {
		const state = getState();
		const template = selectors.getGenerationTemplate(state);
		const dataTypePreviewData = selectors.getDataTypePreviewData(state);
		const sortedRows = selectors.getSortedRows(state);
		const columns = selectors.getColumns(state);

		// here we DO need to generate the data independently of the final string in the appropriate export type format.
		// That allows us to tease out what changes on each keystroke in the UI and only refresh specific fields - it's
		// way clearer to the end user that way
		dataTypeWorker.postMessage({
			numResults: C.MAX_PREVIEW_ROWS,
			batchSize: C.MAX_PREVIEW_ROWS,
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

export const SHOW_GENERATION_PANEL = 'SHOW_GENERATION_PANEL';
export const showGenerationPanel = (): GDAction => ({ type: SHOW_GENERATION_PANEL });

export const HIDE_GENERATION_PANEL = 'HIDE_GENERATION_PANEL';
export const hideGenerationPanel = (): GDAction => ({ type: HIDE_GENERATION_PANEL });

export const UPDATE_NUM_ROWS_TO_GENERATE = 'UPDATE_NUM_ROWS_TO_GENERATE';
export const updateNumRowsToGenerate = (numRowsToGenerate: number): GDAction => ({
	type: UPDATE_NUM_ROWS_TO_GENERATE,
	payload: {
		numRowsToGenerate
	}
});

export const TOGGLE_STRIP_WHITESPACE = 'TOGGLE_STRIP_WHITESPACE';
export const toggleStripWhitespace = (): GDAction => ({ type: TOGGLE_STRIP_WHITESPACE });

export const START_GENERATION = 'START_GENERATION';
export const startGeneration = (): any => (dispatch: Dispatch, getState: any): void => {
	dispatch({ type: START_GENERATION });

	const state = getState();
	const template = selectors.getGenerationTemplate(state);
	const numRowsToGenerate = selectors.getNumRowsToGenerate(state);

	// TODO this will now be getCoreWorker & pass in everything needed for both the data type worker & export type worker,
	// where the ENTIRE generation will run in a separate thread
	const coreWorker = coreUtils.getCoreWorker();

	coreWorker.postMessage({
		numResults: numRowsToGenerate,
		batchSize: C.GENERATION_BATCH_SIZE,
		columns: selectors.getColumns(state),
		i18n: getStrings(),
		template,
		workerResources: {
			workerUtils: coreUtils.getWorkerUtils(),
			dataTypes: coreUtils.getDataTypeWorkerMap(selectors.getRowDataTypes(state) as DataTypeFolder[]),
			exportTypes: coreUtils.getExportTypeWorkerMap(selectors.getLoadedExportTypes(state))
		}
	});

	coreWorker.onmessage = (response: any): void => {
		const { numGeneratedRows } = response.data; // data, completedBatchNum, isComplete
		dispatch(updateGeneratedRowsCount(numGeneratedRows));

		// dispatch(setBatchGeneratedComplete());
	};
};


export const UPDATE_GENERATED_ROWS_COUNT = 'UPDATE_GENERATED_ROWS_COUNT';
export const updateGeneratedRowsCount = (numGeneratedRows: number): GDAction => ({
	type: UPDATE_GENERATED_ROWS_COUNT,
	payload: {
		numGeneratedRows
	}
});

export const CANCEL_GENERATION = 'CANCEL_GENERATION';
export const cancelGeneration = (): GDAction => ({ type: CANCEL_GENERATION });

export const CLEAR_GRID = 'CLEAR_GRID';
export const clearGrid = (): any => (dispatch: Dispatch): void => {
	dispatch({ type: CLEAR_GRID });
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
