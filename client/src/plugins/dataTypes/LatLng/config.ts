import { DTDefinition } from '~types/dataTypes';

const definition: DTDefinition = {
	fieldGroup: 'geo',
	fieldGroupOrder: 100,
	schema: {
		type: 'object',
		properties: {
			lat: {
				type: 'boolean'
			},
			lng: {
				type: 'boolean'
			}
		},
		required: [
			'lat',
			'lng'
		]
	}
};

export default definition;
