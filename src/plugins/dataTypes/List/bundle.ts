import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './List.ui';
import { generate, getMetadata } from './List.generate';

const definition: DTDefinition = {
	name: 'Custom List',
	fieldGroup: 'other',
	fieldGroupOrder: 40,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'rowStateReducer', 'getMetadata'
	],
	schema: {
		type: 'object',
		properties: {
			listType: {
				enum: [
					'exactly',
					'atMost'
				]
			},
			exactly: {
				type: 'number'
			},
			atMost: {
				type: 'number'
			},
			list: {
				type: 'string'
			}
		},
		required: [
			'listType',
			'list'
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
