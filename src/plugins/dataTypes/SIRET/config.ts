import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'SIRET',
	fieldGroup: 'humanData',
	fieldGroupOrder: 100,
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
