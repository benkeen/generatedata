import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'IBAN',
	fieldGroup: 'human_data',
	fieldGroupOrder: 100,
	exports: [
		'Help', 'getMetadata'
	]
};

export default definition;
