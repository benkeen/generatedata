import { DTWorkerOnMessage } from '../../';
import { generate } from './Colour.generate';

export const onmessage = (e: DTWorkerOnMessage) => {
  postMessage(generate(e.data));
};
