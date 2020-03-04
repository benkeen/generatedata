import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Currency',
	fieldGroup: 'numeric',
	fieldGroupOrder: 60,
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			format: {
				type: 'string'
			},
			rangeFrom: {
				type: 'string'
			},
			rangeTo: {
				type: 'string'
			},
			symbol: {
				type: 'string'
			},
			symbolLocation: {
				enum: [
					'prefix',
					'suffix'
				]
			}
		},
		required: [
			'format',
			'rangeFrom',
			'rangeTo'
		]
	}
};

export default definition;
