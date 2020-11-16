import { DTDefinition } from '~types/dataTypes';

const definition: DTDefinition = {
	fieldGroup: 'geo',
	fieldGroupOrder: 30,
	dependencies: ['Country', 'Region'],
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			countries: {
				type: 'array',
				minSize: 1
			}
		},
		required: [
			'countries'
		]
	}
};

export default definition;
