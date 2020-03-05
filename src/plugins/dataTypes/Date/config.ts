import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Date',
	fieldGroup: 'humanData',
	fieldGroupOrder: 40,
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			fromDate: {
				type: 'string'
			},
			toDate: {
				type: 'string'
			},
			placeholder: {
				type: 'string'
			}
		},
		required: [
			'fromDate',
			'toDate',
			'placeholder'
		]
	}
};

export default definition;
