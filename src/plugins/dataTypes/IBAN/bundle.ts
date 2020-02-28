import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Help } from './IBAN.ui';
import { generate, getMetadata } from './IBAN.generate';

const definition: DTDefinition = {
	name: 'IBAN',
	fieldGroup: 'human_data',
	fieldGroupOrder: 100,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Help', 'Example', 'rowStateReducer', 'getMetadata'
	],
};

const bundle: DTBundle = {
	definition,
	Help,
	generate,
	getMetadata
};

export default bundle;
