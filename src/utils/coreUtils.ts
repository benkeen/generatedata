import { coreConfig } from '../core';
import webWorkers from '../_pluginWebWorkers';
import { DataTypeFolder, ExportTypeFolder } from '../_plugins';

export const getScriptVersion = (): string => coreConfig.version;

let coreWorker: Worker;
let dataTypeWorker: Worker;
let exportTypeWorker: Worker;

export const loadCoreWorker = (): void => {
	coreWorker = new Worker(`./workers/${webWorkers.coreWorker}`);
};

export const getCoreWorker = (): Worker => coreWorker;

export const loadDataTypeWorker = (): void => {
	dataTypeWorker = new Worker(`./workers/${webWorkers.coreDataTypeWorker}`);
};

export const getDataTypeWorker = (): Worker => dataTypeWorker;

export const loadExportTypeWorker = (): void => {
	exportTypeWorker = new Worker(`./workers/${webWorkers.coreExportTypeWorker}`);
};

export const getExportTypeWorker = (): Worker => exportTypeWorker;

export type DataTypeMap = {
	[dataType in DataTypeFolder]?: string;
};

export const getDataTypeWorkerMap = (dataTypes: DataTypeFolder[]): DataTypeMap => {
	const map: DataTypeMap = {};
	const dataTypeMap: any = webWorkers.dataTypes;
	dataTypes.forEach((dataType: DataTypeFolder) => {
		map[dataType] = dataTypeMap[dataType];
	});
	return map;
};

export type ExportTypeMap = {
	[exportType in ExportTypeFolder]?: string;
};

export const getExportTypeWorkerMap = (exportTypes: ExportTypeMap): ExportTypeMap => {
	const map: ExportTypeMap = {};
	const dataTypeMap: any = webWorkers.exportTypes;
	Object.keys(exportTypes).forEach((exportType: ExportTypeFolder) => {
		map[exportType] = dataTypeMap[exportType];
	});
	return map;
};

export const getWorkerUtils = (): string => webWorkers.workerUtils;

const messageIds: any = {};
const liveMessages: any = {};

// wrapper method for the worker calls. This just adds a layer to abort any previous unfinished messages that are
// sent to the worker. It's up to the worker to handle aborting it however it sees fit, but the important part is
// that it doesn't post back any data from stale requests
export const performTask = (workerName: string, worker: any, postMessagePayload: any, onMessage: any): void => {
	if (liveMessages[workerName]) {
		console.log("trying to abort");
		worker.postMessage({ _action: 'abort', _messageId: messageIds[workerName] });
		liveMessages[workerName] = false;
	}

	if (!messageIds[workerName]) {
		messageIds[workerName] = 1;
	} else {
		messageIds[workerName]++;
	}

	worker.postMessage({
		...postMessagePayload,
		_messageId: 1
	});

	worker.onmessage = (data: any): void => {
		onMessage(data);
	};
};
