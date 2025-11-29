import { DTWorkerOnMessage } from '../../';
import utils from '../../../utils';
import { generate } from './Country.generate';

let utilsLoaded = false;

export const onmessage = (e: DTWorkerOnMessage) => {
  if (!utilsLoaded) {
    importScripts(e.data.workerUtilsUrl);
    utilsLoaded = true;
  }

  postMessage(generate(e.data, utils));
};
