import { coreConfig } from '../core';
import { getStrings } from './langUtils';
import { dataTypes, DataTypeFolder } from '../_plugins';

// @ts-ignore
export const dataTypeNames = Object.keys(dataTypes).map((folder: DataTypeFolder) => dataTypes[folder].name);

// used for the Data Type selection dropdown
export const getSortedGroupedDataTypes = (): any => {
	const i18n = getStrings();

	return coreConfig.dataTypeGroups.map((group: string) => {
		const options = Object.keys(dataTypes)
			// @ts-ignore
			.filter((dataType: DataTypeFolder) => dataTypes[dataType].fieldGroup === group)
			.map((dataType: DataTypeFolder) => {
				return {
					value: dataType,
					// @ts-ignore
					label: dataTypes[dataType].name
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
	const Options = null;
	const Example = null;
	const Help = null;

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

export const getDataTypeDefaultState = (dataType: string): any => {
	console.log(dataTypes);
	// return dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].state ? dataTypes[dataType].state : null;
	return null;
};

export const getDataTypeHelpComponent = (dataType: string): any => {
	console.log(dataTypes);
	// return dataTypes[dataType] && dataTypes[dataType].Help ? dataTypes[dataType].Help : (): any => null;
	return null;
};

// type DataTypeProcessOrders = {
// 	[name: keyof DataTypeFolder]?: number;
// }
type DataTypeProcessOrders = any;

export const processOrders: DataTypeProcessOrders = {}; 
Object.keys(dataTypes).map((dataType: DataTypeFolder) => {
	// @ts-ignore
	processOrders[dataType] = dataTypes[dataType].processOrder;
});

export const getDataTypeProcessOrder = (dataType: DataTypeFolder): number => processOrders[dataType];

