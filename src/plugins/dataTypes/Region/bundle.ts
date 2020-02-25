import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Help, Options } from './Region.ui';
import { generate } from './Region.generate';

const definition: DTDefinition = {
	name: 'Region',
	fieldGroup: 'geo',
	fieldGroupOrder: 40,
	processOrder: 2,
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

const bundle: DTBundle = {
	definition,
	Options,
	Help,
	generate,
};

export default bundle;
