import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './OrganizationNumber.ui';
import { generate } from './OrganizationNumber.generate';

const definition: DTDefinition = {
	name: 'Organization Number',
	fieldGroup: 'human_data',
	fieldGroupOrder: 111
};

export default {
	definition,
	Example,
	Options,
	Help,
	generate
} as DTBundle;
