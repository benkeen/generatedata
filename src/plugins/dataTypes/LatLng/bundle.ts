import { DTDefinition } from '../../../../types/dataTypes';

export { Options, Help } from './LatLng.ui';
export { generate, getMetadata } from './LatLng.generate';

const definition: DTDefinition = {
	name: 'Latitude / Longitude',
	fieldGroup: 'geo',
	fieldGroupOrder: 100,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'getMetadata'
	],
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
