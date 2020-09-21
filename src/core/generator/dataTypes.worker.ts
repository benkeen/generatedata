import { DataTypeFolder } from '../../_plugins';

let workerResources: any;
let loadedDataTypeWorkers: any = {};
let dataTypeWorkerMap: any = {};
let countryData: any = {};
const workerQueue: any = {};
const context: Worker = self as any;

context.onmessage = (e: any) => {
	const { batchSize, numResults } = e.data;

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
	// doesn't make a separate request (looks like it doesn't though), but even if not, each web worker will get a copy of the
	// data in their scope. Since Country data can be non trivial in size, this isn't great. I didn't want to bloat up
	// the memory usage any more than necessary during data generation - it's already a serious issue. Instead this loads
	// everything up front, once, and makes it available for any data type that wants it.

	// Possibly we could look at the data types and only bother doing this step if one of them requires country data. But
	// that should be a clean API & easy to debug

	Object.keys(workerResources.countries).forEach((country: any) => {
		if (!loadedDataTypeWorkers[country]) {
			importScripts(workerResources.countries[country]);

			// @ts-ignore
			countryData[country] = context[country](e.data.i18n.countries[country]);
		}
	});

	const numBatches = Math.ceil(numResults / batchSize);
	generateNextBatch(e.data, numBatches, batchSize, 1);
};


const generateNextBatch = (data: any, numBatches: number, batchSize: number, batchNum: number) => {
	const { firstRow, lastRow } = getBatchInfo(data.numResults, numBatches, batchSize, batchNum);

	generateBatch({
		template: data.template,
		numResults: data.numResults,
		i18n: data.i18n,
		firstRow,
		lastRow,
		batchNum
	})
		.then(() => {
			if (batchNum === numBatches) {
				return;
			}
			generateNextBatch(data, numBatches, batchSize, batchNum+1);
		});
};


const getBatchInfo = (numResults: number, numBatches: number, batchSize: number, batchNum: number): any => {
	const firstRow = ((batchNum - 1) * batchSize) + 1;
	let lastRow = batchNum * batchSize;

	// if it's the last batch, make sure the last row number isn't > the
	if (batchNum === numBatches) {
		lastRow = numResults;
	}

	return {
		firstRow,
		lastRow
	};
};


// this resolve the promise for every batch of data generated
const generateBatch = ({ template, numResults, i18n, firstRow, lastRow, batchNum }: any): Promise<any> => new Promise((resolve) => {
	const rowPromises: any = [];

	// rows are independent! The only necessarily synchronous bit is between process batches. So here we just run
	// them all in a loop
	for (let rowNum=firstRow; rowNum<=lastRow; rowNum++) {
		let currRowData: any[] = [];
		rowPromises.push(processBatchSequence(template, rowNum, i18n, currRowData));
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

const processBatchSequence = (generationTemplate: any, rowNum: number, i18n: any, currRowData: any[]): any => {
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
				.then(() => processDataTypeBatch(currBatch, rowNum, i18n, currRowData))
				.then((promises) => {

					// this bit's sneaky. It ensures that the CURRENT batch within the row being generated is fully processed
					// before starting the next. That way, the generated data from earlier batches is available to later
					// Data Types
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
									resolveAll(currRowData.map((row) => row.data.display));
								}
							});
					});
				});
		});
	});
};

const processDataTypeBatch = (cells: any[], rowNum: number, i18n: any, currRowData: any): Promise<any>[] => {
	return cells.map((currCell: any) => {
		let dataType = currCell.dataType;

		return new Promise((resolve, reject) => {
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
		if (typeof response.then === 'function') {
			response
				.then(() => {
					console.log("resolved async data type.");
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
