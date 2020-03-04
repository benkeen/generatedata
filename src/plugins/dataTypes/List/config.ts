import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Custom List',
	fieldGroup: 'other',
	fieldGroupOrder: 40,
	schema: {
		type: 'object',
		properties: {
			listType: {
				enum: [
					'exactly',
					'atMost'
				]
			},
			exactly: {
				type: 'number'
			},
			atMost: {
				type: 'number'
			},
			list: {
				type: 'string'
			}
		},
		required: [
			'listType',
			'list'
		]
	}
};

export default definition;
