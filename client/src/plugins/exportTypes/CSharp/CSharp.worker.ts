import utils from '../../../utils';
import { ETOnMessage } from '~types/exportTypes';
import { generate } from './CSharp.generate';

let workerUtilsLoaded = false;
const context: Worker = self as any;

export const onmessage = (e: ETOnMessage) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		workerUtilsLoaded = true;
	}

	context.postMessage(generate(e.data, utils));
};
