import generatorUtils from '~utils/generatorUtils';
import { GenerationWorkerActionType } from '~core/generator/generation.types';

const context: Worker = self as any;


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

/*
	unchanged,
	columns,
	i18n,
	template,
	countryNames: coreUtils.getCountryNames(),
	workerResources: {
		workerUtils: coreUtils.getWorkerUtils(),
		dataTypes: coreUtils.getDataTypeWorkerMap(selectors.getRowDataTypes(state) as DataTypeFolder[]),
		countryData: getCountryData()
	}
*/
		const { batchSize, numResults, workerResources } = e.data;

		// flatten this
		generatorUtils.generate(e.data, numResults, batchSize, {
			onBatchComplete: context.postMessage,
			dataTypeInterface: getWorkerInterface(workerResources.dataTypes),
			countryData: workerResources.countryData,
			workerUtils: workerResources.workerUtils
		});
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
const getWorkerInterface: GetWorkerInterface = (dataTypeWorkerMap) => {
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
