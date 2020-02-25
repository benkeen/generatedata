import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Help } from './Composite.ui';
import { generate, getMetadata } from './Composite.generate';


const definition: DTDefinition = {
	name: 'Composite',
	fieldGroup: 'other',
	fieldGroupOrder: 20,
	processOrder: 150,
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			placeholder: {
				type: 'string'
			}
		},
		required: [
			'placeholder'
		]
	}
};

const bundle: DTBundle = {
	definition,
	Help,
	generate,
	getMetadata
};

export default bundle;
