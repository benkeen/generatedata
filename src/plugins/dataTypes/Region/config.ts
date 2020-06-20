import { DTDefinition } from '~types/dataTypes';

const definition: DTDefinition = {
	name: 'Region',
	fieldGroup: 'geo',
	fieldGroupOrder: 40,
	dependencies: ['Country'],
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			countries: {
				type: 'object'
			}
		}
	}
};

export default definition;
