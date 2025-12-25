import utils from '@generatedata/utils/worker';
import { DTWorkerOnMessage } from '../../';
import { generate } from './Region.generate';

export const onmessage = (e: DTWorkerOnMessage): void => {
  postMessage(generate(e.data, utils));
};
