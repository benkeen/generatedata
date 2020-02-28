import { DTDefinition } from '../../../../types/dataTypes';
import { Help } from './Company.ui';
import { generate, getMetadata } from './Company.generate';

const definition: DTDefinition = {
	name: 'Company',
	fieldGroup: 'human_data',
	fieldGroupOrder: 50,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'rowStateReducer', 'getMetadata'
	]
};

const bundle: DTBundle = {
	definition,
	Help,
	generate,
	getMetadata
};

export default bundle;
