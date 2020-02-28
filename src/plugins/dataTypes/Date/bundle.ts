import { DTDefinition } from '../../../../types/dataTypes';

export { Help, Example, Options } from './Date.ui';
export { generate } from './Date.generate';

const definition: DTDefinition = {
	name: 'Date',
	fieldGroup: 'human_data',
	fieldGroupOrder: 40,
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
			fromDate: {
				type: 'string'
			},
			toDate: {
				type: 'string'
			},
			placeholder: {
				type: 'string'
			}
		},
		required: [
			'fromDate',
			'toDate',
			'placeholder'
		]
	}
};

export default definition;
