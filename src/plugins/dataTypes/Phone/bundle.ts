import { DTDefinition } from '../../../../types/dataTypes';

export { Example, Options, Help } from './Phone.ui';
export { generate, getMetadata } from './Phone.generate';

const definition: DTDefinition = {
	name: 'Phone / Fax',
	fieldGroup: 'human_data',
	fieldGroupOrder: 20,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'getMetadata'
	],
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			placeholder: {
				type: 'string'
			}
		},
		required: [
			'placeholder'
		]
	}
};

export default definition;
