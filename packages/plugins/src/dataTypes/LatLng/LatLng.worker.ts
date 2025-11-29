import { DTWorkerOnMessage } from '../../';
import { generate } from './LatLng.generate';

export const onmessage = (e: DTWorkerOnMessage) => {
  postMessage(generate(e.data));
};
