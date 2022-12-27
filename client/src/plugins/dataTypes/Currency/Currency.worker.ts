import { DTWorkerOnMessage } from '~types/dataTypes';
import { generate } from './Currency.generate';
import utils from '../../../utils';

let utilsLoaded = false;

export const onmessage = (e: DTWorkerOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		utilsLoaded = true;
	}

	postMessage(generate(e.data, utils));
};
