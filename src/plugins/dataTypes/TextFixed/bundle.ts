import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { generate, getMetadata } from './TextFixed.generate';

const definition: DTDefinition = {
	name: 'Fixed Number of Words',
	fieldGroup: 'text',
	fieldGroupOrder: 10,
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			numWords: {
				type: 'integer',
				minimum: 1
			}
		},
		required: [
			'numWords'
		]
	}
};

const bundle: DTBundle = {
	definition,
	generate,
	getMetadata
};

export default bundle;
