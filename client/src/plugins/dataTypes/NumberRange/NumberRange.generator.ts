import utils from '../../../utils';
import { ETOnMessage } from '~types/exportTypes';

let utilsLoaded = false;

const onmessage = (e: ETOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	const { min, max } = e.data.rowState;

	postMessage({
		display: utils.randomUtils.getRandomNum(min, max)
	});
};
