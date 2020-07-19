import { coreConfig } from '../core';
import webWorkers from '../_pluginWebWorkers';
import { DataTypeFolder } from '../_plugins';

export const getScriptVersion = (): string => coreConfig.version;

let coreWorker: Worker;
export const loadCoreWorker = (): void => {
	coreWorker = new Worker(`./workers/${webWorkers.core}`);
};

export const getCoreWorker = (): Worker => coreWorker;

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

export const getCoreWorkerUtils = (): string => webWorkers.utils;
