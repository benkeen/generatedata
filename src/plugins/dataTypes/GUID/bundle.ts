import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Help } from './GUID.ui';
import { generate, getMetadata } from './GUID.generate';

const definition: DTDefinition = {
	name: 'GUID',
	fieldGroup: 'numeric',
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
