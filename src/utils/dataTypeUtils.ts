import { coreConfig } from '../core';
import { dataTypes } from '../../build/plugins';
import { getStrings } from './langUtils';

export const dataTypeNames = Object.keys(dataTypes);

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


// should be memoized. Never changes. 
const processOrders: any = {};
export const getDataTypeProcessOrders = (): any => {
	dataTypeConfig.forEach((row) => {
		processOrders[row.folder] = row.processOrder;
	});
	return processOrders;
};

export const getDataTypeProcessOrder = (dataType: string): number => processOrders[dataType];