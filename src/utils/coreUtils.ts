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
	exportTypeWorker = new Worker(`./workers/${webWorkers.coreDataTypeWorker}`);
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

export const getExportTypeWorkerMap = (exportTypes: ExportTypeFolder[]): ExportTypeMap => {
	const map: ExportTypeMap = {};
	const dataTypeMap: any = webWorkers.exportTypes;
	exportTypes.forEach((exportType: ExportTypeFolder) => {
		map[exportType] = dataTypeMap[exportType];
	});
	return map;
};

export const getCoreWorkerUtils = (): string => webWorkers.utils;
