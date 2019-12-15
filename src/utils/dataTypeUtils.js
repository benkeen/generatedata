import { coreConfig } from '../core';
import dataTypeInfo from '../../build/dataTypes';
import { dataTypes, dataTypeNames } from '../../build/dataTypesListUI';
import { getStrings } from './langUtils';

// used for the Data Type selection dropdown
export const getSortedGroupedDataTypes = () => {
	const i18n = getStrings();

	let groupedOptions = [];
	coreConfig.dataTypeGroups.map((group) => {
		const options = dataTypeInfo.filter((dataType) => dataType.fieldGroup === group).map((i) => {
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


export const getDataTypeComponentsWithFallback = (dataType) => {
	let Options = () => null;
	let Example = () => null;
	let Help = () => null;

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

export const getDataTypeDefaultState = (dataType) => {
	return dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].state ? dataTypes[dataType].state : null;
};
