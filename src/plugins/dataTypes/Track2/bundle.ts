import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { generate, getMetadata } from './Track2.generate';

const definition: DTDefinition = {
	name: 'Track 2',
	fieldGroup: 'credit_card_data',
	fieldGroupOrder: 50
};

export default {
	definition,
	generate,
	getMetadata
} as DTBundle;
