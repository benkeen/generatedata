import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Example, Options } from './Rut.ui';
import { generate } from './Rut.generate';

const definition: DTDefinition = {
	name: 'Rut',
	fieldGroup: 'human_data',
	fieldGroupOrder: 105,
};

export default {
	definition,
	Example,
	Options,
	generate
} as DTBundle;
