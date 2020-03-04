import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Number Range',
	fieldGroup: 'numeric',
	fieldGroupOrder: 30,
	schema: {
		type: 'object',
		properties: {
			rangeMin: {
				type: 'number'
			},
			rangeMax: {
				type: 'number'
			}
		},
		required: [
			'rangeMin',
			'rangeMax'
		]
	}
};

export default definition;
