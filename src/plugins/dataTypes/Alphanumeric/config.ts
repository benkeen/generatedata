import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Boolean',
	fieldGroup: 'numeric',
	fieldGroupOrder: 10,
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