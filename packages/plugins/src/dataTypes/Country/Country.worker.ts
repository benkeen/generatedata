import utils from '../../../utils';
import { generate } from './Country.generate';
import { DTWorkerOnMessage } from '~types/dataTypes';

let utilsLoaded = false;

export const onmessage = (e: DTWorkerOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		utilsLoaded = true;
	}

	postMessage(generate(e.data, utils));
};
