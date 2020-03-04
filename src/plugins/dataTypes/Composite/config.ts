import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Composite',
	fieldGroup: 'other',
	fieldGroupOrder: 20,
	processOrder: 150,
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
