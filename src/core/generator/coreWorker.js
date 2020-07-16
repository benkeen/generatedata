// this is the main generator web worker file for the Core script. It's used for generating the entire data set.
// right now it's es5. SUUUUURE be nice to at least use es6 if not TS

// import { GenerationProps, GenerationTemplate, GenerationTemplateRow } from "../../../types/general";
// import { DTGenerateResult, DTGenerationExistingRowData } from "../../../types/dataTypes";

var loadedWorkers = {};
var workerResources;

onmessage = function (e) {

	workerResources = e.data.workerResources;
	var dataTypeWorkerMap = workerResources.dataTypes;

	// load main utils file
	// importScripts("./" + dataTypes[folder]);

	// load the Data Type generator web worker files. Pretty sure this caches them so we can safely import them
	// every time
	var dataTypeFolders = Object.keys(dataTypeWorkerMap);
	for (var i=0; i<dataTypeFolders.length; i++) {
		var dataType = dataTypeFolders[i];
		if (!loadedWorkers[dataType]) {
			loadedWorkers[dataType] = new Worker(dataTypeWorkerMap[dataType])
		}
	}

	// this would just keep looping like a crazy person. Every completed batch would be posted back to the parent script
	generateBatch(e.data);
};


var generateBatch = function (data) {
	return new Promise(function(resolve) {
		var generationTemplate = data.template;

		// for the preview panel we always generate the max num of preview panel rows so when the user changes the
		// visible rows the data's already there
		var lastRowNum = data.numResults;
		var rowPromises = [];

		// rows are independent! The only necessarily synchronous bit is between process batches
		for (var rowNum=1; rowNum<=lastRowNum; rowNum++) {
			var currRowData = []; // TODO
			rowPromises.push(processBatchSequence(generationTemplate, rowNum, data.i18n, currRowData));
		}

		Promise.all(rowPromises)
			.then(function (data) {
				resolve(data);
			});
	});
};


var processBatchSequence = function (generationTemplate, rowNum, i18n, currRowData) {
	return new Promise(function(resolveAll) {
		var sequence = Promise.resolve();
		var processBatches = Object.keys(generationTemplate);

		// process each batch sequentially. This ensures the data generated from one processing batch is available to any
		// dependent children. For example, the Region data type needs the Country data being generated first so it
		// knows what country regions to generate if a mapping had been selected in the UI

		for (var batchIndex=0; batchIndex<processBatches.length; batchIndex++) {
			var processBatch = processBatches[batchIndex];
			var processBatchNum = parseInt(processBatch, 10);
			var currBatch = generationTemplate[processBatchNum];

			// yup. We're mutating the currRowData param on each loop. We don't care hhahaha!!! Up yours, linter!
			sequence = sequence
				.then(function () { return processDataTypeBatch(currBatch, rowNum, i18n, currRowData) })
				.then(function (promises) {
					console.log("promises: ", promises);

					// return new Promise((resolveBatch) => {
					// 	Promise.all(promises)
					// 		.then((generatedData) => {
					// 			generatedData.forEach((data, index) => {
					// 				currRowData.push({
					// 					id: currBatch[index].id,
					// 					colIndex: currBatch[index].colIndex,
					// 					dataType: currBatch[index].dataType,
					// 					data: data
					// 				});
					// 			});
					// 			resolveBatch();
					//
					// 			if (batchIndex === processBatches.length-1) {
					// 				currRowData.sort(function(a, b) { return a.colIndex < b.colIndex ? -1 : 1 });
					// 				resolveAll(currRowData.map(function (row) { return row.data.display; }));
					// 			}
					// 		});
					// });
				});
		}
	});
};

// Data Type generate() functions can be sync or async, depending on their needs. This method calls the generation
// method for all data types in a particular process batch and returns an array of promises, which when resolved,
// return the generated data for that row
var processDataTypeBatch = function (cells, rowNum, i18n, currRowData) {
	console.log(cells);

	return cells.map(function (currCell) {
		var dataType = currCell.dataType;
		var worker = loadedWorkers[dataType];

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

		worker.onmessage = function (response) {
			if (typeof response.then === 'function') {
				return response;
			} else {
				return Promise.resolve(response);
			}
		};

		worker.onerror = function (resp) {
			console.log("error: ", resp);
		}
	})
};

