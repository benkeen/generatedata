import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { generate, getMetadata } from './Track1.generate';

const definition: DTDefinition = {
	name: 'Track 1',
	fieldGroup: 'credit_card_data',
	fieldGroupOrder: 40
};

const bundle: DTBundle = {
	definition,
	generate,
	getMetadata
};

export default bundle;
