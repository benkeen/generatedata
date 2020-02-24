import { DTDefinition } from '../../../../types/dataTypes';
import { Example, Options, Help } from './Constant.ui';
import { generate } from './Constant.generate';

const config: DTDefinition = {
	name: 'Constant',
	fieldGroup: 'other',
	fieldGroupOrder: 10,
	processOrder: 100,
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			loopCount: {
				type: 'number'
			},
			values: {
				type: 'string'
			}
		},
		required: [
			'loopCount',
			'values'
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
