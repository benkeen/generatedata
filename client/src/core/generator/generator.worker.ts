/**
 * This file is going to replace dataTypes.worker.ts and exportTypes.worker.ts
 */
import generatorUtils from '~utils/generatorUtils';
import {
	GenGenerateAction, GenPauseAction, GenContinueAction, GenAbortAction, GenSetSpeedAction, GenerationWorkerActionType
} from '~core/generator/generator.types';

const context: Worker = self as any;

type onMessagePayload = GenGenerateAction | GenPauseAction | GenContinueAction | GenAbortAction | GenSetSpeedAction;

context.onmessage = (e: onMessagePayload): void => {
	if (e.data.action === GenerationWorkerActionType.Pause) {
		generatorUtils.pause();
		return;
	} else if (e.data.action === GenerationWorkerActionType.Abort) {
		generatorUtils.pause();
		return;
	} else if (e.data.action === GenerationWorkerActionType.Continue) {
		generatorUtils.continue();
		return;
	} else if (e.data.action === GenerationWorkerActionType.SetSpeed) {
		generatorUtils.setSpeed(e.data.speed);
		return;
	}

	const { batchSize, numResults, speed, workerResources } = e.data;
	generatorUtils.setSpeed(speed);

	console.log('???...', e.data);

	generatorUtils.generate(e.data, numResults, batchSize, {
		onBatchComplete: context.postMessage,
		dataTypeInterface: getWorkerInterface(workerResources.dataTypes),
		countryData: workerResources.countryData,
		workerUtils: workerResources.workerUtils
	});
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

const getWorkerInterface: GetWorkerInterface = (dataTypeWorkerMap) => {
	return Object.keys(dataTypeWorkerMap).map((dataType) => {
		// @ts-ignore
		const worker = new Worker(dataTypeWorkerMap[dataType]);
		console.log('................');
		worker.onmessage = () => {
			// ...
		};

		const k = {
			send: worker.postMessage,

			// these aren't defined!
			onSuccess: null,
			onError: () => { }
		};

		k.send = k.send.bind(worker);

		return k;
	});
};

export {};
