import { DataTypeFolder } from '../../_plugins';
import {
	DataTypeBatchGeneratedPayload,
	DataTypeWorkerInterface, GDTemplate,
	UnchangedGenerationData, WorkerInterface
} from '~types/generator';
import { CountryDataType, CountryNamesMap } from '~types/countries';
import { GenerationTemplate } from '~types/general';
import { WorkerUtils } from '~utils/workerUtils';

/**
 * This utility file contains the guts of the data generation code. It farms out work to the various plugins
 * and orchestrates the many independent tasks to gather together and return the data. It's used by both:
 *    1. the UI, called via web workers to run performantly in browsers in separate threads off the main UI thread
 *    2. the node script for server-side data generation
 */

let isPaused = false;
let lastMainProcessOptions: MainProcessOptionsBrowser | MainProcessOptionsNode | null = null;
let currentSpeed: number; // TODO possible range?
const workerQueue: any = {};

export const generate = ({
	i18n, workerUtils, countryNames, countryData, dataTypeInterface, columns, template, exportTypeSettings, onComplete,
	exportTypeInterface, generationSettings
}: any) => {
	const { numResults, packetSize, stripWhitespace } = generationSettings;

	const onBatchComplete = ({ completedBatchNum, numGeneratedRows, generatedData }: any): void => {
		const isLastBatch = numGeneratedRows >= numResults;
		const displayData = generatedData.map((row: any) => row.map((i: any) => i.display));

		generateExportTypes({
			numResults,
			isFirstBatch: completedBatchNum === 1,
			isLastBatch,
			rows: displayData,
			columns,
			stripWhitespace: stripWhitespace as boolean, // TODO we knows it's defined here
			settings: exportTypeSettings,
			workerUtils,
			onComplete: (data: string) => onComplete(data, { isLastBatch, numGeneratedRows }),
			exportTypeInterface
		});
	};

	generateDataTypes({
		numResults,
		batchSize: packetSize as number,
		i18n,
		template,
		countryNames,
		countryData,
		onBatchComplete,
		workerUtils,
		dataTypeInterface
	});
};

interface OnBatchComplete {
	(payload: DataTypeBatchGeneratedPayload): void;
}

type BaseGenerateDataTypesProps = {
	numResults: number;
	batchSize: number;
	i18n: any;
	countryNames: CountryNamesMap;
	dataTypeInterface: DataTypeWorkerInterface;
	template: GenerationTemplate; // bear in mind this has been grouped by process order. Check type.
	onBatchComplete: OnBatchComplete;
	countryData: CountryDataType;

	// used by the UI only. This allows regeneration of a subset of the data and leaves unchanged rows intact
	unchanged?: UnchangedGenerationData;
};

type GenerateDataTypesNodeProps = BaseGenerateDataTypesProps & {
	workerUtils: WorkerUtils;
};

type GenerateDataTypesBrowserProps = BaseGenerateDataTypesProps & {
	workerUtilsUrl: string;
};

export interface GenerateDataTypes {
	(options: GenerateDataTypesNodeProps | GenerateDataTypesBrowserProps): void;
}

type MainProcessBaseOptions = {
	numResults: number;
	numBatches: number;
	batchSize: number;
	batchNum: number;
	template: GenerationTemplate; // bear in mind this has been grouped by process order. Check type.
	i18n: any;
	countryNames: CountryNamesMap;
	dataTypeInterface: DataTypeWorkerInterface;
	onBatchComplete: OnBatchComplete;
	countryData: CountryDataType;
	unchanged: UnchangedGenerationData;
}

type MainProcessOptionsNode = MainProcessBaseOptions & {
	workerUtilsUrl: string;
}

type MainProcessOptionsBrowser = MainProcessBaseOptions & {
	workerUtils: WorkerUtils;
}

type GenerateExportTypesBaseProps = {
	numResults: number;
	exportTypeInterface: any; // TODO
	onComplete: any; // TODO
	isFirstBatch: boolean;
	isLastBatch: boolean;
	rows: any; // TODO
	columns: any; // TODO
	settings: any; // TODO
	stripWhitespace: boolean;
};

type GenerateExportTypesNodeProps = GenerateExportTypesBaseProps & {
	workerUtils: WorkerUtils;
}

type GenerateExportTypesBrowserProps = GenerateExportTypesBaseProps & {
	workerUtilsUrl: string;
}

export interface GenerateExportTypes {
	(settings: GenerateExportTypesNodeProps | GenerateExportTypesBrowserProps): void;
}

export const generateDataTypes: GenerateDataTypes = (options): void => {
	const { numResults, batchSize, ...otherOptions } = options;
	const numBatches = Math.ceil(numResults / batchSize);

	mainProcess({
		numResults,
		numBatches,
		batchSize,
		batchNum: 1,
		unchanged: options.unchanged || {},
		...otherOptions
	});
};

export const generateExportTypes: GenerateExportTypes = (options): void => {
	const { exportTypeInterface, onComplete, ...other } = options;

	if (exportTypeInterface.context === 'node') {
		onComplete(exportTypeInterface.send(other));
	} else {
		// pass off work to the Export Type worker
		exportTypeInterface.send(other);

		// listen for the response and post
		exportTypeInterface.onSuccess((resp: MessageEvent): void => {
			onComplete(resp.data);
		});
	}
};

const pauseGeneration = (): void => {
	isPaused = true;
};

const continueGeneration = (): void => {
	isPaused = false;
	mainProcess(lastMainProcessOptions as MainProcessOptionsBrowser | MainProcessOptionsNode);
};

const setSpeed = (speed: number): void => {
	currentSpeed = speed;
};

// our high-level API that this utility file offers
export default {
	generate,
	generateDataTypes,
	generateExportTypes,
	pause: pauseGeneration,
	continue: continueGeneration,
	setSpeed
};


// -------------------------------------------------------------------------------------------------------------------
// Internal methods

const mainProcess = (mainProcessOptions: MainProcessOptionsBrowser | MainProcessOptionsNode): void => {
	const { numResults, numBatches, batchSize, batchNum, ...other } = mainProcessOptions;
	const { firstRow, lastRow } = getBatchInfo({ numResults, numBatches, batchSize, batchNum });
	const lagTime = (100 - currentSpeed) * 50;

	// if the generation has been paused, halt now and keep track of where we were at
	if (isPaused) {
		lastMainProcessOptions = mainProcessOptions;
		return;
	}

	setTimeout(() => {
		generateDataTypeBatch({ firstRow, lastRow, numResults, batchNum, ...other })
			.then(() => {
				if (batchNum === numBatches) {
					return;
				}
				mainProcess({
					...mainProcessOptions,
					batchNum: mainProcessOptions.batchNum + 1
				});
			});
	}, lagTime);
};

type GetBatchInfoProps = {
	numResults: number;
	numBatches: number;
	batchSize: number;
	batchNum: number;
}

interface GetBatchInfo {
	(options: GetBatchInfoProps): {
		firstRow: number;
		lastRow: number;
	}
}

const getBatchInfo: GetBatchInfo = ({ numResults, numBatches, batchSize, batchNum }) => {
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


type GenerateDataTypeBaseBatchProps = {
	numResults: number;
	firstRow: number;
	lastRow: number;
	batchNum: number;
	i18n: any;
	template: GenerationTemplate;
	unchanged: UnchangedGenerationData;
	countryData: CountryDataType;
	countryNames: CountryNamesMap;
	dataTypeInterface: DataTypeWorkerInterface;
	onBatchComplete: OnBatchComplete;
}

type GenerateDataTypeNodeBatchProps = GenerateDataTypeBaseBatchProps & {
	workerUtils: WorkerUtils;
};

type GenerateDataTypeBrowserBatchProps = GenerateDataTypeBaseBatchProps & {
	workerUtilsUrl: string;
};

// this resolve the promise for every batch of data generated
const generateDataTypeBatch = (options: GenerateDataTypeBrowserBatchProps | GenerateDataTypeNodeBatchProps): Promise<any> => new Promise((resolve) => {
	const { batchNum, numResults, firstRow, lastRow, onBatchComplete, ...other } = options;
	const rowPromises: any = [];

	// rows are independent! The only necessarily synchronous bit is between process batches. So here we just run
	// them all in a loop
	for (let rowNum=firstRow; rowNum<=lastRow; rowNum++) {
		const currRowData: any[] = [];
		rowPromises.push(processDataTypeBatchGroup({
			rowNum,
			currRowData,
			...other
		}));
	}

	Promise.all(rowPromises)
		.then((generatedData: any) => {
			onBatchComplete({
				completedBatchNum: batchNum,
				numGeneratedRows: lastRow,
				numResults,
				generatedData
			});

			// @ts-ignore-line
			resolve();
		});
});

type ProcessDataTypeBatchGroupBaseProps = {
	currRowData: any[]; // TODO
	template: GenerationTemplate;
	rowNum: number;
	i18n: any;
	unchanged: UnchangedGenerationData;
	countryData: CountryDataType;
	countryNames: CountryNamesMap;
	dataTypeInterface: DataTypeWorkerInterface;
}

type ProcessDataTypeBatchGroupNode = ProcessDataTypeBatchGroupBaseProps & {
	workerUtils: WorkerUtils;
}

type ProcessDataTypeBatchGroupBrowser = ProcessDataTypeBatchGroupBaseProps & {
	workerUtilsUrl: string;
}

const processDataTypeBatchGroup = (options: ProcessDataTypeBatchGroupNode | ProcessDataTypeBatchGroupBrowser): any => {
	const { template, currRowData } = options;

	const processGroups = Object.keys(template);

	return new Promise((resolveAll): any => {
		let group = Promise.resolve();

		// process each batch sequentially. This ensures the data generated from one processing batch is available to any
		// dependent children. For example, the Region data type needs the Country data being generated first so it
		// knows what country regions to generate if a mapping had been selected in the UI
		processGroups.forEach((processBatchNumberStr, batchIndex) => {
			const processBatchNum = parseInt(processBatchNumberStr, 10);
			const currBatch = template[processBatchNum];

			// yup. We're mutating the currRowData param on each loop. We don't care hhahaha!!! Up yours, linter!
			group = group
				.then(() => processDataTypeBatch({ cells: currBatch, ...options }))
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

								if (batchIndex === processGroups.length-1) {
									currRowData.sort((a, b) => a.colIndex < b.colIndex ? -1 : 1);
									resolveAll(currRowData.map((row) => row.data));
								}
							});
					});
				});
		});
	});
};

type ProcessDataTypeBatchBaseProps = {
	cells: any[]; // TODO
	rowNum: number;
	i18n: any;
	currRowData: any;
	unchanged: UnchangedGenerationData;
	countryNames: CountryNamesMap;
	dataTypeInterface: DataTypeWorkerInterface;
	countryData: CountryDataType;
};

type ProcessDataTypeBatchNodeProps = ProcessDataTypeBatchBaseProps & {
	workerUtils: WorkerUtils;
}

type ProcessDataTypeBatchBrowserProps = ProcessDataTypeBatchBaseProps & {
	workerUtilsUrl: string;
}

const processDataTypeBatch = (options: ProcessDataTypeBatchNodeProps | ProcessDataTypeBatchBrowserProps): Promise<any>[] => {
	const { cells, unchanged, rowNum, i18n, dataTypeInterface, currRowData, ...otherOptions } = options;

	return cells.map((currCell: any) => {
		const dataType = currCell.dataType;

		return new Promise((resolve, reject) => {
			if (unchanged[currCell.colIndex]) {
				resolve(unchanged[currCell.colIndex][rowNum - 1]);
			} else {
				queueJob(dataType, dataTypeInterface[dataType], {
					rowNum: rowNum,
					i18n: i18n.dataTypes[dataType],
					countryI18n: i18n.countries,
					rowState: currCell.rowState,
					existingRowData: currRowData,
					...otherOptions
				}, resolve, reject);
			}
		});
	})
};

const queueJob = (dataType: DataTypeFolder, workerInterface: WorkerInterface, payload: any, resolve: any, reject: any): void => {
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

	processQueue(dataType, workerInterface);
};

const processQueue = (dataType: DataTypeFolder, workerInterface: WorkerInterface): void => {
	if (workerQueue[dataType].processing) {
		return;
	}
	const queue = workerQueue[dataType].queue;

	if (!queue.length) {
		return;
	}

	workerQueue[dataType].processing = true;
	const { payload, resolve, reject } = queue[0];

	if (workerInterface.context === 'node') {
		const resp = workerInterface.send(payload);
		resolve(resp);
		processNextItem(dataType, workerInterface);
	} else {
		workerInterface.send(payload);

		// @ts-ignore
		workerInterface.onSuccess((resp: any): void => {
			resolve(resp.data);
			processNextItem(dataType, workerInterface);
		});

		// @ts-ignore
		workerInterface.onError((resp: any): void => {
			reject(resp);
			processNextItem(dataType, workerInterface);
		});
	}
};

const processNextItem = (dataType: DataTypeFolder, workerInterface: WorkerInterface): void => {
	workerQueue[dataType].queue.shift();
	workerQueue[dataType].processing = false;
	processQueue(dataType, workerInterface);
};
