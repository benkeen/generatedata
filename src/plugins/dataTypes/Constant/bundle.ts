import { DTDefinition } from '../../../../types/dataTypes';

export { Example, Options, Help } from './Constant.ui';
export { generate } from './Constant.generate';

const definition: DTDefinition = {
	name: 'Constant',
	fieldGroup: 'other',
	fieldGroupOrder: 10,
	processOrder: 100,
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

export default definition;
