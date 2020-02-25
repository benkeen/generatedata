import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './PersonalNumber.ui';
import { generate, getMetadata } from './PersonalNumber.generate';

const definition: DTDefinition = {
	name: 'Personal Number',
	fieldGroup: 'human_data',
	fieldGroupOrder: 110
};

const bundle: DTBundle = {
	definition,
	Example,
	Options,
	Help,
	generate,
	getMetadata
};

export default bundle;
