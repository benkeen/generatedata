// @author Ben Keen <ben.keen@gmail.com>, origin code Zeeshan Shaikh
// @package DataTypes
import utils from '../../../utils';
import { DTGenerateResult } from '~types/dataTypes';
import { ETOnMessage } from '~types/exportTypes';

let utilsLoaded = false;

const onmessage = (e: ETOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate());
};

export const generate = (): DTGenerateResult => ({
	display: utils.randomUtils.getRandomNum(111, 999)
});

export {};
