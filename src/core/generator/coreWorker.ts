// this is the main generator web worker file for the Core script. It's used for generating the entire data set.
// right now it's es5. SUUUUURE be nice to at least use es6 if not TS

// import { GenerationProps, GenerationTemplate, GenerationTemplateRow } from "../../../types/general";
// import { DTGenerateResult, DTGenerationExistingRowData } from "../../../types/dataTypes";

const loadedWorkers: any = {};
let workerResources: any;

onmessage = function (e) {
	workerResources = e.data.workerResources;
	let dataTypeWorkerMap = workerResources.dataTypes;

	// load main utils file
	// importScripts("./" + dataTypes[folder]);

	// load the Data Type generator web worker files. Pretty sure this caches them so we can safely import them
	// every time
	Object.keys(dataTypeWorkerMap).forEach((dataType) => {
		if (!loadedWorkers[dataType]) {
			loadedWorkers[dataType] = new Worker(dataTypeWorkerMap[dataType])
		}
	});

	// this would just keep looping like a crazy person. Every completed batch would be posted back to the parent script
	generateBatch(e.data);
};


var generateBatch = function (data: any): Promise<any> {
	return new Promise(function(resolve) {
		var generationTemplate = data.template;

		// for the preview panel we always generate the max num of preview panel rows so when the user changes the
		// visible rows the data's already there
		var lastRowNum = data.numResults;
		var rowPromises = [];

		// rows are independent! The only necessarily synchronous bit is between process batches
		for (var rowNum=1; rowNum<=lastRowNum; rowNum++) {
			var currRowData: any[] = []; // TODO
			rowPromises.push(processBatchSequence(generationTemplate, rowNum, data.i18n, currRowData));
		}

		Promise.all(rowPromises)
			.then(function (data) {
				console.log("resolving up here too.", data);
				resolve(data);
			});
	});
};


var processBatchSequence = function (generationTemplate: any, rowNum: number, i18n: any, currRowData: any[]) {
	return new Promise(function(resolveAll) {
		let sequence = Promise.resolve();
		var processBatches = Object.keys(generationTemplate);

		console.log(processBatches);

		// process each batch sequentially. This ensures the data generated from one processing batch is available to any
		// dependent children. For example, the Region data type needs the Country data being generated first so it
		// knows what country regions to generate if a mapping had been selected in the UI

		processBatches.forEach(function(processBatchNumberStr, batchIndex) {
			const processBatchNum = parseInt(processBatchNumberStr, 10);
			const currBatch = generationTemplate[processBatchNum];

			// yup. We're mutating the currRowData param on each loop. We don't care hhahaha!!! Up yours, linter!
			sequence = sequence
				.then(() => processDataTypeBatch(currBatch, rowNum, i18n, currRowData))
				.then((promises) => {
					return new Promise((resolveBatch) => {
						Promise.all(promises)
							.then((promiseResponses: any) => {
								for (var i=0; i<promiseResponses.length; i++) {
									const currPromiseData = promiseResponses[i].data;
									currRowData.push({
										id: currBatch[i].id,
										colIndex: currBatch[i].colIndex,
										dataType: currBatch[i].dataType,
										data: currPromiseData
									});
								}
								resolveBatch();

								if (batchIndex === processBatches.length-1) {
									currRowData.sort(function(a, b) { return a.colIndex < b.colIndex ? -1 : 1 });
									console.log("resolving all batches: ", currRowData.map(function (row) { return row.data.display; }));
									resolveAll(currRowData.map(function (row) { return row.data.display; }));
								}
							});
					});
				});
		});

	});
};

// Data Type generator functions can be sync or async, depending on their needs. This method calls the generation
// method for all data types in a particular process batch and returns an array of promises, which when resolved,
// return the generated data for that row
const processDataTypeBatch = (cells: any[], rowNum: number, i18n: any, currRowData: any) => {
	return cells.map((currCell: any) => {
		var dataType = currCell.dataType;
		var worker = loadedWorkers[dataType];

		return new Promise(function (resolve, reject) {
			worker.postMessage({
				rowNum: rowNum,
				i18n: i18n.dataTypes[currCell.dataType],
				countryI18n: i18n.countries,
				rowState: currCell.rowState,
				existingRowData: currRowData,
				workerResources: {
					coreUtils: workerResources.coreUtils
				}
			});

			worker.onmessage = (response: any) => {
				if (typeof response.then === 'function') {
					// TODO
					//response.then()
				} else {
					resolve(response);
				}
			};

			worker.onerror = (resp: any) => {
				console.log("error: ", resp);
				reject(resp);
			};
		});


	})
};

