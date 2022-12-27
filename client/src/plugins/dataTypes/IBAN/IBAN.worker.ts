/**
 * Original author (PHP): Joeri Noort <joert@joert.net>
 */
import utils from '../../../utils';
import { DTWorkerOnMessage } from '~types/dataTypes';
import { generate } from './IBAN.generate';

let utilsLoaded = false;

export const onmessage = (e: DTWorkerOnMessage) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		utilsLoaded = true;
	}

	postMessage(generate(undefined, utils));
};
