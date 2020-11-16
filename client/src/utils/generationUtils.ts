import { ColumnData } from '~types/general';
import { ETMessageData } from '~types/exportTypes';

export const getNumericFieldColumnIndexes = (data: ETMessageData): number[] => {
	const numericFieldColIndexes: number[] = [];

	data.columns.forEach((col: ColumnData, colIndex: number) => {
		const { metadata } = col;

		// I think there's a bug here. Metadata isn't defined for a List column.
		if (!metadata) {
			return;
		}

		const dataType = metadata.general && metadata.general.dataType;

		if (dataType === 'number') {
			numericFieldColIndexes.push(colIndex);
		}
	});

	return numericFieldColIndexes;
};
