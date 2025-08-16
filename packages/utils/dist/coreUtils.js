import { nanoid } from 'nanoid';
import webWorkers from '../../_pluginWebWorkers';
import env from '../../_env';
export const getScriptVersion = () => env.version;
const generationWorkers = {};
export const createGenerationWorker = (customId = null) => {
    const workerId = (customId) ? customId : nanoid();
    generationWorkers[workerId] = new Worker(`./workers/${webWorkers.generationWorker}`);
    return workerId;
};
export const getGenerationWorker = (id) => generationWorkers[id];
export const destroyGenerationWorker = (id) => { delete generationWorkers[id]; };
export const getDataTypeWorkerMap = (dataTypes) => {
    const map = {};
    const dataTypeMap = webWorkers.dataTypes;
    dataTypes.forEach((dataType) => {
        map[dataType] = dataTypeMap[dataType];
    });
    return map;
};
export const getExportTypeWorkerMap = (exportTypes) => {
    const map = {};
    const dataTypeMap = webWorkers.exportTypes;
    Object.keys(exportTypes).forEach((exportType) => {
        map[exportType] = dataTypeMap[exportType];
    });
    return map;
};
export const getWorkerUtilsUrl = () => webWorkers.workerUtils;
const messageIds = {};
// wrapper method for the worker calls. This just adds a layer to abort any previous unfinished messages that are
// sent to the worker. It's up to the worker to handle aborting it however it sees fit, but the important part is
// that it doesn't post back any data from stale requests
export const performTask = (workerName, worker, postMessagePayload, onMessage) => {
    if (!messageIds[workerName]) {
        messageIds[workerName] = 1;
    }
    else {
        messageIds[workerName]++;
    }
    worker.postMessage(Object.assign(Object.assign({}, postMessagePayload), { _messageId: 1 // TODO
     }));
    worker.onmessage = (data) => {
        onMessage(data);
    };
};
export const easeInOutSine = (t, b, c, d) => {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
};
let namesPlugins = null;
export const getCountryNamesBundle = () => {
    return new Promise((resolve, reject) => {
        import(
        /* webpackChunkName: "countryNames" */
        /* webpackMode: "lazy" */
        '../../_namePlugins')
            .then((resp) => {
            namesPlugins = resp.default;
            resolve(resp.default);
        })
            .catch((e) => {
            reject(e);
        });
    });
};
export const getCountryNames = () => namesPlugins;
//# sourceMappingURL=coreUtils.js.map