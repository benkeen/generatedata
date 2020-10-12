import React from 'react';
import { coreConfig } from '../core';
import { getLocale, getStrings } from './langUtils';
import { dataTypes, DataTypeFolder } from '../_plugins';
import { DTBundle, DTCustomProps, DTHelpProps } from '~types/dataTypes';
import { SmallSpinner, MediumSpinner } from '~components/loaders';
import { Store } from '~types/general';

type LoadedDataTypes = {
	[name in DataTypeFolder]: DTBundle;
}

// this houses all Export Type code loaded async after the application starts
const loadedDataTypes: Partial<LoadedDataTypes> = {};

export const dataTypeNames = Object.keys(dataTypes).map((folder: DataTypeFolder) => dataTypes[folder].name);

// used for the Data Type selection dropdown
let lastLocale: any;
let cachedSortedGroupedDataTypes: any;
export const getSortedGroupedDataTypes = (): any => {
	const locale = getLocale();
	const i18n = getStrings();

	if (cachedSortedGroupedDataTypes && lastLocale == locale) {
		return cachedSortedGroupedDataTypes;
	}

	lastLocale = locale;
	cachedSortedGroupedDataTypes = coreConfig.dataTypeGroups.map((group: string) => {
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
			label: i18n.dataTypes[dataType].NAME
		}));

		return {
			label: i18n.core[group],
			options: sortedOptions
		};
	});

	return cachedSortedGroupedDataTypes;
};

export const DefaultHelpComponent = ({ i18n }: DTHelpProps): JSX.Element => <p dangerouslySetInnerHTML={{ __html: i18n.DESC }} />;

const NoExample = ({ coreI18n, emptyColClass }: any): JSX.Element => <div className={emptyColClass}>{coreI18n.noExamplesAvailable}</div>; // eslint-disable-line
const NoOptions = ({ coreI18n, emptyColClass }: any): JSX.Element => <div className={emptyColClass}>{coreI18n.noOptionsAvailable}</div>; // eslint-disable-line
const showNothing = (): null => null;

export const getDataType = (dataType: DataTypeFolder | null): any => { // TODO return type is important here. Dense method!
	if (!dataType || !loadedDataTypes[dataType]) {
		return {
			name: dataType ? dataTypes[dataType].name : '',
			Example: !dataType ? showNothing : SmallSpinner,
			Options: showNothing,
			Help: !dataType ? showNothing : MediumSpinner
		};
	}

	let Example;
	let Options;
	let Help;

	if (loadedDataTypes[dataType]!.Example) {
		Example = loadedDataTypes[dataType]!.Example;
	} else {
		Example = NoExample;
	}

	if (loadedDataTypes[dataType]!.Options) {
		Options = loadedDataTypes[dataType]!.Options;
	} else {
		Options = NoOptions;
	}

	if (dataType && loadedDataTypes[dataType]!.Help) {
		Help = loadedDataTypes[dataType]!.Help;
	} else {
		Help = DefaultHelpComponent;
	}

	const customProps = (dataType && loadedDataTypes[dataType]!.customProps) ? loadedDataTypes[dataType]!.customProps : {};
	const actionInterceptors = (dataType && loadedDataTypes[dataType]!.actionInterceptors) ? loadedDataTypes[dataType]!.actionInterceptors : {};

	const { getMetadata, rowStateReducer } = loadedDataTypes[dataType] as DTBundle;
	return {
		name: dataTypes[dataType].name,
		Options,
		Help,
		Example,
		getMetadata,
		rowStateReducer,
		customProps,
		actionInterceptors
	};
};

export type ProcessBatches = {
	[dt in DataTypeFolder]?: number;
};

export function RecursiveErrorException (remaining: string[]): void {
	// @ts-ignore-line
	this.possibleProblematicDataTypes = remaining;
	// @ts-ignore-line
	this.name = 'Recursive dependency';
}

/**
 * Data Types can register dependencies on other Data Types, so that when the row data is generated, the script
 * ensures the dependencies are generated first and available for use by other Data Types. For example:
 *
 * Country <- Region <- City
 *
 * Here, the City DT expects the Region DT to be generated first, so it can generate a random city within whatever
 * random region was generated. Then the same goes for Region with Country.
 *
 * This method examines all the dependencies and creates a flat object of dataType => process batch. Any recursive
 * dependencies throw an error.
 */
export const getProcessBatches = (dataTypes: any): ProcessBatches => {
	let dataTypesToProcess = Object.keys(dataTypes);

	const processBatches: ProcessBatches = {};
	let previousLength = dataTypesToProcess.length;
	let currentBatch = 1;

	while (dataTypesToProcess.length > 0) {
		const resolvedDataTypes: any = [];
		dataTypesToProcess.forEach((dataType) => {
			// here, we're dealing with Data Types that have dependencies. Loop through them all and figure out if all
			// of them have already been assigned to a process batch
			const allDependenciesPositioned = !dataTypes[dataType].dependencies || dataTypes[dataType].dependencies.every((dependency: string) => !!processBatches[dependency as DataTypeFolder]);
			if (allDependenciesPositioned) {
				resolvedDataTypes.push(dataType);
			}
		});

		if (resolvedDataTypes.length) {
			resolvedDataTypes.forEach((dataType: string) => {
				processBatches[dataType as DataTypeFolder] = currentBatch;
			});
			dataTypesToProcess = dataTypesToProcess.filter((dataType) => resolvedDataTypes.indexOf(dataType) === -1);
			currentBatch++;
		}

		// simple check: every single pass of the DataTypes should be able to resolve at least one of them to a
		// new batch number. If none got resolved we have a problem.
		if (dataTypesToProcess.length === previousLength) {
			// @ts-ignore-line
			throw new RecursiveErrorException(dataTypesToProcess);
		}

		previousLength = dataTypesToProcess.length;
	}
	return processBatches;
};

export const processBatches = getProcessBatches(dataTypes);

export const requestDataTypeBundle = (dataType: DataTypeFolder): any => {
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


const noValue = {};
export const getCustomProps = (customProps: DTCustomProps, state: Store): object => {
	const values: any = noValue;
	if (customProps) {
		Object.keys(customProps).map((propName: string) => {
			values[propName] = customProps[propName](state);
		});
	}

	return values;
};



