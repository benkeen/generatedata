import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './PAN.ui';
import { generate, getMetadata } from './PAN.generate';

const definition: DTDefinition = {
	name: 'PAN',
	fieldGroup: 'credit_card_data',
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
			random_card: {
				type: 'array'
			}
		},
		required: [
			'brand',
			'length'
		]
	}
};

const bundle: DTBundle = {
	definition,
	Example,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;
