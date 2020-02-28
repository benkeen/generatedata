import { DTBundle, DTDefinition } from '../../../../types/dataTypes';
import { Example, Options, Help } from './Computed.ui';
import { generate } from './Computed.generate';

const definition: DTDefinition = {
	name: 'Computed',
	fieldGroup: 'other',
	fieldGroupOrder: 60,
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
	generate
};

export default bundle;
