import { DTDefinition } from '../../../../types/dataTypes';

export { Help } from './GUID.ui';
export { generate, getMetadata } from './GUID.generate';

const definition: DTDefinition = {
	name: 'GUID',
	fieldGroup: 'numeric',
	fieldGroupOrder: 50,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Help', 'getMetadata'
	]
};

export default definition;
