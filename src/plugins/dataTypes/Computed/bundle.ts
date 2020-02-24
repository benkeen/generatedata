import { DTDefinition } from '../../../../types/dataTypes';
import { Example, Options, Help } from './Computed.ui';
import { generate } from './Computed.generate';


const config: DTDefinition = {
	name: 'Computed',
	fieldGroup: 'other',
	fieldGroupOrder: 60,

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
	generate
};
