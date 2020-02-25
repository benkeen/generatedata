import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Help, Example, Options } from './Date.ui';
import { generate } from './Date.generate';

const definition: DTDefinition = {
	name: 'Date',
	fieldGroup: 'human_data',
	fieldGroupOrder: 40,
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			fromDate: {
				type: 'string'
			},
			toDate: {
				type: 'string'
			},
			placeholder: {
				type: 'string'
			}
		},
		required: [
			'fromDate',
			'toDate',
			'placeholder'
		]
	}
};

const bundle: DTBundle = {
	definition,
	Example,
	Options,
	Help,
	generate
};

export default bundle;
