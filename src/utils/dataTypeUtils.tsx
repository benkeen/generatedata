import React from 'react';
import { coreConfig } from '../core';
import { getStrings } from './langUtils';
import { dataTypes, DataTypeFolder } from '../_plugins';
import { DTBundle } from '../../types/dataTypes';
import CircularProgress from '@material-ui/core/CircularProgress';

type LoadedDataTypes = {
	[name in DataTypeFolder]: DTBundle;
}

// this houses all Export Type code loaded async after the application starts
const loadedDataTypes: Partial<LoadedDataTypes> = {};

export const dataTypeNames = Object.keys(dataTypes).map((folder: DataTypeFolder) => dataTypes[folder].name);

// used for the Data Type selection dropdown
export const getSortedGroupedDataTypes = (): any => {
	const i18n = getStrings();

	return coreConfig.dataTypeGroups.map((group: string) => {
		const options = Object.keys(dataTypes)
			.filter((dataType: DataTypeFolder) => dataTypes[dataType].fieldGroup === group)
			.map((dataType: DataTypeFolder) => ({
				dataType,
				sortOrder: dataTypes[dataType].fieldGroupOrder
			}));

		options.sort((a: any, b: any) => {
			if (a.sortOrder < b.sortOrder) {
				return -1;
			} else if (a.sortOrder > b.sortOrder) {
				return 1;
			}
			return 0;
		});

		const sortedOptions = options.map(({ dataType }: { dataType: DataTypeFolder }) => ({
			value: dataType,
			label: dataTypes[dataType].name
		}));

		return {
			label: i18n.core[group],
			options: sortedOptions
		};
	});
};

export const getDataTypeComponents = (dataType: DataTypeFolder | null): any => {
	let Example = null;
	let Options = null;
	let Help = (): null => null;

	if (!dataType || !loadedDataTypes[dataType]) {
		return {
			// eslint-disable-next-line react/display-name
			Example: (): any => <CircularProgress size={20} style={{ color: '#999999', margin: 5 }} />,
			Options,
			Help
		};
	}

	// @ts-ignore
	if (dataTypeNames.indexOf(dataType) !== -1 && loadedDataTypes[dataType].Example) {
		// @ts-ignore
		Example = loadedDataTypes[dataType].Example;
	}

	// @ts-ignore
	if (dataTypeNames.indexOf(dataType) !== -1 && loadedDataTypes[dataType].Options) {
		// @ts-ignore
		Options = loadedDataTypes[dataType].Options;
	}

	// @ts-ignore
	if (dataType && dataTypeNames.indexOf(dataType) !== -1 && loadedDataTypes[dataType].Help) {
		// @ts-ignore
		Help = loadedDataTypes[dataType].Help;
	}

	return { Options, Example, Help };
};


type DataTypeProcessOrders = {
	[name in DataTypeFolder]?: number;
}

export const processOrders: DataTypeProcessOrders = {};
Object.keys(dataTypes).map((dataType: DataTypeFolder) => {
	processOrders[dataType] = dataTypes[dataType].processOrder ? dataTypes[dataType].processOrder : 1;
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

export const getDataTypeExports = (dataType: DataTypeFolder): any => {
	const TmpOptions = (): null => null;
	const TmpExample = (): null => null;
	const TmpHelp = (): null => null;

	// pity, this
	if (!dataType || !loadedDataTypes[dataType]) {
		return {
			Options: TmpOptions,
			Example: TmpExample,
			Help: TmpHelp
		};
	}

	const { Example, Options, Help, generate, getMetadata, rowStateReducer } = loadedDataTypes[dataType] as DTBundle;
	return { Example, Options, Help, generate, getMetadata, rowStateReducer };
};

export const getDataTypeName = (dataType: DataTypeFolder) => {
	if (!dataType || !dataTypes[dataType]) {
		return '';
	}
	return dataTypes[dataType].name;
};
