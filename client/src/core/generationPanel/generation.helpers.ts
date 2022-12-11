import { ColumnData, GenerationActivityPanel, LoadTimeGraphDuration } from '~types/general';
import { affectedDataTypes } from '~utils/dataTypeUtils';
import C from '../constants';
import { UnchangedGenerationData } from '~types/generator';

export const getPercentageLabel = (percentage: number, numRowsToGenerate: number): string => {
	let decimalPlaces = 0;
	if (numRowsToGenerate >= 1000000) {
		decimalPlaces = 2;
	} else if (numRowsToGenerate >= 10000) {
		decimalPlaces = 1;
	}
	return percentage.toFixed(decimalPlaces);
};

export const getByteSize = (str: string): number => encodeURI(str).split(/%(?:u[0-9A-F]{2})?[0-9A-F]{2}|./).length - 1;

export const downloadFile = (filename: string, data: any, type: string): void => {
	const file = new Blob([data], { type: type });
	const a = document.createElement('a');
	const url = URL.createObjectURL(file);
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();

	setTimeout(() => {
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
	}, 0);
};


type secondCount = {
	[second: number]: number;
}

// used in the stats generation. This does the job of figuring out the row generation rate per second. It returns
// an object of the following form:
//   {
//         4: 30
//         5: 50
//         6: 14
//   }
// where the keys are a particular second, and the values are the number of rows generated for that second. It's up to the
// consuming script to append that data to existing generated data. Note that since the start/end times for the generation
// block almost certainly don't lie directly on the start second, second #4 would already have some number from the
// previous batch
export const getRowGenerationRatePerSecond = (
	// this is the time the entire generation started. It'll remain fixed for an entire packet
	baseTime: number,

	// the time the batch was started
	batchStartTime: number,

	// the time this batch stopped generating
	batchEndTime: number,

	// how many rows were generated during the interval (will always be C.GENERATION_BATCH_SIZE)
	numRows: number
): secondCount => {

	// the math below relies on this being correct otherwise we'll get stuck in an infinite loop
	if (batchEndTime <= batchStartTime) {
		throw Error('invalid data passed to getRowGenerationRatePerSecond()');
	}

	// calculate the time duration of a single row over the time duration
	const singleRowTime = (batchEndTime - batchStartTime) / numRows;

	// now split the duration into discrete seconds, and loop over them, figuring out how many would
	let currTimeBlock = batchStartTime;
	let currentSecond;
	const result: secondCount = {};

	while (true) {
		const endOfCurrentSecondMs = Math.floor(Math.floor(currTimeBlock / 1000) * 1000) + 1000;

		let secondDuration;
		let shouldBreak = false;
		if (endOfCurrentSecondMs >= batchEndTime) {
			secondDuration = batchEndTime - currTimeBlock;
			shouldBreak = true;
		} else {
			secondDuration = endOfCurrentSecondMs - currTimeBlock;
		}

		// now see how many of the rows could fit into this duration
		const numRowsInCurrentDuration = secondDuration / singleRowTime;

		const currentSecondMs = Math.floor(currTimeBlock - baseTime);
		currentSecond = ((currentSecondMs === 0) ? 0 : Math.floor(currentSecondMs / 1000)) + 1;
		result[currentSecond] = parseFloat(numRowsInCurrentDuration.toFixed(2));

		if (shouldBreak) {
			break;
		}

		currTimeBlock += secondDuration;
	}

	return result;
};


/*
 * Used for the preview panel only. When a user changes a row we need to figure out what rows to invalidate in the preview
 * panel. Examples:
 *  - A row change only affects itself. Just that row should be updated, all other rows can be marked as unchanged.
 *  - A region row changes, and a city row depends on it. Here, both the region + city rows need to refresh.
 *  - A county row changes, and 10 other rows are based on it. All 11 rows need to update.
 *
 * Note that this isn't as good as it could be. If a Region field changes, ALL City field get repainted - even if they're
 * not mapped to the region that just changed. This is because we're not yet formally defining the relationships
 * between the Data Types in a well-defined way. If we did that we could make this logic smarter. But right now, each
 * data type maps to other data types in whatever way they find useful (e.g. a Composite field just referencing it
 * via its Options field and entering a {{ROWX}} placeholder string).
 */
export const getUnchangedData = (idsToRefresh: string[], columns: (ColumnData & { id: string })[] , dataTypePreviewData: any): UnchangedGenerationData => {
	if (!idsToRefresh.length) {
		return {};
	}

	const columnsWithIndex = columns.map((col, colIndex) => ({ ...col, colIndex }));

	// first pass is to look at the list of IDs about to be refreshed, and get a list of data types in the
	// grid that aren't affected by this change
	const unchangedDataTypes: any = {};
	columnsWithIndex
		.filter((col) => idsToRefresh.indexOf(col.id) === -1)
		.forEach((col) => {
			unchangedDataTypes[col.dataType] = true;
		});

	// now loop through the changed row IDs and whittle down the list by examining any data types affected by those
	// row changes
	columnsWithIndex.forEach((col) => {
		if (idsToRefresh.indexOf(col.id) !== -1) {
			affectedDataTypes[col.dataType].forEach((dt: any) => {
				if (unchangedDataTypes[dt]) {
					delete unchangedDataTypes[dt];
				}
			});
		}
	});

	const result: any = {};
	columnsWithIndex.filter((col) => {
		// just for clarity, because this is kinda dense
		const colIsNotAffectedDataType = unchangedDataTypes[col.dataType];
		const isNotDirectlyChangedCol = idsToRefresh.indexOf(col.id) === -1;

		return colIsNotAffectedDataType && isNotDirectlyChangedCol;
	}).map((col) => {
		result[col.colIndex] = dataTypePreviewData[col.id];
	});

	return result;
};


export const getGenerationActivityPanel = (numRowsToGenerate: number): GenerationActivityPanel => {
	return (numRowsToGenerate > C.SMALL_GENERATION_COUNT) ? GenerationActivityPanel.large : GenerationActivityPanel.small;
};


export const getGraphDuration = (numRowsToGenerate: number): LoadTimeGraphDuration => {
	if (numRowsToGenerate < C.GRAPH_RANGES.RANGE1) {
		return LoadTimeGraphDuration.all;
	} else if (numRowsToGenerate < C.GRAPH_RANGES.RANGE2) {
		return LoadTimeGraphDuration.s15;
	} else if (numRowsToGenerate < C.GRAPH_RANGES.RANGE3) {
		return LoadTimeGraphDuration.s30;
	}

	return LoadTimeGraphDuration.m1;
};
