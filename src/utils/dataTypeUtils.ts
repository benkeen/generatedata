import { coreConfig } from '../core';
import dataTypeConfig from '../../build/dataTypeConfig';
import { dataTypes, dataTypeNames } from '../../build/dataTypesListUI';
import { getStrings } from './langUtils';

// used for the Data Type selection dropdown
export const getSortedGroupedDataTypes = (): any => {
	const i18n = getStrings();

	return coreConfig.dataTypeGroups.map((group: string) => {
		const options = dataTypeConfig.filter((dataType: any) => dataType.fieldGroup === group).map((i: any) => {
			return {
				value: i.folder,
				label: i.name
			};
		});
		return {
			label: i18n.core[group],
			options
		};
	});
};


export const getDataTypeComponents = (dataType: string | null): any => {
	let Options = null;
	let Example = null;
	let Help = null;

	if (dataType && dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].Options) {
		Options = dataTypes[dataType].Options;
	}
	if (dataType && dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].Example) {
		Example = dataTypes[dataType].Example;
	}
	if (dataType && dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].Help) {
		Help = dataTypes[dataType].Help;
	}

	return { Options, Example, Help };
};


export const getDataTypeDefaultState = (dataType: string): any => {
	return dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].state ? dataTypes[dataType].state : null;
};


export const getDataTypeHelpComponent = (dataType: string): any => {
	return dataTypes[dataType] && dataTypes[dataType].Help ? dataTypes[dataType].Help : (): any => null;
};


export const getDataTypeProcessOrders = (): any => {
	const processOrders: any = {};
	dataTypeConfig.forEach((row) => {
		processOrders[row.folder] = row.processOrder;
	});
	return processOrders;
};
