import { DTWorkerOnMessage } from '~types/dataTypes';
import { generate } from './Constant.generate';

let utilsLoaded = false;

export const onmessage = (e: DTWorkerOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};
