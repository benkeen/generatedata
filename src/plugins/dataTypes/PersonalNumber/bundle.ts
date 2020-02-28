import { DTDefinition } from '../../../../types/dataTypes';

export { Example, Options, Help } from './PersonalNumber.ui';
export { generate, getMetadata } from './PersonalNumber.generate';

const definition: DTDefinition = {
	name: 'Personal Number',
	fieldGroup: 'human_data',
	fieldGroupOrder: 110,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'getMetadata'
	],
};

export default definition;
