import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Example, Options } from './Rut.ui';
import { generate } from './Rut.generate';

const definition: DTDefinition = {
	name: 'Rut',
	fieldGroup: 'human_data',
	fieldGroupOrder: 105,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'rowStateReducer', 'getMetadata'
	]
};

const bundle: DTBundle = {
	definition,
	Example,
	Options,
	generate
};

export default bundle;
