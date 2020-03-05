import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Names',
	fieldGroup: 'humanData',
	fieldGroupOrder: 10,
	schema: {
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
