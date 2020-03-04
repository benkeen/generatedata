import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Alphanumeric',
	fieldGroup: 'numeric',
	fieldGroupOrder: 11,
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