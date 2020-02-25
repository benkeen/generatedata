import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { generate } from './Email.generate';

const definition: DTDefinition = {
	name: 'Email',
	fieldGroup: 'human_data',
	fieldGroupOrder: 30
};

const bundle: DTBundle = {
	definition,
	generate
};

export default bundle;
