import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'PIN',
	fieldGroup: 'credit_card_data',
	fieldGroupOrder: 20,
	exports: [
		'Help', 'getMetadata'
	]
};

export default definition;
