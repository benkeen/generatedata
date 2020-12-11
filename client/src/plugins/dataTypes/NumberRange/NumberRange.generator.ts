import utils from '../../../utils';
import { DTOnMessage } from '~types/dataTypes';

let utilsLoaded = false;

export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	const { min, max } = e.data.rowState;

	postMessage({
		display: utils.randomUtils.getRandomNum(min, max)
	});
};
