import { DTDefinition } from '../../../../types/dataTypes';
import { Example, Options, Help } from './Alphanumeric.ui';
import { rowStateReducer, generate, getMetadata } from './Alphanumeric.generate';

const config: DTDefinition = {
	name: 'Alphanumeric',
	fieldGroup: 'numeric',
	fieldGroupOrder: 10,

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
	config,
	Example,
	Options,
	Help,
	rowStateReducer,
	generate,
	getMetadata
};
