import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Help, Options } from './SIRET.ui';
import { generate } from './SIRET.generate';

const definition: DTDefinition = {
	name: 'SIRET',
	fieldGroup: 'human_data',
	fieldGroupOrder: 100,
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			example: {
				type: 'string'
			},
			option: {
				type: 'string'
			}
		},
		required: [
			'option'
		]
	}
};

export default {
	definition,
	Help,
	Options,
	generate
} as DTBundle;
