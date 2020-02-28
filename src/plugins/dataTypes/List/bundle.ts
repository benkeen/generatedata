import { DTDefinition } from '../../../../types/dataTypes';

export { Example, Options, Help } from './List.ui';
export { generate, getMetadata } from './List.generate';

const definition: DTDefinition = {
	name: 'Custom List',
	fieldGroup: 'other',
	fieldGroupOrder: 40,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'getMetadata'
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

export default definition;
