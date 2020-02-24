import { DTDefinition } from '../../../../types/dataTypes';
import { Options } from './Country.ui';
import { generate } from './Country.generate';

const config: DTDefinition = {
	name: 'Country',
	fieldGroup: 'geo',
	fieldGroupOrder: 50,
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

export default {
	config,
	Options,
	generate
};
