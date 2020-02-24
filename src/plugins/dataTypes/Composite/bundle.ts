import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Help } from './Composite.ui';
import { generate, getMetadata } from './Composite.generate';


const definition: DTDefinition = {
	name: 'Composite',
	fieldGroup: 'other',
	fieldGroupOrder: 20,
	processOrder: 150,

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

export default {
	definition,
	Help,
	generate,
	getMetadata
} as DTBundle;
