import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { generate, getMetadata } from './Tree.generate';

const definition: DTDefinition = {
	name: 'Tree',
	fieldGroup: 'other',
	fieldGroupOrder: 30,
	processOrder: 2,
	schema: {
		title: 'Tree',
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			autoIncRowNum: {
				type: 'integer'
			},
			maxSiblings: {
				type: 'integer',
				minimum: 1
			}
		},
		required: [
			'autoIncRowNum',
			'maxSiblings'
		]
	}
};

const bundle: DTBundle = {
	definition,
	generate,
	getMetadata
};

export default bundle;
