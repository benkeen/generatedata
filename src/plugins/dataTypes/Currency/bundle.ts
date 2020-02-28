import { DTDefinition } from '../../../../types/dataTypes';

export { Help, Example, Options } from './Currency.ui';
export { generate, getMetadata } from './Currency.generate';

const definition: DTDefinition = {
	name: 'Currency',
	fieldGroup: 'numeric',
	fieldGroupOrder: 60,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'getMetadata'
	],
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			format: {
				type: 'string'
			},
			rangeFrom: {
				type: 'string'
			},
			rangeTo: {
				type: 'string'
			},
			symbol: {
				type: 'string'
			},
			symbolLocation: {
				enum: [
					'prefix',
					'suffix'
				]
			}
		},
		required: [
			'format',
			'rangeFrom',
			'rangeTo'
		]
	}
};

export default definition;
