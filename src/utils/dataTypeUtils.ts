import { coreConfig } from '../core';
import { getStrings } from './langUtils';
import { dataTypes, DataTypeFolder } from '../_plugins';
import { GDLocale } from '../../types/general';

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


export type DTLocaleMap = {
	[str in DataTypeFolder]?: any;
}

export const getDataTypeLocales = (locale: GDLocale): any => {
	const dtLocales: DTLocaleMap = {};
	Object.keys(dataTypes)
		.forEach((folder: DataTypeFolder) => {
			if (dataTypes[folder].localeFiles.indexOf(locale) === -1) {
				return;
			}

			// here we use the more flexible requireJS import to grab the file content and stick it into our data 
			// structure. That allows only the appropriate locale file bundle to include the necessary strings
			
			// @ts-ignore
			const i18n = require(`../plugins/dataTypes/${folder}/i18n/${locale}`);
			
			dtLocales[folder] = i18n.default;
		});
	return dtLocales;
};