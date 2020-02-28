import { DTDefinition } from '../../../../types/dataTypes';

export { Options } from './NormalDistribution.ui';
export { generate, getMetadata } from './NormalDistribution.generate';

const definition: DTDefinition = {
	name: 'Standard Normal Distribution',
	fieldGroup: 'math',
	fieldGroupOrder: 10,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'getMetadata'
	],
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
