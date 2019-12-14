import { coreConfig } from '../core';
import dataTypes from '../../build/dataTypes';
import { getStrings } from './langUtils';

export const getSortedGroupedDataTypes = () => {
	const i18n = getStrings();

	let groupedOptions = [];
	coreConfig.dataTypeGroups.map((group) => {
		const options = dataTypes.filter((dataType) => dataType.fieldGroup === group).map((i) => ({
			value: i.name,
			label: i.name
		}));
		groupedOptions.push({
			label: i18n.core[group],
			options
		});
	});
	return groupedOptions;
};
