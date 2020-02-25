import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './Alphanumeric.ui';
import { rowStateReducer, generate, getMetadata } from './Alphanumeric.generate';

const definition: DTDefinition = {
	name: 'Boolean',
	fieldGroup: 'numeric',
	fieldGroupOrder: 10,
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
