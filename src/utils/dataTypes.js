import { coreConfig } from '../core';
import dataTypes from '../../build/dataTypes';


export const getDataTypes = () => dataTypes; // nah.

export const getDataTypeGroups = () => null;

export const getSortedGroupedDataTypes = () => {
	let groupedOptions = [];
	coreConfig.dataTypeGroups.map((group) => {
		const options = dataTypes.filter((dataType) => dataType.fieldGroup === group).map((i) => ({
			value: i.name,
			label: i.name
		}));

		groupedOptions.push({
			label: group,
			options
		});
	});

	return groupedOptions;
};
