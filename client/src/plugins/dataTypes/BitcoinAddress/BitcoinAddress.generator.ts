import utils from '../../../utils';
import { DTOnMessage } from '~types/dataTypes';
import { BitcoinAddressFormat } from './BitcoinAddress';

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
	const rowState = e.data.rowState;

	const formats: any = {};
	if (rowState[BitcoinAddressFormat.Legacy].enabled && rowState[BitcoinAddressFormat.Legacy].weight) {
		formats[BitcoinAddressFormat.Legacy] = rowState[BitcoinAddressFormat.Legacy].weight;
	}
	if (rowState[BitcoinAddressFormat.Compatibility].enabled && rowState[BitcoinAddressFormat.Compatibility].weight) {
		formats[BitcoinAddressFormat.Compatibility] = rowState[BitcoinAddressFormat.Compatibility].weight;
	}
	if (rowState[BitcoinAddressFormat.Segwit].enabled && rowState[BitcoinAddressFormat.Segwit].weight) {
		formats[BitcoinAddressFormat.Segwit] = rowState[BitcoinAddressFormat.Segwit].weight;
	}

	// get a random format
	const format = utils.randomUtils.getRandomWeightedValue(formats);

	let display;
	switch (format) {
		// Nope! actual generation needs to be better than this. Will put this on hold.

		// case BitcoinAddressFormat.Legacy: {
		// 	const length = utils.randomUtils.getRandomNum(25, 35);
		// 	display = utils.randomUtils.generateRandomAlphanumericStr('1' + ('x'.repeat(length)), placeholders);
		// 	break;
		// }
		// case BitcoinAddressFormat.Compatibility: {
		// 	const length = utils.randomUtils.getRandomNum(25, 35);
		// 	display = utils.randomUtils.generateRandomAlphanumericStr('3' + ('x'.repeat(length)), placeholders);
		// 	break;
		// }
		// case BitcoinAddressFormat.Segwit:
		// 	display = utils.randomUtils.generateRandomAlphanumericStr('bc1' + ('y'.repeat(39)), placeholders);
		// 	break;
	}

	postMessage({
		display
	});
};
