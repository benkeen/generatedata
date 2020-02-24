import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { generate, getMetadata } from './Track1.generate';

const definition: DTDefinition = {
	name: 'Track 1',
	fieldGroup: 'credit_card_data',
	fieldGroupOrder: 40
};

export default {
	definition,
	generate,
	getMetadata
} as DTBundle;
