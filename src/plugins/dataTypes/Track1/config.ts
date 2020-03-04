import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Track 1',
	fieldGroup: 'credit_card_data',
	fieldGroupOrder: 40,
	exports: [
		'rowStateReducer', 'getMetadata'
	]
};

export default definition;
