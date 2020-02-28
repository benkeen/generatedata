import { DTDefinition } from '../../../../types/dataTypes';

export { Help } from './PIN.ui';
export { generate, getMetadata } from './PIN.generate';

const definition: DTDefinition = {
	name: 'PIN',
	fieldGroup: 'credit_card_data',
	fieldGroupOrder: 20,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Help', 'getMetadata'
	]
};

export default definition;
