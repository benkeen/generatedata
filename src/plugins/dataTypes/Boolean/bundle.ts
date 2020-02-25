import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './Boolean.ui';
import { rowStateReducer, generate, getMetadata } from './Boolean.generate';

const definition: DTDefinition = {
	name: 'Alphanumeric',
	fieldGroup: 'numeric',
	fieldGroupOrder: 11,
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
	Example,
	Options,
	Help,
	rowStateReducer,
	generate,
	getMetadata
};

export default bundle;
