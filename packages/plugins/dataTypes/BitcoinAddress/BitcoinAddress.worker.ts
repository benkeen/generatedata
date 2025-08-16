import { DTWorkerOnMessage } from '~types/dataTypes';
import { generate } from './BitcoinAddress.generate';

export const onmessage = (e: DTWorkerOnMessage) => {
	postMessage(generate(e.data));
};
