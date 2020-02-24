import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Help } from './PIN.ui';
import { generate, getMetadata } from './PIN.generate';

const definition: DTDefinition = {
	name: 'PIN',
	fieldGroup: 'credit_card_data',
	fieldGroupOrder: 20
};

export default {
	definition,
	Help,
	generate,
	getMetadata
} as DTBundle;
