import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Help } from './Company.ui';
import { generate, getMetadata } from './Company.generate';

const definition: DTDefinition = {
	name: 'Company',
	fieldGroup: 'human_data',
	fieldGroupOrder: 50
};

const bundle: DTBundle = {
	definition,
	Help,
	generate,
	getMetadata
};

export default bundle;
