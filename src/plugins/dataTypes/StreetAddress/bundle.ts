import { DTDefinition } from '../../../../types/dataTypes';

export { generate, getMetadata } from './StreetAddress.generate';

const definition: DTDefinition = {
	name: 'Street Address',
	fieldGroup: 'geo',
	fieldGroupOrder: 10,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'rowStateReducer', 'getMetadata'
	],
};

export default definition;
