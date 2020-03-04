import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Fixed Number of Words',
	fieldGroup: 'text',
	fieldGroupOrder: 10,
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			numWords: {
				type: 'integer',
				minimum: 1
			}
		},
		required: [
			'numWords'
		]
	}
};

export default definition;
