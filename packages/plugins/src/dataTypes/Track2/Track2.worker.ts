/**
 * @author Ben Keen <ben.keen@gmail.com>, original code Zeeshan Shaikh <zeeshanyshaikh@gmail.com>
 */
import utils from '../../../utils';
import { DTWorkerOnMessage } from '~types/dataTypes';
import { generate } from './Track2.generate';

let utilsLoaded = false;
export const onmessage = (e: DTWorkerOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		utilsLoaded = true;
	}
	postMessage(generate(e.data, utils));
};
