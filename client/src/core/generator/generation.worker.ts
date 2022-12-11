import generatorUtils from '~utils/generatorUtils';
import { GenerationWorkerActionType } from '~core/generator/generation.types';
import {DataTypeWorkerInterface, WorkerInterface} from "~types/generator";

const context: Worker = self as any;
const workerCache: any = {};
const abortedMessageIds: any = {};

// TODO type!
context.onmessage = (e: any) => {
	if (e.data.action === GenerationWorkerActionType.Pause) {
		generatorUtils.pause();
	} else if (e.data.action === GenerationWorkerActionType.Abort) {
		generatorUtils.pause(); // TODO
	} else if (e.data.action === GenerationWorkerActionType.Continue) {
		generatorUtils.continue();
	} else if (e.data.action === GenerationWorkerActionType.SetSpeed) {
		generatorUtils.setSpeed(e.data.speed);

	} else if (e.data.action === GenerationWorkerActionType.ProcessDataTypesOnly) {

		// TODO again rethink this.
		const { batchSize, numResults, unchanged, i18n, template, countryNames, dataTypes, countryData, workerUtilsUrl } = e.data;

		generatorUtils.generateDataTypes({
			numResults,
			batchSize,
			unchanged,
			i18n,
			template,
			countryNames,
			onBatchComplete: context.postMessage, // TODO need to catch errors too? vs. dataTypeInterface.onSuccess
			dataTypeInterface: getDataTypeWorkerInterface(dataTypes),
			countryData,
			workerUtilsUrl
		});

	} else if (e.data.action === GenerationWorkerActionType.ProcessExportTypesOnly) {
		// TODO all this
		const {
			_action, _messageId, rows, columns, isFirstBatch, isLastBatch, exportType, numResults,
			exportTypeSettings: settings, stripWhitespace
		} = e.data;

		if (_action === 'abort') {
			abortedMessageIds[_messageId] = true;
		}

		const workerResources = e.data.workerResources;

		generatorUtils.generateExportTypes({
			isFirstBatch,
			isLastBatch,
			numResults,
			rows,
			columns,
			settings,
			stripWhitespace,
			workerResources,
			onComplete: (data: any) => {
				if (!abortedMessageIds[_messageId]) {
					context.postMessage(data);
				}
			},
			exportTypeInterface: getWorkerInterface(workerResources.exportTypes[exportType])
		});
	} else if (e.data.action === GenerationWorkerActionType.Generate) {

	}
};

// this standardizes the interface for communication between the workers, allowing generatorUtils to work for both
// workers + backend code
interface GetWorkerInterface {
	(workerMap: string): DataTypeWorkerInterface;
}

// this standardizes the interface for communication between the workers, allowing generatorUtils to work for both
// workers + backend code
const getDataTypeWorkerInterface: GetWorkerInterface = (workerMap) => {
	const workerInterface: DataTypeWorkerInterface = {};
	Object.keys(workerMap).map((plugin) => {
		workerInterface[plugin] = getWorkerInterface(workerMap[plugin as any]);
	});
	return workerInterface;
};

const getWorkerInterface = (workerPath: string): WorkerInterface => {
	const worker = workerCache[workerPath] || new Worker(workerPath);

	// TODO check performance
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

	const workerInterface: WorkerInterface = {
		send: worker.postMessage,
		onSuccess: onRegisterSuccess,
		onError: onRegisterError
	};

	// bind the method to this new worker, not the main generation worker (i.e. this file)
	workerInterface.send = workerInterface.send.bind(worker);

	return workerInterface;
};

export {};
