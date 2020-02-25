import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { generate, getMetadata } from './City.generate';

const definition: DTDefinition = {
	name: 'City',
	fieldGroup: 'geo',
	fieldGroupOrder: 20,
	processOrder: 3,

	// could we just use TS here? Rethink this.
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
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

const bundle: DTBundle = {
	definition,
	generate,
	getMetadata
};

export default bundle;
