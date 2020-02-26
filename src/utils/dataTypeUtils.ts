import { coreConfig } from '../core';
import { getStrings } from './langUtils';
import { dataTypes, DataType } from '../_plugins';

export const dataTypeNames = dataTypes.map((dataType) => dataType.name);

// used for the Data Type selection dropdown
export const getSortedGroupedDataTypes = (): any => {
	const i18n = getStrings();

	return coreConfig.dataTypeGroups.map((group: string) => {
		const options = dataTypes.filter((dataType: any) => dataType.fieldGroup === group).map((i: any) => {
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


// dataType: DataType | null
export const getDataTypeComponents = (): any => {
	let Options = null;
	let Example = null;
	let Help = null;

	// if (dataType && dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].Options) {
	// 	Options = dataTypes[dataType].Options;
	// }
	// if (dataType && dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].Example) {
	// 	Example = dataTypes[dataType].Example;
	// }
	// if (dataType && dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].Help) {
	// 	Help = dataTypes[dataType].Help;
	// }

	return { Options, Example, Help };
};


// dataType: string
export const getDataTypeDefaultState = (): any => {
	// return dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].state ? dataTypes[dataType].state : null;
	return null;
};


// dataType: string
export const getDataTypeHelpComponent = (): any => {
	// return dataTypes[dataType] && dataTypes[dataType].Help ? dataTypes[dataType].Help : (): any => null;
	return null;
};


// TODO move to var like above
const processOrders: any = {};
export const getDataTypeProcessOrders = (): any => {
	dataTypes.forEach((row) => {
		processOrders[row.folder] = row.processOrder;
	});
	return processOrders;
};

export const getDataTypeProcessOrder = (dataType: string): number => processOrders[dataType];