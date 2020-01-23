import { createSelector } from 'reselect';
import { getGenerationOptionsByDataType } from '../../utils/dataTypeGenerationUtils';
import { getDataTypeProcessOrders } from '../../utils/dataTypeUtils';
import { GenerationTemplate } from '../../../types/general';
import { BuilderLayout } from '../../components/builder/Builder.component';

export const getRows = (state: any): any => state.generator.rows;
export const getSortedRows = (state: any): any[] => state.generator.sortedRows;
export const isGridVisible = (state: any): boolean => state.generator.showGrid;
export const isPreviewVisible = (state: any): boolean => state.generator.showPreview;
export const getBuilderLayout = (state: any): BuilderLayout => state.generator.builderLayout;
export const getNumPreviewRows = (state: any): number => state.generator.numPreviewRows;
export const shouldShowRowNumbers = (state: any): boolean => state.generator.showRowNumbers;
export const getTheme = (state: any): string => state.generator.theme;
export const getPreviewTextSize = (state: any): number => state.generator.previewTextSize;

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
	(rows) => rows.filter((row: any) => row.dataType !== null)
);

export const getColumnTitles = createSelector(
	getSortedRowsArray,
	(rows) => rows.filter((row: any) => row.dataType !== null && row.title !== '').map((row: any) => row.title)
);


// TODO need to sort this out now!! We need this immediately as the user selects
// this will be in a separate bundle loaded async along with the export, dataType + country generation code
export const getGenerationTemplate = createSelector(
	getNonEmptySortedRows,
	(rows): GenerationTemplate => {
		const processOrders = getDataTypeProcessOrders();

		const templateByProcessOrder: any = {};
		rows.map(({ title, dataType, data }: any, colIndex: number) => {
			const processOrder = processOrders[dataType];

			// TODO another assumption here. We need to validate the whole component right-up front during the
			// build step and throw a nice error saying what's missing
			const { generate, getMetadata, rowStateReducer } = getGenerationOptionsByDataType(dataType);

			if (!templateByProcessOrder[processOrder]) {
				templateByProcessOrder[processOrder] = [];
			}

			templateByProcessOrder[processOrder].push({
				title,
				dataType,
				colIndex,

				// settings for the DT cell. The rowStateReducer is optional: it lets developers convert the Data Type row 
				// state into something friendlier for the generation step
				rowState: rowStateReducer ? rowStateReducer(data) : data,

				// DT methods for the actual generation of this cell
				generateFunc: generate,
				colMetadata: getMetadata ? getMetadata() : null
			});
		});

		// TODO sort by process order (keys) here

		return templateByProcessOrder;
	}
);
