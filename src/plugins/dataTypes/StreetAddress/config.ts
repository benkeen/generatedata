import { DTDefinition } from '../../../../types/dataTypes';

const definition: DTDefinition = {
	name: 'Street Address',
	fieldGroup: 'geo',
	fieldGroupOrder: 10,
	exports: [
		'rowStateReducer', 'getMetadata'
	],
};

export default definition;
