import utils from '../../../utils';
import { generate } from './URLs.generate';
import { DTWorkerOnMessage } from '~types/dataTypes';

let utilsLoaded = false;
export const onmessage = (e: DTWorkerOnMessage): void => {
	if (!utilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		utilsLoaded = true;
	}
	postMessage(generate(e.data, utils));
};
