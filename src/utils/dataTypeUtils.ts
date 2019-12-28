import { coreConfig } from '../core';
import dataTypeConfig from '../../build/dataTypeConfig';
import { dataTypes, dataTypeNames } from '../../build/dataTypesListUI';
import { getStrings } from './langUtils';

// used for the Data Type selection dropdown
export const getSortedGroupedDataTypes = () => {
	const i18n = getStrings();

	let groupedOptions: any = [];
	coreConfig.dataTypeGroups.map((group: string) => {
		const options = dataTypeConfig.filter((dataType: any) => dataType.fieldGroup === group).map((i: any) => {
			return {
				value: i.folder,
				label: i.name
			};
		});
		groupedOptions.push({
			label: i18n.core[group],
			options
		});
	});

	console.log(groupedOptions);
	
	return groupedOptions;
};


export const getDataTypeComponents = (dataType: string | null) => {
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

export const getDataTypeDefaultState = (dataType: string) => {
	return dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].state ? dataTypes[dataType].state : null;
};


export const getDataTypeHelpComponent = (dataType: string) => {
	return dataTypes[dataType] && dataTypes[dataType].Help ? dataTypes[dataType].Help : () => {};
};


export const getDataTypeProcessOrders = () => {
    const processOrders: any = {};
    dataTypeConfig.map((row) => {
        processOrders[row.folder] = row.processOrder;
    });
    return processOrders;
};
