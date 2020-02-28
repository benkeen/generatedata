import { DTDefinition } from '../../../../types/dataTypes';
export { generate, getMetadata } from './Track2.generate';

const definition: DTDefinition = {
	name: 'Track 2',
	fieldGroup: 'credit_card_data',
	fieldGroupOrder: 50,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'rowStateReducer', 'getMetadata'
	],
};

export default definition;