import { DTDefinition } from '../../../../types/dataTypes';

export { Help } from './PostalZip.ui';
export { generate, getMetadata } from './PostalZip.generate';

const definition: DTDefinition = {
	name: 'Postal / Zip',
	fieldGroup: 'geo',
	fieldGroupOrder: 30,
	processOrder: 3,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Help', 'getMetadata'
	],
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			countries: {
				type: 'array',
				minSize: 1
			}
		},
		required: [
			'countries'
		]
	}
};

export default definition;
