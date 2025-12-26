import utils from '@generatedata/utils/worker';
import { DTWorkerOnMessage } from '../../';
import { generate } from './Names.generate';

let workerUtilsLoaded = false;

export const onmessage = (e: DTWorkerOnMessage) => {
  console.log('Inside Names worker???', workerUtilsLoaded);

  if (!workerUtilsLoaded) {
    importScripts(e.data.workerUtilsUrl);
    workerUtilsLoaded = true;
  }

  postMessage(generate(e.data, utils));
};
