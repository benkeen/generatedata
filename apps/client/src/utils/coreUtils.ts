import { CountryNamesMap, DataTypeFolder, DataTypeMap, ExportTypeFolder, ExportTypeMap } from '@generatedata/plugins';
import pluginWebWorkers from '@generatedata/plugins/workerFileMap';
import { nanoid } from 'nanoid';
import { generationWorker } from '../_generationWorker';
// import env from '../../_env';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const rootPackageVersion = require('../../../../package.json').version;

export const getScriptVersion = (): string => rootPackageVersion;

type WorkerMap = {
  [workerId: string]: Worker;
};

const generationWorkers: WorkerMap = {};

export const createGenerationWorker = (customId: string | null = null): string => {
  const workerId = customId ? customId : nanoid();
  generationWorkers[workerId] = new Worker(`./workers/${generationWorker}`);

  return workerId;
};

export const getGenerationWorker = (id: string): Worker => generationWorkers[id];
export const destroyGenerationWorker = (id: string): void => {
  delete generationWorkers[id];
};

export const getDataTypeWorkerMap = (dataTypes: DataTypeFolder[]): DataTypeMap => {
  const map: DataTypeMap = {};
  const dataTypeMap: any = pluginWebWorkers.dataTypes;
  dataTypes.forEach((dataType: DataTypeFolder) => {
    map[dataType] = dataTypeMap[dataType];
  });
  return map;
};

export const getExportTypeWorkerMap = (exportTypes: ExportTypeMap): ExportTypeMap => {
  const map: ExportTypeMap = {};
  const dataTypeMap: any = pluginWebWorkers.exportTypes;
  Object.keys(exportTypes).forEach((exportType) => {
    map[exportType as ExportTypeFolder] = dataTypeMap[exportType];
  });
  return map;
};

export const getWorkerUtilsUrl = (): string => ''; // webWorkers.workerUtils; // core package

const messageIds: any = {};

// wrapper method for the worker calls. This just adds a layer to abort any previous unfinished messages that are
// sent to the worker. It's up to the worker to handle aborting it however it sees fit, but the important part is
// that it doesn't post back any data from stale requests
export const performTask = (workerName: string, worker: any, postMessagePayload: any, onMessage: any): void => {
  if (!messageIds[workerName]) {
    messageIds[workerName] = 1;
  } else {
    messageIds[workerName]++;
  }

  worker.postMessage({
    ...postMessagePayload,
    _messageId: 1 // TODO
  });

  worker.onmessage = (data: any): void => {
    onMessage(data);
  };
};

export const easeInOutSine = (t: any, b: any, c: any, d: any): number => {
  return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
};

let namesPlugins: any = null;
export const getCountryNamesBundle = (): any => {
  return new Promise((resolve, reject) => {
    import(
      /* webpackChunkName: "countryNames" */
      /* webpackMode: "lazy" */
      '@generatedata/plugins/names'
    )
      .then((resp: any) => {
        namesPlugins = resp.default;
        resolve(resp.default);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const getCountryNames = (): CountryNamesMap | null => namesPlugins;
