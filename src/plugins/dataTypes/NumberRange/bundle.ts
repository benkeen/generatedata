import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Help, Options } from './NumberRange.ui';
import { generate, getMetadata } from './NumberRange.generate';

const definition: DTDefinition = {
	name: 'Number Range',
	fieldGroup: 'numeric',
	fieldGroupOrder: 30,
	schema: {
		type: 'object',
		properties: {
			rangeMin: {
				type: 'number'
			},
			rangeMax: {
				type: 'number'
			}
		},
		required: [
			'rangeMin',
			'rangeMax'
		]
	}
};

export default {
	definition,
	Help,
	Options,
	generate,
	getMetadata
} as DTBundle;
