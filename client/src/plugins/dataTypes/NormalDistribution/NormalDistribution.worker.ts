import { DTWorkerOnMessage } from '~types/dataTypes';
import { generate } from './NormalDistribution.generate';

export const onmessage = (e: DTWorkerOnMessage) => {
	postMessage(generate(e.data));
};
