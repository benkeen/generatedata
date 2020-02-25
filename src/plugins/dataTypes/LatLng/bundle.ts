import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Options, Help } from './LatLng.ui';
import { generate, getMetadata } from './LatLng.generate';

const definition: DTDefinition = {
	name: 'Latitude / Longitude',
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

const bundle: DTBundle = {
	definition,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;
