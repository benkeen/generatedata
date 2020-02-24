import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { generate, getMetadata } from './StreetAddress.generate';

const definition: DTDefinition = {
	name: 'Street Address',
	fieldGroup: 'geo',
	fieldGroupOrder: 10
};

export default {
	definition,
	generate,
	getMetadata
} as DTBundle;
