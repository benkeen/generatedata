import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'AutoIncrement',
	fieldGroup: 'numeric',
	fieldGroupOrder: 20,
	exports: [
		'Options', 'Help', 'Example', 'rowStateReducer', 'getMetadata'
	],
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			incrementStart: {
				type: 'number'
			},
			incrementValue: {
				type: 'number'
			},
			incrementPlaceholder: {
				type: 'string'
			}
		},
		required: [
			'incrementStart',
			'incrementValue'
		]
	}
};

export default definition;
