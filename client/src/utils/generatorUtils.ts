import { DataTypeFolder } from '../../_plugins';

/**
 * This utility file contains the guts of the data generation code. It farms out work to the various plugins
 * and orchestrates the many independent tasks to gather together and return the data. It's used by both:
 *    1. the UI, called via web workers to run performantly in browsers in separate threads off the main UI thread
 *    2. the node script for server-side data generation
 */

let isPaused = false;
let onContinueData: any = null;
let currentSpeed: number; // TODO possible range?

let countryData: any;
let workerUtils: any;
let onBatchComplete: any;
let dataTypeInterface: any;

const workerQueue: any = {};

// TODO
export interface GenerateDataTypes {
	(settings: any): void;
}

const generateDataTypes: GenerateDataTypes = ({
	numResults, batchSize, unchanged, columns, i18n, template, countryNames, ...other
}): void => {
	const numBatches = Math.ceil(numResults / batchSize);

	onBatchComplete = other.onBatchComplete;
	dataTypeInterface = other.dataTypeInterface;
	countryData = other.countryData;
	workerUtils = other.workerUtils;

	mainProcess(numResults, numBatches, batchSize, 1, template, unchanged || {}, i18n, countryNames);
};

// TODO Think about
const generateExportTypes = ({ exportTypeInterface, isFirstBatch, isLastBatch, numResults, rows, columns, settings, stripWhitespace, workerResources }: any) => {
	exportTypeInterface.send({
		isFirstBatch,
		isLastBatch,
		numResults,
		rows,
		columns,
		settings,
		stripWhitespace,
		workerResources,
	});

	// worker.onmessage = (e: MessageEvent): void => {
	// 	if (abortedMessageIds[_messageId]) {
	// 		console.log("ABORTED");
	// 	} else {
	// 		context.postMessage(e.data);
	// 	}
	// };

};

const pauseGeneration = (): void => {
	isPaused = true;
};

const continueGeneration = (): void => {
	isPaused = false;
	const { numResults, numBatches, batchSize, batchNum, template, unchanged, i18n, countryNames } = onContinueData;
	mainProcess(numResults, numBatches, batchSize, batchNum, template, unchanged, i18n, countryNames);
};

const setSpeed = (speed: number): void => {
	currentSpeed = speed;
};

// our high-level API that this utility file offers
export default {
	generateDataTypes,
	generateExportTypes,
	pause: pauseGeneration,
	continue: continueGeneration,
	setSpeed
};


// -------------------------------------------------------------------------------------------------------------------
// Internal methods

const mainProcess = (
	numResults: number, numBatches: number, batchSize: number, batchNum: number, template: any, unchanged: any,
	i18n: any, countryNames: any
): void => {
	const { firstRow, lastRow } = getBatchInfo(numResults, numBatches, batchSize, batchNum);
	const lagTime = (100 - currentSpeed) * 50;

	// if the generation has been paused, halt now and keep track of where we were at
	if (isPaused) {
		onContinueData = {
			numResults,
			numBatches,
			batchSize,
			batchNum,
			template,
			unchanged,
			i18n,
			countryNames
		};
		return;
	}

	setTimeout(() => {
		generateBatch({
			template,
			numResults,
			unchanged,
			i18n,
			firstRow,
			lastRow,
			batchNum,
			countryNames
		})
			.then(() => {
				if (batchNum === numBatches) {
					return;
				}
				mainProcess(numResults, numBatches, batchSize, batchNum + 1, template, unchanged, i18n, countryNames);
			});
	}, lagTime);
};


const getBatchInfo = (numResults: number, numBatches: number, batchSize: number, batchNum: number): any => {
	const firstRow = ((batchNum - 1) * batchSize) + 1;
	let lastRow = batchNum * batchSize;

	if (batchNum === numBatches) {
		lastRow = numResults;
	}

	return {
		firstRow,
		lastRow
	};
};

// this resolve the promise for every batch of data generated
const generateBatch = ({ template, unchanged, numResults, i18n, firstRow, lastRow, batchNum, countryNames }: any): Promise<any> => new Promise((resolve) => {
	const rowPromises: any = [];

	// rows are independent! The only necessarily synchronous bit is between process batches. So here we just run
	// them all in a loop
	for (let rowNum=firstRow; rowNum<=lastRow; rowNum++) {
		const currRowData: any[] = [];
		rowPromises.push(processBatchSequence(template, rowNum, i18n, currRowData, unchanged, countryNames));
	}

	Promise.all(rowPromises)
		.then((generatedData: any) => {
			onBatchComplete({
				completedBatchNum: batchNum,
				numGeneratedRows: lastRow,
				numResults,
				generatedData
			});
			resolve();
		});
});

const processBatchSequence = (generationTemplate: any, rowNum: number, i18n: any, currRowData: any[], unchanged: any, countryNames: any): any => {
	const processBatches = Object.keys(generationTemplate);

	return new Promise((resolveAll): any => {
		let sequence = Promise.resolve();

		// process each batch sequentially. This ensures the data generated from one processing batch is available to any
		// dependent children. For example, the Region data type needs the Country data being generated first so it
		// knows what country regions to generate if a mapping had been selected in the UI
		processBatches.forEach((processBatchNumberStr, batchIndex) => {
			const processBatchNum = parseInt(processBatchNumberStr, 10);
			const currBatch = generationTemplate[processBatchNum];

			// yup. We're mutating the currRowData param on each loop. We don't care hhahaha!!! Up yours, linter!
			sequence = sequence
				.then(() => processDataTypeBatch(currBatch, rowNum, i18n, currRowData, unchanged, countryNames))
				.then((promises) => {

					// this bit's sneaky. It ensures that the CURRENT batch within the row being generated is fully processed
					// before starting the next. That way, the generated data from earlier batches is available to later
					// Data Types for generating their own data
					return new Promise((resolveBatch) => {
						Promise.all(promises)
							.then((singleBatchResponses: any) => {
								for (let i=0; i<singleBatchResponses.length; i++) {
									currRowData.push({
										id: currBatch[i].id,
										colIndex: currBatch[i].colIndex,
										dataType: currBatch[i].dataType,
										data: singleBatchResponses[i]
									});
								}
								resolveBatch();

								if (batchIndex === processBatches.length-1) {
									currRowData.sort((a, b) =>a.colIndex < b.colIndex ? -1 : 1);
									resolveAll(currRowData.map((row) => row.data));
								}
							});
					});
				});
		});
	});
};

const processDataTypeBatch = (cells: any[], rowNum: number, i18n: any, currRowData: any, unchanged: any, countryNames: any): Promise<any>[] => (
	cells.map((currCell: any) => {
		const dataType = currCell.dataType;

		return new Promise((resolve, reject) => {
			if (unchanged[currCell.colIndex]) {
				resolve(unchanged[currCell.colIndex][rowNum-1]);
			} else {
				queueJob(dataType, {
					rowNum: rowNum,
					i18n: i18n.dataTypes[dataType],
					countryI18n: i18n.countries,
					rowState: currCell.rowState,
					existingRowData: currRowData,
					countryData,
					countryNames,
					workerResources: {
						workerUtils
					}
				}, resolve, reject);
			}
		});
	})
);

const queueJob = (dataType: DataTypeFolder, payload: any, resolve: any, reject: any): void => {
	if (!workerQueue[dataType]) {
		workerQueue[dataType] = {
			processing: false,
			queue: []
		};
	}
	workerQueue[dataType].queue.push({
		payload,
		resolve,
		reject
	});
	processQueue(dataType);
};

const processQueue = (dataType: DataTypeFolder): void => {
	if (workerQueue[dataType].processing) {
		return;
	}
	const queue = workerQueue[dataType].queue;
	const dtInterface = dataTypeInterface[dataType];

	if (!queue.length) {
		return;
	}

	workerQueue[dataType].processing = true;
	const { payload, resolve, reject } = queue[0];

	dtInterface.send(payload);

	dtInterface.onSuccess((response: any): void => {
		resolve(response.data);
		processNextItem(dataType);
	});

	dtInterface.onError((resp: any): void => {
		reject(resp);
		processNextItem(dataType);
	});
};

const processNextItem = (dataType: DataTypeFolder): void => {
	workerQueue[dataType].queue.shift();
	workerQueue[dataType].processing = false;
	processQueue(dataType);
};
