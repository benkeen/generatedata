import utils from '../../../utils';
import { DTOnMessage } from '~types/dataTypes';
import { generate } from './Names.generate';

let workerUtilsLoaded = false;

export const onmessage = (e: DTOnMessage) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		workerUtilsLoaded = true;
	}

	postMessage(generate(e.data, utils));
};
