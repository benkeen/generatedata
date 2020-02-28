import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './PersonalNumber.ui';
import { generate, getMetadata } from './PersonalNumber.generate';

const definition: DTDefinition = {
	name: 'Personal Number',
	fieldGroup: 'human_data',
	fieldGroupOrder: 110,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'rowStateReducer', 'getMetadata'
	],
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
