import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Help } from './PIN.ui';
import { generate, getMetadata } from './PIN.generate';

const definition: DTDefinition = {
	name: 'PIN',
	fieldGroup: 'credit_card_data',
	fieldGroupOrder: 20,
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
