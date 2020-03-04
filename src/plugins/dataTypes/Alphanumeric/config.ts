import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Boolean',
	fieldGroup: 'numeric',
	fieldGroupOrder: 10,
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