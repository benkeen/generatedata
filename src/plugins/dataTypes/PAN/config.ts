import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'PAN',
	fieldGroup: 'credit_card_data',
	fieldGroupOrder: 10,
	exports: [
		'Options', 'Help', 'Example', 'getMetadata'
	],
	schema: {
		properties: {
			brand: {
				type: 'string'
			},
			separator: {
				type: 'string'
			},
			format: {
				type: 'array'
			},
			length: {
				type: 'string'
			},
			randomCard: {
				type: 'array'
			}
		},
		required: [
			'brand',
			'length'
		]
	}
};

export default definition;
