import { createReducer } from '@reduxjs/toolkit';
import { generate } from 'shortid';
// @ts-ignore-line
import config from '../../../build/config.client';
import * as actions from './generator.actions';
import { BuilderLayout } from '../../components/builder/Builder.component';
import { ExportSettingsTab } from '../../components/exportSettings/ExportSettings.types';
import { DataTypeFolder, ExportTypeFolder } from '../../_plugins';
import { GDLocale } from '../../../types/general';
import { dataTypeNames } from '../../utils/dataTypeUtils';
import { exportTypeNames } from '../../utils/exportTypeUtils';

export type DataRow = {
	id: string;
	title: string;
	dataType: string | null;
	data: any;
};

export type DataRows = {
	[id: string]: DataRow;
};

export type PreviewData = {
	[id: string]: any[];
};

// we store all settings separately so in case a user switches from one to another, the previous settings aren't
// wiped out
export type ExportTypeSettings = {
	[exportType in ExportTypeFolder]: any;
}

export type GeneratorState = {
	localeFileLoaded: boolean;
	locale: GDLocale;
	loadedDataTypes: {
		[str in DataTypeFolder]: boolean;
	};
	loadedExportTypes: {
		[str in ExportTypeFolder]: boolean;
	};
	exportType: string;
	rows: DataRows;
	sortedRows: string[];
	showGrid: boolean;
	showPreview: boolean;
	builderLayout: BuilderLayout;
	showExportSettings: boolean;
	exportTypeSettings: Partial<ExportTypeSettings>;
	showGenerationPanel: boolean;
	showRowNumbers: boolean;
	enableLineWrapping: boolean;
	theme: string;
	previewTextSize: number;
	generatedPreviewData: PreviewData;
	exportSettingsTab: ExportSettingsTab;
	numGenerationRows: number;
	numPreviewRows: number;
	stripWhitespace: boolean;
};

const defaultState = {
	localeFileLoaded: false,
	locale: 'en' as GDLocale,
	loadedDataTypes: dataTypeNames.reduce((acc: any, name: DataTypeFolder) => ({ ...acc, [name]: false }), {}),
	loadedExportTypes: exportTypeNames.reduce((acc: any, name: ExportTypeFolder) => ({ ...acc, [name]: false }), {}),
	exportType: config.defaultExportType,
	rows: {},
	sortedRows: [] as string[],
	showGrid: true,
	showPreview: true,
	builderLayout: 'horizontal' as BuilderLayout,
	showExportSettings: false,
	exportTypeSettings: {},
	numPreviewRows: 5,
	showRowNumbers: false,
	enableLineWrapping: true,
	theme: 'lucario',
	previewTextSize: 12,
	generatedPreviewData: {},
	exportSettingsTab: 'exportType' as ExportSettingsTab,
	showGenerationPanel: false,
	numGenerationRows: 100,
	stripWhitespace: false
};

/**
 * This houses the content of the generator. The actual content of each row is dependent based on the
 * Data Type: they can choose to store whatever info in whatever format they want. So this is kind of like a frame.
 */
const reducer = createReducer(defaultState, (builder) => {
	builder.addCase(actions.setLocaleFileLoaded, (state, action) => ({
		...state,
		locale: action.payload,
		localeFileLoaded: true
	}));

	builder.addCase(actions.dataTypeLoaded, (state, action) => ({
		...state,
		loadedDataTypes: {
			...state.loadedDataTypes,
			[action.payload]: true
		}
	}));

	builder.addCase(actions.onChangeTitle, (state, action) => {
		const rows = state.rows as DataRows;
		return {
			...state,
			rows: {
				...state.rows,
				[action.payload.id]: {
					...rows[action.payload.id],
					title: action.payload.value
				}
			}
		};
	});

	builder.addCase(actions.removeRow, (state, action) => {
		const trimmedRowIds = state.sortedRows.filter((i) => i !== action.payload);
		const updatedRows: DataRows = {};
		const rows = state.rows as DataRows;
		trimmedRowIds.forEach((id: string) => {
			updatedRows[id] = rows[id];
		});
		return {
			...state,
			rows: updatedRows,
			sortedRows: trimmedRowIds
		};
	});

	builder.addCase(actions.configureExportType, (state, action) => ({
		...state,
		exportTypeSettings: {
			...state.exportTypeSettings,
			[state.exportType]: action.payload
		}
	}));

	builder.addCase(actions.repositionRow, (state, action) => {
		const newArray = state.sortedRows.filter((i) => i !== action.payload.id);
		newArray.splice(action.payload.newIndex, 0, action.payload.id);
		return {
			...state,
			sortedRows: newArray
		};
	});

	builder.addCase(actions.toggleGrid, (state) => {
		const newState = {
			...state,
			showGrid: !state.showGrid
		};
		if (!state.showPreview) {
			newState.showPreview = true;
		}
		return newState;
	});

	builder.addCase(actions.toggleLayout, (state) => ({
		...state,
		builderLayout: state.builderLayout === 'horizontal' ? 'vertical' : 'horizontal'
	}));

	builder.addCase(actions.togglePreview, (state) => {
		const newState = {
			...state,
			showPreview: !state.showPreview
		};
		if (!state.showGrid) {
			newState.showGrid = true;
		}
		return newState;
	});

	builder.addCase(actions.updateNumPreviewRows, (state, action) => ({
		...state,
		numPreviewRows: action.payload
	}));

	builder.addCase(actions.changeTheme, (state, action) => ({
		...state,
		theme: action.payload
	}));

	builder.addCase(actions.toggleShowRowNumbers, (state) => ({
		...state,
		showRowNumbers: !state.showRowNumbers
	}));

	builder.addCase(actions.toggleLineWrapping, (state) => ({
		...state,
		enableLineWrapping: !state.enableLineWrapping
	}));

	builder.addCase(actions.setPreviewTextSize, (state, action) => ({
		...state,
		previewTextSize: action.payload
	}));

	builder.addCase(actions.toggleExportSettings, (state, action) => {
		const newState = {
			...state,
			showExportSettings: !state.showExportSettings
		};
		if (action.payload) {
			newState.exportSettingsTab = action.payload;
		}
		return newState;
	});

	builder.addCase(actions.exportTypeLoaded, (state, action) => ({
		...state,
		loadedExportTypes: {
			...state.loadedExportTypes,
			[action.payload.exportType]: true
		},
		exportTypeSettings: {
			...state.exportTypeSettings,
			[action.payload.exportType]: action.payload.initialState
		}
	}));

	builder.addCase(actions.showGenerationPanel, (state) => ({
		...state,
		showGenerationPanel: true
	}));

	builder.addCase(actions.updateNumGenerationRows, (state, action) => ({
		...state,
		numGenerationRows: action.payload
	}));

	builder.addCase(actions.toggleStripWhitespace, (state) => ({
		...state,
		stripWhitespace: !state.stripWhitespace
	}));

	builder.addCase(actions.generateData, (state) => ({
		...state,
		stripWhitespace: !state.stripWhitespace
	}));

	builder.addCase(actions.addRows, (state, action) => {
		const newRows: DataRows = {};
		const newRowIDs: string[] = [];
		for (let i = 0; i < action.payload; i++) {
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
	});
});

/*
		case actions.SELECT_DATA_TYPE: {
			const { id, value, data } = action.payload;
			return {
				...state,
				rows: {
					...state.rows,
					[id]: {
						...state.rows[id],
						dataType: value,
						data
					}
				}
			};
		}

		case actions.SELECT_EXPORT_TYPE: {
			return {
				...state,
				exportType: action.payload.exportType
			};
		}

		case actions.REFRESH_PREVIEW_DATA: {
			return {
				...state,
				generatedPreviewData: {
					...state.generatedPreviewData,
					...action.payload.previewData
				}
			};
		}

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

		case actions.HIDE_GENERATION_PANEL:
			return {
				...state,
				showGenerationPanel: false
			};

		default:
			return state;
	}
};
*/

export default reducer;
