import utils from '../../../utils';
import { generate } from './PIN.generate';
import { DTWorkerOnMessage } from "~types/dataTypes";

let workerUtilsLoaded = false;
export const onmessage = (e: DTWorkerOnMessage) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		workerUtilsLoaded = true;
	}
	postMessage(generate(undefined, utils));
};
