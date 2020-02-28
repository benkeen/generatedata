import { DTDefinition } from '../../../../types/dataTypes';

export { generate, getMetadata } from './Track1.generate';

const definition: DTDefinition = {
	name: 'Track 1',
	fieldGroup: 'credit_card_data',
	fieldGroupOrder: 40,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'rowStateReducer', 'getMetadata'
	]
};

export default definition;
