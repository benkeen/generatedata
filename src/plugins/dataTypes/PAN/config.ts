import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'PAN',
	fieldGroup: 'creditCardData',
	fieldGroupOrder: 10,
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
