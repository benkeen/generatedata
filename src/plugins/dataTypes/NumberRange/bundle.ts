import { DTDefinition } from '../../../../types/dataTypes';

export { Help, Options } from './NumberRange.ui';
export { generate, getMetadata } from './NumberRange.generate';

const definition: DTDefinition = {
	name: 'Number Range',
	fieldGroup: 'numeric',
	fieldGroupOrder: 30,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'getMetadata'
	],
	schema: {
		type: 'object',
		properties: {
			rangeMin: {
				type: 'number'
			},
			rangeMax: {
				type: 'number'
			}
		},
		required: [
			'rangeMin',
			'rangeMax'
		]
	}
};

export default definition;
