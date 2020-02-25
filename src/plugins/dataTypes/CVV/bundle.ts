import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Help } from './CVV.ui';
import { generate, getMetadata } from './CVV.generate';

const definition: DTDefinition = {
	name: 'CVV',
	fieldGroup: 'credit_card_data',
	fieldGroupOrder: 30
};

const bundle: DTBundle = {
	definition,
	Help,
	generate,
	getMetadata
};

export default bundle;
