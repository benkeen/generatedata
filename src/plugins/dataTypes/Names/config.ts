import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Names',
	fieldGroup: 'human_data',
	fieldGroupOrder: 10,
	exports: [
		'Options', 'Help', 'Example', 'getMetadata'
	],
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
