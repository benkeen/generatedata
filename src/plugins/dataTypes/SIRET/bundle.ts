import { DTDefinition } from '../../../../types/dataTypes';

export { Help, Options } from './SIRET.ui';
export { generate } from './SIRET.generate';

const definition: DTDefinition = {
	name: 'SIRET',
	fieldGroup: 'human_data',
	fieldGroupOrder: 100,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'getMetadata'
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

export default definition;
