import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Help, Options } from './SIRET.ui';
import { generate } from './SIRET.generate';

const definition: DTDefinition = {
	name: 'SIRET',
	fieldGroup: 'human_data',
	fieldGroupOrder: 100,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'rowStateReducer', 'getMetadata'
	],
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

const bundle: DTBundle = {
	definition,
	Options,
	Help,
	generate
};

export default bundle;
