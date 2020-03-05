import { coreConfig } from '../core';
import { getStrings } from './langUtils';
import { dataTypes, DataTypeFolder } from '../_plugins';
import { DTBundle } from '../../types/dataTypes';

type LoadedDataTypes = {
	[name in DataTypeFolder]: DTBundle;
}

// this houses all Export Type code loaded async after the application starts
const loadedDataTypes: Partial<LoadedDataTypes> = {};


export const dataTypeNames = Object.keys(dataTypes).map((folder: DataTypeFolder) => dataTypes[folder].name);

// used for the Data Type selection dropdown
export const getSortedGroupedDataTypes = (): any => {
	const i18n = getStrings();

	console.log(coreConfig.dataTypeGroups, i18n);

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

export const getDataTypeComponents = (dataType: DataTypeFolder | null): any => {
	let Options = (): null => null;
	let Example = (): null => null;
	let Help = (): null => null;

	if (!dataType || !loadedDataTypes[dataType]) {
		return { Options, Example, Help };
	}

	// @ts-ignore
	if (dataTypeNames.indexOf(dataType) !== -1 && loadedDataTypes[dataType].Options) {
		// @ts-ignore
		Options = loadedDataTypes[dataType].Options;
	}
	
	// @ts-ignore
	if (dataTypeNames.indexOf(dataType) !== -1 && loadedDataTypes[dataType].Example) {
		// @ts-ignore
		Example = dataTypes[dataType].Example;
	}

	// @ts-ignore
	if (dataType && dataTypeNames.indexOf(dataType) !== -1 && loadedDataTypes[dataType].Help) {
		// @ts-ignore
		Help = dataTypes[dataType].Help;
	}

	return { Options, Example, Help };
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
			.then((definition: any) => {
				loadedDataTypes[dataType] = definition.default;
				resolve(definition.default);
			})
			.catch((e) => {
				reject(e);
			});
	});	
};

export const getGenerationOptionsByDataType = (dataType: DataTypeFolder): any => {
	const { generate, getMetadata, rowStateReducer } = loadedDataTypes[dataType] as DTBundle;
	return { generate, getMetadata, rowStateReducer };
};
