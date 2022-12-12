import generatorUtils from '~utils/generatorUtils';
import { GenerationActions, GenerationWorkerActionType } from '~core/generator/generation.types';
import { DataTypeWorkerInterface, WorkerInterface } from '~types/generator';
import { DataTypeMap } from '~types/dataTypes';

const context: Worker = self as any;
const workerCache: any = {};

context.onmessage = (e: GenerationActions) => {
	if (e.data.action === GenerationWorkerActionType.Pause) {
		generatorUtils.pause();
	} else if (e.data.action === GenerationWorkerActionType.Abort) {
		generatorUtils.pause();
	} else if (e.data.action === GenerationWorkerActionType.Continue) {
		generatorUtils.continue();
	} else if (e.data.action === GenerationWorkerActionType.SetSpeed) {
		generatorUtils.setSpeed(e.data.speed);
	} else if (e.data.action === GenerationWorkerActionType.ProcessDataTypesOnly) {
		generatorUtils.generateDataTypes({
			...e.data,
			onBatchComplete: context.postMessage,
			dataTypeInterface: getDataTypeWorkerInterface(e.data.dataTypeWorkerMap),
		});
	} else if (e.data.action === GenerationWorkerActionType.ProcessExportTypesOnly) {
		generatorUtils.generateExportTypes({
			...e.data,
			settings: e.data.exportTypeSettings,
			onComplete: (data: any) => context.postMessage(data), // necessary?
			exportTypeInterface: getWorkerInterface(e.data.exportTypeWorkerUrl)
		});

	// this worker action combines the two above for easier usage. Used in the generator where it doesn't need such
	// granular control as with the preview panel
	} else if (e.data.action === GenerationWorkerActionType.Generate) {
		const {
			columns, numResults, batchSize, i18n, template, countryNames, workerUtilsUrl, countryData, stripWhitespace,
			exportTypeSettings, exportTypeWorkerUrl, dataTypeWorkerMap
		} = e.data;

		const onBatchComplete = ({ completedBatchNum, numGeneratedRows, generatedData }: any): void => {
			const isLastBatch = numGeneratedRows >= numResults;
			const displayData = generatedData.map((row: any) => row.map((i: any) => i.display));

			generatorUtils.generateExportTypes({
				numResults,
				isFirstBatch: completedBatchNum === 1,
				isLastBatch,
				rows: displayData,
				columns,
				stripWhitespace,
				settings: exportTypeSettings,
				workerUtilsUrl,
				onComplete: (data: string) => {
					context.postMessage({ numGeneratedRows, data });
				},
				exportTypeInterface: getWorkerInterface(exportTypeWorkerUrl)
			});
		};

		generatorUtils.generateDataTypes({
			numResults, batchSize, i18n, template, countryNames, workerUtilsUrl, countryData,
			onBatchComplete,
			dataTypeInterface: getDataTypeWorkerInterface(dataTypeWorkerMap)
		});
	}
};

// this standardizes the interface for communication between the workers, allowing generatorUtils to work for both
// workers + backend code
interface GetWorkerInterface {
	(workerMap: DataTypeMap): DataTypeWorkerInterface;
}

// this standardizes the interface for communication between the workers, allowing generatorUtils to work for both
// workers + backend code
const getDataTypeWorkerInterface: GetWorkerInterface = (workerMap) => {
	const workerInterface: DataTypeWorkerInterface = {};
	Object.keys(workerMap).forEach((plugin) => {
		// @ts-ignore
		workerInterface[plugin] = getWorkerInterface(workerMap[plugin]);
	});
	return workerInterface;
};

const getWorkerInterface = (workerPath: string): WorkerInterface => {
	let workerInterface: WorkerInterface;

	if (workerCache[workerPath]) {
		console.log('from cache!', workerPath);
		workerInterface = workerCache[workerPath];
	} else {
		console.log('NEW!', workerPath);
		const worker = new Worker(workerPath);

		let onSuccess: any;
		const onRegisterSuccess = (f: any) => onSuccess = f;
		worker.onmessage = (resp: any) => {
			if (onSuccess) {
				onSuccess(resp);
			}
		};
		let onError: any;
		const onRegisterError = (f: any) => onError = f;
		worker.onerror = (resp: any) => {
			if (onError) {
				onError(resp);
			}
		};

		workerInterface = {
			send: worker.postMessage,
			onSuccess: onRegisterSuccess,
			onError: onRegisterError
		};

		// bind the method to this new worker, not the main generation worker (i.e. this file)
		workerInterface.send = workerInterface.send.bind(worker);
		workerCache[workerPath] = workerInterface;
	}

	return workerInterface;
};

export {};
