import { DTWorkerOnMessage } from '../../';
import utils from '../../workerUtils';
import { generate } from './PostalZip.generate';

let workerUtilsLoaded = false;

export const onmessage = (e: DTWorkerOnMessage) => {
  if (!workerUtilsLoaded) {
    importScripts(e.data.workerUtilsUrl);
    workerUtilsLoaded = true;
  }

  postMessage(generate(e.data, utils));
};
