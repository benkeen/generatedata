import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './Phone.ui';
import { generate, getMetadata } from './Phone.generate';

const definition: DTDefinition = {
	name: 'Phone / Fax',
	fieldGroup: 'human_data',
	fieldGroupOrder: 20,
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
	generate,
	getMetadata
};

export default bundle;
