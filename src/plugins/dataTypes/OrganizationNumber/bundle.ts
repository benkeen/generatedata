import { DTDefinition, DTBundle } from '../../../../types/dataTypes';
import { Example, Options, Help } from './OrganizationNumber.ui';
import { generate } from './OrganizationNumber.generate';

const definition: DTDefinition = {
	name: 'Organization Number',
	fieldGroup: 'human_data',
	fieldGroupOrder: 111,
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
	Help,
	generate
};

export default bundle;
