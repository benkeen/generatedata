import { DTDefinition } from '../../../../types/dataTypes';
export { Example, Options, Help } from './Boolean.ui';
export { rowStateReducer, generate, getMetadata } from './Boolean.generate';

const definition: DTDefinition = {
	name: 'Alphanumeric',
	fieldGroup: 'numeric',
	fieldGroupOrder: 11,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'rowStateReducer', 'getMetadata'
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