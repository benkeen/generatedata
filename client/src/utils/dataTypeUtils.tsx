import React from 'react';
import { getLocale, getStrings } from './langUtils';
import { dataTypes, DataTypeFolder, blacklistedDataTypeFolders } from '../../_plugins';
import { DTBundle, DTCustomProps, DTHelpProps } from '~types/dataTypes';
import { Store } from '~types/general';
import C from '~core/constants';

type LoadedDataTypes = {
	[name in DataTypeFolder]: DTBundle;
}

// this houses all Export Type code loaded async after the application starts
const loadedDataTypes: Partial<LoadedDataTypes> = {};

export const dataTypeNames = Object.keys(dataTypes);

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
	cachedSortedGroupedDataTypes = C.DATA_TYPE_GROUPS.map((group: string) => {
		const options = Object.keys(dataTypes)
			.filter((dataType: DataTypeFolder) => dataTypes[dataType].fieldGroup === group)
			.filter((dataType: DataTypeFolder) => blacklistedDataTypeFolders.indexOf(dataType) === -1)
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

const showNothing = (): null => null;

export const getDataType = (dataType: DataTypeFolder | null): any => { // TODO return type is important here. Dense method!
	if (!dataType || !loadedDataTypes[dataType]) {
		return {
			Example: !dataType ? showNothing : null,
			Options: showNothing,
			Help: null,
			isLoaded: false
		};
	}

	let Example = null;
	let Options = null;
	let Help;

	if (loadedDataTypes[dataType]!.Example) {
		Example = loadedDataTypes[dataType]!.Example;
	}

	if (loadedDataTypes[dataType]!.Options) {
		Options = loadedDataTypes[dataType]!.Options;
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
		isLoaded: true,
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
 * Data Types can register dependencies on other Data Types (the `dependencies` property of their config.ts file) so
 * that when the row data is generated, the script ensures the dependencies are generated first and available for use.
 * For example:
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


// returns a hash of { [data type] => [array of affected data types] }. This means that when the property Data Type
// is changed, the Data Types in the key array could be affected
export const getAffectedDataTypes = (dataTypes: any): any => {
	const affectedDataTypes: any = {};

	Object.keys(dataTypes).forEach((dataType: DataTypeFolder) => {
		if (!affectedDataTypes[dataType]) {
			affectedDataTypes[dataType] = [];
		}

		if (dataTypes[dataType].dependencies) {
			dataTypes[dataType].dependencies.forEach((dep: DataTypeFolder) => {
				if (!affectedDataTypes[dep]) {
					affectedDataTypes[dep] = [];
				}
				affectedDataTypes[dep].push(dataType);
			});
		}
	});

	return affectedDataTypes;
};

export const affectedDataTypes = getAffectedDataTypes(dataTypes);


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


// TODO - this is causing a repaint on every method call, which is causing the most slowness in the UI. But using
// noValue below doesn't help: when the DT selectors called here return different values, it doesn't get reflected in the UI
// const noValue: any = {};
export const getCustomProps = (customProps: DTCustomProps, state: Store): object => {
	const values: any = {};
	if (customProps) {
		Object.keys(customProps).map((propName: string) => {
			values[propName] = customProps[propName](state);
		});
	}

	return values;
};



