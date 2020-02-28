import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Help, Options } from './NumberRange.ui';
import { generate, getMetadata } from './NumberRange.generate';

const definition: DTDefinition = {
	name: 'Number Range',
	fieldGroup: 'numeric',
	fieldGroupOrder: 30,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'rowStateReducer', 'getMetadata'
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

const bundle: DTBundle = {
	definition,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;
