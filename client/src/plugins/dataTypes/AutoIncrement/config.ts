import { DTDefinition } from '~types/dataTypes';

const definition: DTDefinition = {
	fieldGroup: 'numeric',
	fieldGroupOrder: 20,
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			incrementStart: {
				type: 'number'
			},
			incrementValue: {
				type: 'number'
			},
			incrementPlaceholder: {
				type: 'string'
			}
		},
		required: [
			'incrementStart',
			'incrementValue'
		]
	}
};

export default definition;
