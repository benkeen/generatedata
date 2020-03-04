import { coreConfig } from '../core';
import { getStrings } from './langUtils';
import { dataTypes, DataTypeFolder } from '../_plugins';
import { DTBundle } from '../../types/dataTypes';

type LoadedDataTypes = {
	[name in DataTypeFolder]?: DTBundle;
}

// this houses all Export Type code loaded async after the application starts
const loadedDataTypes: LoadedDataTypes = {};


export const dataTypeNames = Object.keys(dataTypes).map((folder: DataTypeFolder) => dataTypes[folder].name);

// used for the Data Type selection dropdown
export const getSortedGroupedDataTypes = (): any => {
	const i18n = getStrings();

	return coreConfig.dataTypeGroups.map((group: string) => {
		const options = Object.keys(dataTypes)
			.filter((dataType: DataTypeFolder) => dataTypes[dataType].fieldGroup === group)
			.map((dataType: DataTypeFolder) => {
				return {
					value: dataType,
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
	console.log(dataType);
	// return dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].state ? dataTypes[dataType].state : null;
	return null;
};

export const getDataTypeHelpComponent = (dataType: string): any => {
	console.log(dataType);
	// return dataTypes[dataType] && dataTypes[dataType].Help ? dataTypes[dataType].Help : (): any => null;
	return null;
};

type DataTypeProcessOrders = {
	[name in DataTypeFolder]?: number;
}

export const processOrders: DataTypeProcessOrders = {}; 
Object.keys(dataTypes).map((dataType: DataTypeFolder) => {
	processOrders[dataType] = dataTypes[dataType].processOrder;
});

export const getDataTypeProcessOrder = (dataType: DataTypeFolder): number => processOrders[dataType] as number;

export const loadDataTypeBundle = (dataType: DataTypeFolder): any => {
	return new Promise((resolve, reject) => {
		import(
			/* webpackChunkName: "DT-[request]" */
			/* webpackMode: "lazy" */
			`../plugins/dataTypes/${dataType}/bundle`
		)
			.then((def: any) => {
				loadedDataTypes[dataType] = {
					Example: def.Example ? def.Example : null,
					Options: def.Options ? def.Options : null,
					Help: def.Help ? def.Help : null,
					generate: def.generate,
					rowStateReducer: def.rowStateReducer ? def.rowStateReducer : null,
					getMetadata: def.getMetadata ? def.getMetadata : null
				};
				resolve(def);
			})
			.catch((e) => {
				reject(e);
			});
	});
};