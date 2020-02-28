import { DTDefinition } from '../../../../types/dataTypes';

export { Example, Options, Help } from './OrganizationNumber.ui';
export { generate } from './OrganizationNumber.generate';

const definition: DTDefinition = {
	name: 'Organization Number',
	fieldGroup: 'human_data',
	fieldGroupOrder: 111,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'getMetadata'
	]
};

export default definition;
