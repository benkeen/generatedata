import { coreConfig } from '../core';
import dataTypeInfo from '../../build/dataTypes';
import { dataTypes, dataTypeNames } from '../../build/dataTypesListUI';
import { getStrings } from './langUtils';


export const getSortedGroupedDataTypes = () => {
	const i18n = getStrings();

	let groupedOptions = [];
	coreConfig.dataTypeGroups.map((group) => {
		const options = dataTypeInfo.filter((dataType) => dataType.fieldGroup === group).map((i) => {
			let options, example, help;
			if (dataTypeNames.indexOf(i.folder) !== -1 && dataTypes[i.folder].Options) {
				options = dataTypes[i.folder].Options;
			}
			if (dataTypeNames.indexOf(i.folder) !== -1 && dataTypes[i.folder].Example) {
				example = dataTypes[i.folder].Example;
			}
			if (dataTypeNames.indexOf(i.folder) !== -1 && dataTypes[i.folder].Help) {
				help = dataTypes[i.folder].Help;
			}
			return {
				value: i.name,
				label: i.name,
				options,
				example,
				help
			};
		});
		groupedOptions.push({
			label: i18n.core[group],
			options
		});
	});
	return groupedOptions;
};
