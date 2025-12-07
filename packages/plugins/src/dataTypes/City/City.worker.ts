import utils from '@generatedata/utils/worker';
import { DTWorkerOnMessage } from '../../';
import { generate } from './City.generate';

let utilsLoaded = false;

export const onmessage = (e: DTWorkerOnMessage) => {
  if (!utilsLoaded) {
    importScripts(e.data.workerUtilsUrl);
    utilsLoaded = true;
  }

  postMessage(generate(e.data, utils));
};
