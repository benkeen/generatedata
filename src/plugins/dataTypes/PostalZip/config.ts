import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Postal / Zip',
	fieldGroup: 'geo',
	fieldGroupOrder: 30,
	processOrder: 3,
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
