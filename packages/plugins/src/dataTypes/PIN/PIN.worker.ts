import { DTWorkerOnMessage } from '~types/dataTypes';
import utils from '../../workerUtils';
import { generate } from './PIN.generate';

let workerUtilsLoaded = false;
export const onmessage = (e: DTWorkerOnMessage) => {
  if (!workerUtilsLoaded) {
    importScripts(e.data.workerUtilsUrl);
    workerUtilsLoaded = true;
  }
  postMessage(generate(undefined, utils));
};
