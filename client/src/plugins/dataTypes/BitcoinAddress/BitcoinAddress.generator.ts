import utils from '../../../utils';
import { DTOnMessage } from '~types/dataTypes';

let utilsLoaded = false;

const placeholders = {
	x: 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789',
	y: 'acdefghjklmnpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
};

export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	console.log(e.data.rowState);

	const length = utils.randomUtils.getRandomNum(24, 33);
	const display = utils.randomUtils.generateRandomAlphanumericStr('1' + ('x'.repeat(length)), placeholders);

	postMessage({
		display
	});
};
