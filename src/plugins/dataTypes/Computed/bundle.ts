import { DTDefinition } from '../../../../types/dataTypes';

export { Example, Options, Help } from './Computed.ui';
export { generate } from './Computed.generate';

const definition: DTDefinition = {
	name: 'Computed',
	fieldGroup: 'other',
	fieldGroupOrder: 60,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example'
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

export default definition;
