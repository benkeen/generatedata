import { DTWorkerOnMessage } from '~types/dataTypes';
import { generate } from './Colour.generate';

export const onmessage = (e: DTWorkerOnMessage) => {
	postMessage(generate(e.data));
};
