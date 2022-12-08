import generatorUtils from '~utils/generatorUtils';
import { GenerationWorkerActionType } from '~core/generator/generation.types';

const context: Worker = self as any;

let abortedMessageIds: any = {};

context.onmessage = (e: any) => {
	if (e.data.action === GenerationWorkerActionType.Pause) {
		generatorUtils.pause();
	} else if (e.data.action === GenerationWorkerActionType.Abort) {
		generatorUtils.pause(); // TODO
	} else if (e.data.action === GenerationWorkerActionType.Continue) {
		generatorUtils.continue();
	} else if (e.data.action === GenerationWorkerActionType.SetSpeed) {
		generatorUtils.setSpeed(e.data.speed);

	// used in the preview panel
	} else if (e.data.action === GenerationWorkerActionType.ProcessDataTypesOnly) {

		// TODO again rethink this
		const { batchSize, numResults, workerResources, unchanged, columns, i18n, template, countryNames } = e.data;

		generatorUtils.generateDataTypes({
			numResults,
			batchSize,
			unchanged,
			columns,
			i18n,
			template,
			countryNames,
			onBatchComplete: context.postMessage,
			dataTypeInterface: getDataTypeWorkerInterface(workerResources.dataTypes),
			countryData: workerResources.countryData,
			workerUtils: workerResources.workerUtils
		});
	} else if (e.data.action === GenerationWorkerActionType.ProcessExportTypesOnly) {
		const {
			_action, _messageId, rows, columns, isFirstBatch, isLastBatch, exportType, numResults,
			exportTypeSettings, stripWhitespace
		} = e.data;

		if (_action === 'abort') {
			abortedMessageIds[_messageId] = true;
		}

		// workerResources = e.data.workerResources;
		// exportTypeWorkerMap = workerResources.exportTypes;

		// if (!loadedExportTypeWorkers[exportType]) {
		// 	loadedExportTypeWorkers[exportType] = new Worker(exportTypeWorkerMap[exportType]);
		// }

		// const worker = loadedExportTypeWorkers[exportType];

		// worker.postMessage({
		// 	isFirstBatch,
		// 	isLastBatch,
		// 	numResults,
		// 	rows,
		// 	columns,
		// 	settings: exportTypeSettings,
		// 	stripWhitespace,
		// 	workerResources
		// });
		//
		// worker.onmessage = (e: MessageEvent): void => {
		// 	if (abortedMessageIds[_messageId]) {
		// 		console.log("ABORTED");
		// 	} else {
		// 		context.postMessage(e.data);
		// 	}
		// };
	} else if (e.data.action === GenerationWorkerActionType.Generate) {

	}
};

// this standardizes the interface for communication between the workers, allowing generatorUtils to work for both
// workers + backend code
interface GetWorkerInterface {
	(dataTypeWorkerMap: object): {
		send: any;
		onSuccess: any;
		onError: any;
	}[];
}

// this standardizes the interface for communication between the workers, allowing generatorUtils to work for both
// workers + backend code
const getDataTypeWorkerInterface: GetWorkerInterface = (dataTypeWorkerMap) => {
	const dataTypeInterface: any = {};
	Object.keys(dataTypeWorkerMap).map((dataType) => {

		// @ts-ignore
		const worker = new Worker(dataTypeWorkerMap[dataType]);

		// TODO check performance on this
		let onSuccess: any;
		const onRegisterSuccess = (f: any) => onSuccess = f;
		worker.onmessage = (resp) => {
			if (onSuccess) {
				onSuccess(resp);
			}
		};
		let onError: any;
		const onRegisterError = (f: any) => onError = f;
		worker.onerror = (resp) => {
			if (onError) {
				onError(resp);
			}
		};

		const dtInterface = {
			send: worker.postMessage,
			onSuccess: onRegisterSuccess,
			onError: onRegisterError,
		};

		dtInterface.send = dtInterface.send.bind(worker);

		dataTypeInterface[dataType] = dtInterface;
	});

	return dataTypeInterface;
}

export {};
