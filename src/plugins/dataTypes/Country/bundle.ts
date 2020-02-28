import { DTDefinition } from '../../../../types/dataTypes';

export { Options } from './Country.ui';
export { generate } from './Country.generate';

const definition: DTDefinition = {
	name: 'Country',
	fieldGroup: 'geo',
	fieldGroupOrder: 50,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'rowStateReducer', 'getMetadata'
	],
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			limitCountriesToSelectedPlugins: {
				type: 'boolean'
			}
		},
		required: [
			'limitCountriesToSelectedPlugins'
		]
	}
};

export default definition;
