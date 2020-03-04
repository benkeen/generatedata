import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'City',
	fieldGroup: 'geo',
	fieldGroupOrder: 20,
	processOrder: 3,
	exports: [
		'rowStateReducer', 'getMetadata'
	],

	// could we just use TS here? Rethink this.
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			placeholder: {
				type: 'string'
			}
		},
		required: [
			'placeholder'
		]
	}
};

export default definition;