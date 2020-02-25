import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './Names.ui';
import { generate, getMetadata } from './Names.generate';

const definition: DTDefinition = {
	name: 'Names',
	fieldGroup: 'human_data',
	fieldGroupOrder: 10,
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

const bundle: DTBundle = {
	definition,
	Example,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;
