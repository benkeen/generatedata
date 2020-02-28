import { DTDefinition } from '../../../../types/dataTypes';

export { Help } from './Company.ui';
export { generate, getMetadata } from './Company.generate';

const definition: DTDefinition = {
	name: 'Company',
	fieldGroup: 'human_data',
	fieldGroupOrder: 50,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Help', 'getMetadata'
	]
};

export default definition;
