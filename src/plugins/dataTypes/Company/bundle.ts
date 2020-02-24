import { DTDefinition } from '../../../../types/dataTypes';
import { Help } from './Company.ui';
import { generate, getMetadata } from './Company.generate';


const config: DTDefinition = {
	name: 'Company',
	fieldGroup: 'human_data',
	fieldGroupOrder: 50
};

export default {
	config,
	Help,
	generate,
	getMetadata
};
