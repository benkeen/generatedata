import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Constant',
	fieldGroup: 'other',
	fieldGroupOrder: 10,
	processOrder: 100,
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
