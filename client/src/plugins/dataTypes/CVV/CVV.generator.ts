// @author Ben Keen <ben.keen@gmail.com>, origin code Zeeshan Shaikh
// @package DataTypes
import utils from '../../../utils';
import { DTGenerateResult, DTOnMessage } from '~types/dataTypes';

let utilsLoaded = false;

export const onmessage = (e: DTOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate());
};

export const generate = (): DTGenerateResult => ({
	display: utils.randomUtils.getRandomNum(111, 999)
});
