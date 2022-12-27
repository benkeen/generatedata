import { DTWorkerOnMessage } from '~types/dataTypes';
import { generate } from './LatLng.generate';

export const onmessage = (e: DTWorkerOnMessage) => {
	postMessage(generate(e.data));
};
