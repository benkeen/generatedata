import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Country',
	fieldGroup: 'geo',
	fieldGroupOrder: 50,
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
