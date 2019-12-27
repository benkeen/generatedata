import { coreConfig } from '../core';
// @ts-ignore-line
import dataTypeConfig from '../../build/dataTypeConfig';
// @ts-ignore-line
import { dataTypes, dataTypeNames } from '../../build/dataTypesListUI';
import { getStrings } from './langUtils';

// used for the Data Type selection dropdown
export const getSortedGroupedDataTypes = () => {
	const i18n = getStrings();

	let groupedOptions: any = [];
	coreConfig.dataTypeGroups.map((group: string) => {
		const options = dataTypeConfig.filter((dataType: any) => dataType.fieldGroup === group).map((i: any) => {
			return {
				value: i.name,
				label: i.name
			};
		});
		groupedOptions.push({
			label: i18n.core[group],
			options
		});
	});
	return groupedOptions;
};


export const getDataTypeComponents = (dataType: string | null) => {
	let Options = null;
	let Example = null;
	let Help = null;

	if (dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].Options) {
		Options = dataTypes[dataType].Options;
	}
	if (dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].Example) {
		Example = dataTypes[dataType].Example;
	}
	if (dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].Help) {
		Help = dataTypes[dataType].Help;
	}

	return { Options, Example, Help };
};

export const getDataTypeDefaultState = (dataType: string) => {
	return dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].state ? dataTypes[dataType].state : null;
};


export const getDataTypeHelpComponent = (dataType: string) => {
	return dataTypes[dataType] && dataTypes[dataType].Help ? dataTypes[dataType].Help : () => {};
};


export const getDataTypeProcessOrders = () => {
    return dataTypeConfig.map((row) => ({ folder: row.folder }));
};
