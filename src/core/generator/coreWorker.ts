// this is the main generator web worker file for the Core script. It's used for generating the entire data set.
// right now it's es5. SUUUUURE be nice to at least use es6 if not TS

// import { GenerationProps, GenerationTemplate, GenerationTemplateRow } from "../../../types/general";
// import { DTGenerateResult, DTGenerationExistingRowData } from "../../../types/dataTypes";

let workerResources: any;
let dataTypeWorkerMap: any = {};

onmessage = function (e) {
	workerResources = e.data.workerResources;
	dataTypeWorkerMap = workerResources.dataTypes;

	// load main utils file
	// importScripts("./" + dataTypes[folder]);

	// this would just keep looping like a crazy person. Every completed batch would be posted back to the parent script
	generateBatch(e.data);
};


const generateBatch = (data: any): Promise<any> => {
	return new Promise((resolve) => {
		const generationTemplate = data.template;

		// for the preview panel we always generate the max num of preview panel rows so when the user changes the
		// visible rows the data's already there
		const lastRowNum = 1000; // data.numResults;
		const rowPromises = [];


		// rows are independent! The only necessarily synchronous bit is between process batches. So here we just run
		// them all in a loop
		for (let rowNum=1; rowNum<=lastRowNum; rowNum++) {
			let currRowData: any[] = [];
			rowPromises.push(processBatchSequence(generationTemplate, rowNum, data.i18n, currRowData));
		}

		Promise.all(rowPromises)
			.then((data) => {
				console.log("Final batch of data: ", data);
				resolve(data);
			});
	});
};

const processBatchSequence = (generationTemplate: any, rowNum: number, i18n: any, currRowData: any[]) => {
	const processBatches = Object.keys(generationTemplate);

	return new Promise((resolveAll) => {
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

// Data Type generator functions can be sync or async, depending on their needs. This method calls the generator
// method for all data types in a particular process batch and returns an array of promises, which when resolved,
// returning the generated data for that row
const processDataTypeBatch = (cells: any[], rowNum: number, i18n: any, currRowData: any): Promise<any>[] => (
	cells.map((currCell: any) => {
		let dataType = currCell.dataType;
		let worker = new Worker(dataTypeWorkerMap[dataType]);

		return new Promise((resolve, reject) => {
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
					resolve(response.data);
				}
			};

			worker.onerror = (resp: any) => {
				console.log('error: ', resp);
				reject(resp);
			};
		});
	})
);

