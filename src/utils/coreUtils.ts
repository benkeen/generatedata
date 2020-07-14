import { coreConfig } from '../core';
import webWorkers from '../_pluginWebWorkers';
import { DataTypeFolder } from '../_plugins';

export const getScriptVersion = (): string => coreConfig.version;

let coreWorker: Worker;
export const loadCoreWorker = () => {
	coreWorker = new Worker(`./workers/${webWorkers.core}`);
};

export const getCoreWorker = () => coreWorker;

export const getDataTypeWorkerMap = (dataTypes: DataTypeFolder[]) => {
	const map: any = {};
	const dataTypeMap: any = webWorkers.dataTypes;
	dataTypes.forEach((dataType: DataTypeFolder) => {
		map[dataType] = dataTypeMap[dataType];
	});
	return map;
};
