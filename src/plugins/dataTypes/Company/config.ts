import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Company',
	fieldGroup: 'human_data',
	fieldGroupOrder: 50,
	exports: [
		'Help', 'getMetadata'
	]
};

export default definition;
