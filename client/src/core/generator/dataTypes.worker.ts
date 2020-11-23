import { DataTypeFolder } from '../../../_plugins';

let workerResources: any;
let loadedDataTypeWorkers: any = {};
let dataTypeWorkerMap: any = {};
let countryData: any = {};
const workerQueue: any = {};
const context: Worker = self as any;
let isPaused = false;
let onContinueData: any = null;
let currentSpeed: number;

context.onmessage = (e: any) => {
	if (e.data.action === 'PAUSE') {
		isPaused = true;
		return;
	} else if (e.data.action === 'ABORT') {
		isPaused = true;
		return;
	} else if (e.data.action === 'CONTINUE') {
		isPaused = false;
		const { data, numBatches, batchSize, batchNum } = onContinueData;
		generateNextBatch(data, numBatches, batchSize, batchNum);
		return;
	} else if (e.data.action === 'CHANGE_SPEED') {
		currentSpeed = e.data.speed;
		return;
	}

	const { batchSize, numResults, speed } = e.data;

	currentSpeed = speed;

	workerResources = e.data.workerResources;
	dataTypeWorkerMap = workerResources.dataTypes;

	// load the Data Type generator web worker files
	Object.keys(dataTypeWorkerMap).forEach((dataType) => {
		if (!loadedDataTypeWorkers[dataType]) {
			loadedDataTypeWorkers[dataType] = new Worker(dataTypeWorkerMap[dataType])
		}
	});

	// here we load ALL country data types. :( I tried to avoid doing this and have the specific Data Type that needs them
	// load them on the fly - that would obviously be a much cleaner solution; requests would only get made as needed.
	// But it proved too problematic: *possibly* multiple requests to the same endpoint within different Data Type web workers
	// make a separate request (looks like it doesn't though), but even if not, each web worker will get a copy of the
	// data in their scope. Since Country data can be non trivial in size, this isn't great. I didn't want to bloat up
	// the memory usage any more than necessary during data generation - it's already a serious issue. Instead this loads
	// everything up front, once, and makes it available for any data type that wants it

	// Possibly we could look at the data types and only bother doing this step if one of them requires country data. But
	// that should be a clean API & easy to debug

	Object.keys(workerResources.countries).forEach((country: any) => {
		if (!countryData[country]) {
			importScripts(workerResources.countries[country]);

			if (!e.data.i18n) {
				console.log('**** GNARLY BUG HERE: i18n is not loaded in dataTypes.worker...');
			}

			// @ts-ignore
			countryData[country] = context[country](e.data.i18n.countries[country]);
		}
	});

	const numBatches = Math.ceil(numResults / batchSize);
	generateNextBatch(e.data, numBatches, batchSize, 1);
};


const generateNextBatch = (data: any, numBatches: number, batchSize: number, batchNum: number) => {
	const { firstRow, lastRow } = getBatchInfo(data.numResults, numBatches, batchSize, batchNum);

	if (isPaused) {
		onContinueData = {
			data,
			numBatches,
			batchSize,
			batchNum
		};
		return;
	}

	const lagTime = (100 - currentSpeed) * 50;

	setTimeout(() => {
		generateBatch({
			template: data.template,
			numResults: data.numResults,
			unchanged: data.unchanged || {},
			i18n: data.i18n,
			firstRow,
			lastRow,
			batchNum
		})
			.then(() => {
				if (batchNum === numBatches) {
					return;
				}
				generateNextBatch(data, numBatches, batchSize, batchNum + 1);
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
const generateBatch = ({ template, unchanged, numResults, i18n, firstRow, lastRow, batchNum }: any): Promise<any> => new Promise((resolve) => {
	const rowPromises: any = [];

	// rows are independent! The only necessarily synchronous bit is between process batches. So here we just run
	// them all in a loop
	for (let rowNum=firstRow; rowNum<=lastRow; rowNum++) {
		let currRowData: any[] = [];
		rowPromises.push(processBatchSequence(template, rowNum, i18n, currRowData, unchanged));
	}

	Promise.all(rowPromises)
		.then((generatedData: any) => {
			resolve();

			context.postMessage({
				completedBatchNum: batchNum,
				numGeneratedRows: lastRow,
				numResults,
				generatedData
			});
		});
});

const processBatchSequence = (generationTemplate: any, rowNum: number, i18n: any, currRowData: any[], unchanged: any): any => {
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
				.then(() => processDataTypeBatch(currBatch, rowNum, i18n, currRowData, unchanged))
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

const processDataTypeBatch = (cells: any[], rowNum: number, i18n: any, currRowData: any, unchanged: any): Promise<any>[] => {
	return cells.map((currCell: any) => {
		let dataType = currCell.dataType;

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
					workerResources: {
						workerUtils: workerResources.workerUtils
					}
				}, resolve, reject);
			}
		});
	})
};


const queueJob = (dataType: DataTypeFolder, payload: any, resolve: any, reject: any) => {
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


const processQueue = (dataType: DataTypeFolder) => {
	if (workerQueue[dataType].processing) {
		return;
	}
	const queue = workerQueue[dataType].queue;
	const worker = loadedDataTypeWorkers[dataType];

	if (!queue.length) {
		return;
	}

	workerQueue[dataType].processing = true;
	const { payload, resolve, reject } = queue[0];

	worker.postMessage(payload);

	// Data Type generator functions can be sync or async, depending on their needs. This method calls the generator
	// method for all data types in a particular process batch and returns an array of promises, which when resolved,
	// returns the generated data for that row
	worker.onmessage = (response: any) => {
		// TODO this isn't used and looks fishy
		if (typeof response.then === 'function') {
			response
				.then(() => {
					resolve(response.data);
					processNextItem(dataType);
				})
		} else {
			resolve(response.data);
			processNextItem(dataType);
		}
	};

	worker.onerror = (resp: any) => {
		reject(resp);
		processNextItem(dataType);
	};
};

const processNextItem = (dataType: DataTypeFolder) => {
	workerQueue[dataType].queue.shift();
	workerQueue[dataType].processing = false;
	processQueue(dataType);
};

export {};
