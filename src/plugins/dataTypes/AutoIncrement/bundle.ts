import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './AutoIncrement.ui';
import { rowStateReducer, generate, getMetadata } from './AutoIncrement.generate';

const definition: DTDefinition = {
	name: 'AutoIncrement',
	fieldGroup: 'numeric',
	fieldGroupOrder: 20,

	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			incrementStart: {
				type: 'number'
			},
			incrementValue: {
				type: 'number'
			},
			incrementPlaceholder: {
				type: 'string'
			}
		},
		required: [
			'incrementStart',
			'incrementValue'
		]
	}
};

const bundle: DTBundle = {
	definition,
	Example,
	Options,
	Help,
	rowStateReducer,
	generate,
	getMetadata
};

export default bundle;
