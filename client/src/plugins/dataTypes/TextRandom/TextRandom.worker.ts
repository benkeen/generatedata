import utils from '../../../utils';
import { DTWorkerOnMessage } from '~types/dataTypes';
import { generate } from './TextRandom.generate';

let utilsLoaded = false;
export const onmessage = (e: DTWorkerOnMessage): void => {
	if (!utilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		utilsLoaded = true;
	}
	postMessage(generate(e.data, utils));
};
