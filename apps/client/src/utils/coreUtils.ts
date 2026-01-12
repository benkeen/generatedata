import { CountryNamesMap, DataTypeFolder, DataTypeMap, ExportTypeFolder, ExportTypeMap } from '@generatedata/plugins';
import pluginWebWorkers from '@generatedata/plugins/workerPluginsFileMap';
import workerFileMap from '@generatedata/utils/workerUtilsFileMap';
import { nanoid } from 'nanoid';
import { generationWorker } from '../_generationWorker';

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

export const getWorkerUtilsUrl = (): string => workerFileMap.workerUtils;

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
