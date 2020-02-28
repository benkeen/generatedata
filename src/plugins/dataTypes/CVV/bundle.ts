import { DTDefinition } from '../../../../types/dataTypes';

export { Help } from './CVV.ui';
export { generate, getMetadata } from './CVV.generate';

const definition: DTDefinition = {
	name: 'CVV',
	fieldGroup: 'credit_card_data',
	fieldGroupOrder: 30,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Help', 'rowStateReducer', 'getMetadata'
	]
};

export default definition;
