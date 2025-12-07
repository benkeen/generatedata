import utils from '@generatedata/utils/worker';
import { DTWorkerOnMessage } from '../../';
import { generate } from './PIN.generate';

let workerUtilsLoaded = false;
export const onmessage = (e: DTWorkerOnMessage) => {
  if (!workerUtilsLoaded) {
    importScripts(e.data.workerUtilsUrl);
    workerUtilsLoaded = true;
  }
  postMessage(generate(undefined, utils));
};
