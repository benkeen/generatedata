// this is the main generator web worker file for the Core script. It's used for generating the entire data set.
// right now it's es5. SUUUUURE be nice to at least use es6 if not TS

// import { GenerationProps, GenerationTemplate, GenerationTemplateRow } from "../../../types/general";
// import { DTGenerateResult, DTGenerationExistingRowData } from "../../../types/dataTypes";

onmessage = function (e) {
	var dataTypes = e.data.dataTypes;

	// load the Data Type generator web worker files. Pretty sure this caches them so we can safely import them
	// every time
	var dataTypeFolders = Object.keys(dataTypes);
	for (var i=0; i<dataTypeFolders.length; i++) {
		var folder = dataTypeFolders[i];
		importScripts("./" + dataTypes[folder]);
	}

	// here we go... let's generate some stuff! async allowed?

	generateBatch(e.data);
};



var generateBatch = function (data) {
	return new Promise((resolve) => {
		const generationTemplate = data.template;

		// for the preview panel we always generate the max num of preview panel rows so when the user changes the
		// visible rows the data's already there
		const lastRowNum = data.numResults;
		const rowPromises = [];

		// rows are independent! The only necessarily synchronous bit is between process batches
		for (let rowNum=1; rowNum<=lastRowNum; rowNum++) {
			const currRowData = []; // TODO
			rowPromises.push(processBatchSequence(generationTemplate, rowNum, data.i18n, currRowData));
		}

		Promise.all(rowPromises)
			.then((data) => {
				resolve(data);
			});
	});
};


var processBatchSequence = function (generationTemplate, rowNum, i18n, currRowData) {
	return new Promise((resolveAll) => {
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
				.then((promises) => {
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
export const processDataTypeBatch = function (cells, rowNum, i18n, currRowData) {
	return cells.map((currCell) => {

		const response = currCell.generateFunc({
			rowNum,
			i18n: i18n.dataTypes[currCell.dataType],
			countryI18n: i18n.countries,
			rowState: currCell.rowState,
			existingRowData: currRowData
		});

		if (typeof response.then === 'function') {
			return response;
		} else {
			return Promise.resolve(response);
		}
	})
};

