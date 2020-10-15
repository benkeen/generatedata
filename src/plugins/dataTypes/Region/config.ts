import { DTDefinition } from '~types/dataTypes';

const definition: DTDefinition = {
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
