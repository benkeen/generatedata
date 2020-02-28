import { DTDefinition } from '../../../../types/dataTypes';

export { Example, Options } from './Rut.ui';
export { generate } from './Rut.generate';

const definition: DTDefinition = {
	name: 'Rut',
	fieldGroup: 'human_data',
	fieldGroupOrder: 105,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Options', 'Example'
	]
};

export default definition;