import { ColumnData, ExportTypeGenerationData } from '../../types/general';

export const getNumericFieldColumnIndexes = (generationData: ExportTypeGenerationData): number[] => {
	const dataTypeMap: any = {};
	const dt = generationData.dataTypeMetadata;
	Object.keys(dt).forEach((dataType) => {
		if (dt[dataType] && dt[dataType].general && dt[dataType].general.dataType) {
			dataTypeMap[dataType] = dt[dataType].general.dataType;
		}
	});

	const numericFieldColIndexes: number[] = [];
	generationData.columns.forEach((col: ColumnData, colIndex: number) => {
		console.log(dataTypeMap[col.dataType]);
		if (dataTypeMap[col.dataType] === 'number') {
			numericFieldColIndexes.push(colIndex);
		}
	});

	return numericFieldColIndexes;
};
