import { coreConfig } from '../core';
import webWorkers from '../_pluginWebWorkers';
import { DataTypeFolder, ExportTypeFolder } from '../_plugins';

export const getScriptVersion = (): string => coreConfig.version;

let coreWorker: Worker;
let coreDataTypeWorker: Worker;
export const loadCoreWorker = (): void => {
	coreWorker = new Worker(`./workers/${webWorkers.core}`);
};

export const getCoreWorker = (): Worker => coreWorker;

export const loadDataTypeWorker = (): void => {
	coreDataTypeWorker = new Worker(`./workers/${webWorkers.coreDataTypeWorker}`);
};

export const getDataTypeWorker = (): Worker => coreDataTypeWorker;

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
	const dataTypeMap: any = webWorkers.dataTypes;
	exportTypes.forEach((exportType: ExportTypeFolder) => {
		map[exportType] = dataTypeMap[exportType];
	});
	return map;
};

export const getCoreWorkerUtils = (): string => webWorkers.utils;
