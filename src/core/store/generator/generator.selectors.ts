import { createSelector } from 'reselect';
import { BuilderLayout } from '../../builder/Builder.component';
import { PreviewPanelLoader } from '../../previewPanel/PreviewPanelLoader.component';
import { DataRow, DataRows, GeneratorPanel } from './generator.reducer';
import { DataTypeFolder, ExportTypeFolder } from '../../../_plugins';
import * as mainSelectors from '../main/main.selectors';
import * as langUtils from '~utils/langUtils';
import { getUnique } from '~utils/arrayUtils';
import { processBatches, getDataType } from '~utils/dataTypeUtils';
import { getExportTypePreview, getExportTypeLabel as exportTypeUtilsGetExportTypeLabel } from '~utils/exportTypeUtils';
import { ColumnData, GenerationTemplate, Store } from '~types/general';

export const getLoadedDataTypes = (state: Store): any => state.generator.loadedDataTypes;
export const getLoadedExportTypes = (state: Store): any => state.generator.loadedExportTypes;
export const getExportType = (state: Store): ExportTypeFolder => state.generator.exportType;
export const getRows = (state: Store): DataRows => state.generator.rows;
export const getSortedRows = (state: Store): string[] => state.generator.sortedRows;
export const isGridVisible = (state: Store): boolean => state.generator.showGrid;
export const isPreviewVisible = (state: Store): boolean => state.generator.showPreview;
export const getSmallScreenVisiblePanel = (state: Store): GeneratorPanel => state.generator.smallScreenVisiblePanel;
export const getBuilderLayout = (state: Store): BuilderLayout => state.generator.builderLayout;
export const getNumPreviewRows = (state: Store): number => state.generator.numPreviewRows;
export const shouldShowRowNumbers = (state: Store): boolean => state.generator.showRowNumbers;
export const shouldEnableLineWrapping = (state: Store): boolean => state.generator.enableLineWrapping;
export const getTheme = (state: Store): string => state.generator.theme;
export const getPreviewTextSize = (state: Store): number => state.generator.previewTextSize;
export const getGeneratedPreviewData = (state: Store): any => state.generator.generatedPreviewData;
export const shouldShowExportSettings = (state: Store): any => state.generator.showExportSettings;
export const getExportTypeSettings = (state: Store): any => state.generator.exportTypeSettings;
export const getExportSettingsTab = (state: Store): any => state.generator.exportSettingsTab;
export const isGenerationPanelVisible = (state: Store): any => state.generator.showGenerationPanel;
export const getNumGenerationRows = (state: Store): number => state.generator.numGenerationRows;
export const getLastLayoutWidth = (state: Store): number | null => state.generator.lastLayoutWidth;
export const getLastLayoutHeight = (state: Store): number | null => state.generator.lastLayoutHeight;

export const getNumRows = createSelector(
	getSortedRows,
	(rows) => rows.length
);

export const getSortedRowsArray = createSelector(
	getRows,
	getSortedRows,
	(rows, sorted) => sorted.map((id: string) => ({ ...rows[id], id }))
);

export const getTitles = createSelector(
	getSortedRowsArray,
	(rows) => rows.map(({ title }) => title)
);

export const getNonEmptySortedRows = createSelector(
	getSortedRowsArray,
	(rows) => rows.filter((row: DataRow) => row.title.trim() !== '' && row.dataType !== null && row.dataType.trim() !== '')
);

export const getSortedRowsWithDataTypeSelected = createSelector(
	getSortedRowsArray,
	(rows) => rows.filter((row: DataRow) => row.dataType !== null && row.dataType.trim() !== '')
);

// returns everything in the grid where a data type has been selected
export const getColumns = createSelector(
	getSortedRowsWithDataTypeSelected,
	(rows): ColumnData[] => {
		return rows.filter((row: DataRow) => row.dataType !== null && row.dataType.trim() !== '')
			.map(({ dataType, title }: any) => ({
				title,
				dataType
			}));
	}
);

export const getPreviewColumns = createSelector(
	getNonEmptySortedRows,
	(rows): ColumnData[] => (
		rows.map(({ dataType, title }: any) => ({
			title,
			dataType
		}))
	)
);

export const getRowDataTypes = createSelector(
	getRows,
	(rows) => (
		Object.keys(rows).filter((id: string) => rows[id].dataType !== null).map((id: string) => rows[id].dataType)
	)
);

export const getPreviewData = createSelector(
	getNumPreviewRows,
	getNonEmptySortedRows,
	getGeneratedPreviewData,
	(numPreviewRows, rows, data) => {
		const numRows = rows.length;
		const formattedData: any[] = [];

		for (let j=0; j<numPreviewRows; j++) {
			const rowData = [];
			for (let i=0; i<numRows; i++) {
				const id = rows[i].id;
				// this occurs when a new row is first added. The data is generated AFTERWARDS (see logic in onSelectDataType() action)
				if (!data[id]) {
					continue;
				}
				rowData.push(data[id][j]);
			}

			if (rowData.length) {
				formattedData.push(rowData);
			}
		}
		return formattedData;
	}
);

type ProcessOrders = {
	[num: number]: any;
};

export const getGenerationTemplate = createSelector(
	getSortedRowsWithDataTypeSelected,
	getLoadedDataTypes, // yup, intentional! This ensures the selector will be re-ran after the data types are async loaded
	(rows): GenerationTemplate => {
		const templateByProcessOrder: ProcessOrders = {};
		rows.map(({ id, title, dataType, data }: any, colIndex: number) => {
			const processOrder = processBatches[dataType as DataTypeFolder] as number;
			const { generate, rowStateReducer } = getDataType(dataType);

			if (!templateByProcessOrder[processOrder]) {
				templateByProcessOrder[processOrder] = [];
			}

			templateByProcessOrder[processOrder].push({
				id,
				title,
				dataType,
				colIndex,

				// settings for the DT cell. The rowStateReducer is optional: it lets developers convert the Data Type row
				// state into something friendlier for the generation step
				rowState: rowStateReducer ? rowStateReducer(data) : data,
				generateFunc: generate
			});
		});

		return templateByProcessOrder;
	}
);

export const getUniqueSelectedDataTypes = createSelector(
	getSortedRowsArray,
	(rows) => getUnique(rows.map((i: any): DataTypeFolder => i.dataType)).filter((i => i !== null))
);

export const getSelectedColumnDataTypeMetadata = createSelector(
	getUniqueSelectedDataTypes,
	getLoadedDataTypes, // yup, intentional! This ensures the selector will be re-ran after the data types are async loaded
	(dataTypes) => {
		const dataTypeMetadata: any = {};
		dataTypes.forEach((dataType: DataTypeFolder) => {
			const { getMetadata } = getDataType(dataType);
			dataTypeMetadata[dataType] = getMetadata ? getMetadata() : null;
		});
		return dataTypeMetadata;
	}
);

/**
 * This returns everything that the Export Type need to render the content of their preview panel: column info,
 * generated row data, data type metadata,
 */
export const getPreviewPanelData = createSelector(
	getPreviewColumns,
	getPreviewData,
	getSelectedColumnDataTypeMetadata,
	(columns, rows, dataTypeMetadata) => ({
		isFirstBatch: true,
		isLastBatch: true,
		columns,
		rows,
		dataTypeMetadata
	})
);

/**
 * Returns one of the following:
 * - the Export Type's preview component, assuming its loaded.
 */
export const getExportTypePreviewComponent = createSelector(
	getExportType,
	getLoadedExportTypes,
	(exportType, loadedExportTypes): any => {
		if (loadedExportTypes[exportType as ExportTypeFolder]) {
			return getExportTypePreview(exportType);
		}
		return PreviewPanelLoader;
	}
);

export const getCoreI18n = createSelector(
	mainSelectors.getLocale,
	(locale): any | null => {
		const strings = langUtils.getStrings(locale);
		return strings ? strings.core : null;
	}
);

export const getCountryI18n = createSelector(
	mainSelectors.getLocale,
	(locale): any | null => {
		const strings = langUtils.getStrings(locale);
		return strings ? strings.countries : null;
	}
);

export const getDataTypeI18n = createSelector(
	mainSelectors.localeFileLoaded,
	mainSelectors.getLocale,
	(localeFileLoaded, locale): any | null => {
		if (!localeFileLoaded) {
			return null;
		}
		const strings = langUtils.getStrings(locale);
		return strings ? strings.dataTypes : null;
	}
);

export const getExportTypeI18n = createSelector(
	mainSelectors.getLocale,
	getExportType,
	(locale, exportType): any | null => {
		const strings = langUtils.getStrings(locale);
		return strings ? strings.exportTypes[exportType] : null;
	}
);

export const getExportTypeColumnTitle = createSelector(
	getExportTypeI18n,
	(i18n) => i18n.COL_TITLE
);


// Export Types can optionally override the label that appears in the Preview panel. For example, instead of
// just showing "Programming Language", they can show "PHP" or "Programming Language: Perl" or whatever they
// want. By default it'll just show the localized Export Type name
// TODO: need validation on the export type to confirm `EXPORT_TYPE_NAME` exists. Perhaps a separate grunt `validate` task
// that's integrated into the build process to prevent incomplete/invalid bundles from being included
export const getExportTypeLabel = createSelector(
	getExportType,
	getExportTypeSettings,
	getExportTypeI18n,
	getLoadedExportTypes,
	(exportType, exportTypeSettings, i18n, loadedExportTypes): string => {
		if (loadedExportTypes[exportType]) {
			const etSettings = exportTypeSettings[exportType];
			const label = exportTypeUtilsGetExportTypeLabel(exportType, etSettings);
			if (label) {
				return label;
			}
		}
		return i18n.EXPORT_TYPE_NAME;
	}
);
