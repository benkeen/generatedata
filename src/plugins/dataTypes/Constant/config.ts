import { DTDefinition } from '~types/dataTypes';

const definition: DTDefinition = {
	fieldGroup: 'other',
	fieldGroupOrder: 10,
	dependencies: [], // was 100 process order ?
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			loopCount: {
				type: 'number'
			},
			values: {
				type: 'string'
			}
		},
		required: [
			'loopCount',
			'values'
		]
	}
};

export default definition;
