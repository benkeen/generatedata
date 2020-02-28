import { DTDefinition } from '../../../../types/dataTypes';

export { Example, Options, Help } from './Alphanumeric.ui';
export { rowStateReducer, generate, getMetadata } from './Alphanumeric.generate';

const definition: DTDefinition = {
	name: 'Boolean',
	fieldGroup: 'numeric',
	fieldGroupOrder: 10,
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