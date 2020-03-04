import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'SIRET',
	fieldGroup: 'human_data',
	fieldGroupOrder: 100,
	exports: [
		'Options', 'Help', 'getMetadata'
	],
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
