import { DTWorkerOnMessage } from '../../';
import { generate } from './NormalDistribution.generate';

export const onmessage = (e: DTWorkerOnMessage) => {
  postMessage(generate(e.data));
};
