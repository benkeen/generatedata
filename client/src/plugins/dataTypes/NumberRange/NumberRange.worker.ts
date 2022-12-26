import utils from '../../../utils';
import { DTWorkerOnMessage } from '~types/dataTypes';

let utilsLoaded = false;

export const onmessage = (e: DTWorkerOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		utilsLoaded = true;
	}

	const { min, max } = e.data.rowState;

	postMessage({
		display: utils.randomUtils.getRandomNum(min, max)
	});
};
