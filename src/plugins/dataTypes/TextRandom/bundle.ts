import { DTDefinition } from '../../../../types/dataTypes';

export { generate, getMetadata } from './TextRandom.generate';

const definition: DTDefinition = {
	name: 'Random Number of Words',
	fieldGroup: 'text',
	fieldGroupOrder: 10,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'rowStateReducer', 'getMetadata'
	],
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			startsWithLipsum: {
				type: 'boolean'
			},
			minWords: {
				type: 'integer',
				minimum: 1
			},
			maxWords: {
				type: 'integer',
				minimum: 1
			}
		},
		required: [
			'startsWithLipsum',
			'minWords',
			'maxWords'
		]
	}
};

export default definition;
