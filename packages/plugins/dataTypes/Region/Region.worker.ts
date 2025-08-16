import { DTWorkerOnMessage } from '~types/dataTypes';
import { generate } from './Region.generate';

export const onmessage = (e: DTWorkerOnMessage): void => {
	postMessage(generate(e.data));
};
