import { DTWorkerOnMessage } from '../../';
import utils from '../../workerUtils';
import { generate } from './AutoIncrement.generate';

let utilsLoaded = false;

export const onmessage = (e: DTWorkerOnMessage) => {
  if (!utilsLoaded) {
    importScripts(e.data.workerUtilsUrl);
    utilsLoaded = true;
  }

  postMessage(generate(e.data, utils));
};
