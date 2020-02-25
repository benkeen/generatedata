import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Options } from './NormalDistribution.ui';
import { generate, getMetadata } from './NormalDistribution.generate';

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

const bundle: DTBundle = {
	definition,
	Options,
	generate,
	getMetadata
};

export default bundle;
