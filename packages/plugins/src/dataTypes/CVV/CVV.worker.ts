// @author Ben Keen <ben.keen@gmail.com>, origin code Zeeshan Shaikh
// @package DataTypes
import { DTWorkerOnMessage } from '../../';
import utils from '../../workerUtils';
import { generate } from './CVV.generate';

let utilsLoaded = false;

export const onmessage = (e: DTWorkerOnMessage) => {
  if (!utilsLoaded) {
    importScripts(e.data.workerUtilsUrl);
    utilsLoaded = true;
  }

  postMessage(generate(undefined, utils));
};
