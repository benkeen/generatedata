import { coreConfig } from '../core';
// @ts-ignore-line
import dataTypeInfo from '../../build/dataTypes';
// @ts-ignore-line
import { dataTypes, dataTypeNames } from '../../build/dataTypesListUI';
import { getStrings } from './langUtils';
import {DataTypeUIExampleProps, DataTypeUIHelpProps, DataTypeUIOptionsProps} from "../../types/general";

// used for the Data Type selection dropdown
export const getSortedGroupedDataTypes = () => {
	const i18n = getStrings();

	let groupedOptions: any = [];
	coreConfig.dataTypeGroups.map((group: string) => {
		const options = dataTypeInfo.filter((dataType: any) => dataType.fieldGroup === group).map((i: any) => {
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


export const getDataTypeComponentsWithFallback = (dataType: string | null) => {
	let Options = (): any => null;
	let Example = (): any => null;
	let Help = (): any => null;

	if (dataTypeNames.indexOf(dataType) !== -1 && dataTypes[dataType].Options) {
		Options = dataTypes[dataType].Options ;
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
