// @author Ben Keen <ben.keen@gmail.com>, origin code Zeeshan Shaikh
// @package DataTypes
import utils from '../../../utils';
import { DTGenerateResult, DTWorkerOnMessage } from '~types/dataTypes';

let utilsLoaded = false;

export const onmessage = (e: DTWorkerOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		utilsLoaded = true;
	}

	postMessage(generate());
};

export const generate = (): DTGenerateResult => ({
	display: utils.randomUtils.getRandomNum(111, 999)
});
