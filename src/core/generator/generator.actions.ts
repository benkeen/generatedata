import { Dispatch } from 'redux'; // 236 lines before redux-toolkit refactor [REMOVE comment]
import { createAction } from '@reduxjs/toolkit';
import { GDLocale } from '../../../types/general';
import * as selectors from './generator.selectors';
import { generatePreviewData } from './generator';
import { ExportSettingsTab } from '../../components/exportSettings/ExportSettings.types';
import { DataTypeFolder, ExportTypeFolder } from '../../_plugins';
import { loadDataTypeBundle } from '../../utils/dataTypeUtils';
import { loadExportTypeBundle } from '../../utils/exportTypeUtils';
import { DTBundle } from '../../../types/dataTypes';
import { ThunkDispatch } from 'redux-thunk';
import * as langUtils from '../../utils/langUtils';
import C from '../../core/constants';

export const addRows = createAction<number>('ADD_ROWS');
export const removeRow = createAction<string>('REMOVE_ROW');

export type ChangeTitleType = {
	id: string;
	value: string;
}
export const onChangeTitle = createAction<ChangeTitleType>('CHANGE_TITLE');
export const configureExportType = createAction<any>('CONFIGURE_EXPORT_TYPE');

export type RepositionRowType = {
	id: string;
	newIndex: number;
};
export const repositionRow = createAction<RepositionRowType>('REPOSITION_ROW');
export const toggleGrid = createAction('TOGGLE_GRID');
export const togglePreview = createAction('TOGGLE_PREVIEW');
export const toggleLayout = createAction('TOGGLE_LAYOUT');
export const updateNumPreviewRows = createAction<number>('UPDATE_NUM_PREVIEW_ROWS');
export const changeTheme = createAction<string>('CHANGE_THEME');
export const toggleShowRowNumbers = createAction('TOGGLE_SHOW_ROW_NUMBERS');
export const toggleLineWrapping = createAction('TOGGLE_LINE_WRAPPING');
export const setPreviewTextSize = createAction<number>('SET_PREVIEW_TEXT_SIZE');
export const toggleExportSettings = createAction<ExportSettingsTab | undefined>('TOGGLE_EXPORT_SETTINGS');
export const setLocaleFileLoaded = createAction<GDLocale>('LOCALE_FILE_LOADED');

export type ExportTypeLoadedType = {
	exportType: ExportTypeFolder;
	initialState: any;
}
export const exportTypeLoaded = createAction<ExportTypeLoadedType>('EXPORT_TYPE_LOADED');
export const dataTypeLoaded = createAction<DataTypeFolder>('DATA_TYPE_LOADED');
export const showGenerationPanel = createAction('SHOW_GENERATION_PANEL');
export const hideGenerationPanel = createAction('HIDE_GENERATION_PANEL');
export const updateNumGenerationRows = createAction<number>('UPDATE_NUM_GENERATION_ROWS');
export const toggleStripWhitespace = createAction('TOGGLE_STRIP_WHITESPACE');
export const generateData = createAction('GENERATE_DATA');

// ------------------------------------------------

export const SELECT_DATA_TYPE = 'SELECT_DATA_TYPE';
export const onSelectDataType = (id: any, dataType: DataTypeFolder): any => {
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
				dispatch(dataTypeLoaded(dataType));
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

export const REFRESH_PREVIEW_DATA = 'REFRESH_PREVIEW_DATA';

// make this the ONLY place that re-generates the preview panel data. This doesn't have to be called on boot-up because
// the preview data is generated on the fly, saved in the store and rehydrated when the app loads
export const refreshPreview = (idsToRefresh: string[] = []): any => {
	return (dispatch: any, getState: any): any => {
		const state = getState();
		const template = selectors.getGenerationTemplate(state);
		const sortedRows = selectors.getSortedRows(state);

		const data = generatePreviewData({
			numResults: C.MAX_PREVIEW_ROWS,
			columns: selectors.getColumns(state),
			template
		});
		const previewData: any = {};
		sortedRows.forEach((id: string, index: number) => {
			if (idsToRefresh.length && idsToRefresh.indexOf(id) === -1) {
				return;
			}
			previewData[id] = data.map((row: any): any => row[index]);
		});

		dispatch({
			type: REFRESH_PREVIEW_DATA,
			payload: {
				previewData
			}
		});
	};
};

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
				dispatch(exportTypeLoaded({ exportType, initialState: bundle.initialState }));
			});
	};
};

export const selectLocale = (locale: GDLocale) => {
	return (dispatch: ThunkDispatch<any, any, any>): any => {
		window.gd = {};
		window.gd.localeLoaded = (strings: any): void => {
			langUtils.setLocale(locale, strings);
			dispatch(setLocaleFileLoaded(locale));
		};
		const s = document.createElement('script');
		s.src = `./${locale}.js`;
		document.body.appendChild(s);
	};
};

export const loadDataTypeBundleAndUpdateStore = (dataType: DataTypeFolder): any => (dispatch: Dispatch) => (
	loadDataTypeBundle(dataType)
		.then(() => {
			dispatch(dataTypeLoaded(dataType));
		})
);

