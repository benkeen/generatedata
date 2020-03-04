import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Standard Normal Distribution',
	fieldGroup: 'math',
	fieldGroupOrder: 10,
	schema: {
		type: 'object',
		properties: {
			mean: {
				type: 'string'
			},
			sigma: {
				type: 'string'
			},
			precision: {
				type: 'string'
			}
		},
		required: [
			'mean',
			'sigma',
			'precision'
		]
	}
};

export default definition;
