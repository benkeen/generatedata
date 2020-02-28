import { DTDefinition } from '../../../../types/dataTypes';

export { Help } from './IBAN.ui';
export { generate, getMetadata } from './IBAN.generate';

const definition: DTDefinition = {
	name: 'IBAN',
	fieldGroup: 'human_data',
	fieldGroupOrder: 100,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Help', 'getMetadata'
	]
};

export default definition;
