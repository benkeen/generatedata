import React from 'react';
import { createSelector } from 'reselect';
import { processOrders, getDataTypeExports } from '../../utils/dataTypeUtils';
import { getExportTypePreview } from '../../utils/exportTypeUtils';
import { ColumnData, GDLocale, GenerationTemplate, Store } from '../../../types/general';
import { BuilderLayout } from '../../components/builder/Builder.component';
import { PreviewPanelLoader } from '../../components/previewPanel/PreviewPanelLoader.component';
import { DataRow } from './generator.reducer';
import { DataTypeFolder, ExportTypeFolder } from '../../_plugins';
import * as langUtils from '../../utils/langUtils';
import { getUnique } from '../../utils/arrayUtils';

export const getLocale = (state: Store): GDLocale => state.generator.locale;
export const localeFileLoaded = (state: Store): boolean => state.generator.localeFileLoaded;
export const getLoadedDataTypes = (state: Store): any => state.generator.loadedDataTypes;
export const getLoadedExportTypes = (state: Store): any => state.generator.loadedExportTypes;
export const getExportType = (state: Store): any => state.generator.exportType;
export const getRows = (state: Store): any => state.generator.rows;
export const getSortedRows = (state: Store): any[] => state.generator.sortedRows;
export const isGridVisible = (state: Store): boolean => state.generator.showGrid;
export const isPreviewVisible = (state: Store): boolean => state.generator.showPreview;
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

export const getNumRows = createSelector(
	getSortedRows,
	(rows) => rows.length
);

export const getSortedRowsArray = createSelector(
	getRows,
	getSortedRows,
	(rows, sorted) => sorted.map((id: string) => ({ ...rows[id], id }))
);

export const getNonEmptySortedRows = createSelector(
	getSortedRowsArray,
	(rows) => rows.filter((row: DataRow) => row.title.trim() !== '' && row.dataType !== null && row.dataType.trim() !== '')
);

export const getColumns = createSelector(
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
	getNonEmptySortedRows,
	getLoadedDataTypes, // yup, intentional! This ensures the selector will be re-ran after the data types are async loaded
	(rows): GenerationTemplate => {
		const templateByProcessOrder: ProcessOrders = {};
		rows.map(({ id, title, dataType, data }: any, colIndex: number) => {
			const processOrder = processOrders[dataType as DataTypeFolder] as number;
			const { generate, rowStateReducer } = getDataTypeExports(dataType);

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

		// TODO sort by process order (keys) here. Still need to figure that out
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
			const { getMetadata } = getDataTypeExports(dataType);
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
	getColumns,
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
	getLocale,
	(locale): any | null => {
		const strings = langUtils.getStrings(locale);
		return strings ? strings.core : null;
	}
);

export const getDataTypeI18n = createSelector(
	getLocale,
	(locale): any | null => {
		const strings = langUtils.getStrings(locale);
		return strings ? strings.dataTypes : null;
	}
);

export const getExportTypeI18n = createSelector(
	getLocale,
	(locale): any | null => {
		const strings = langUtils.getStrings(locale);
		return strings ? strings.exportTypes : null;
	}
);

