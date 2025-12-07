import utils from '@generatedata/utils/worker';
import { DTWorkerOnMessage } from '../../';
import { generate } from './Date.generate';

let workerUtilsLoaded = false;

export const onmessage = (e: DTWorkerOnMessage) => {
  if (!workerUtilsLoaded) {
    importScripts(e.data.workerUtilsUrl);
    workerUtilsLoaded = true;
  }

  postMessage(generate(e.data, utils));
};
