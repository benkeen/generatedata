import { DTDefinition } from '~types/dataTypes';

const definition: DTDefinition = {
	fieldGroup: 'countrySpecific',
	fieldGroupOrder: 10,
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			example: {
				type: 'string'
			},
			option: {
				type: 'string'
			}
		},
		required: [
			'option'
		]
	}
};

export default definition;
