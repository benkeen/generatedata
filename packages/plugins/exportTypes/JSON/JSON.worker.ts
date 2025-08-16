import utils from '../../../utils';
import { ETOnMessage } from '~types/exportTypes';
import { generate } from './JSON.generate';

const context: Worker = self as any;

let workerUtilsLoaded = false;
export const onmessage = (e: ETOnMessage) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		workerUtilsLoaded = true;
	}

	context.postMessage(generate(e.data, utils));
};
