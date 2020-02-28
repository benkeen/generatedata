import { DTDefinition } from '../../../../types/dataTypes';

export { generate } from './Email.generate';

const definition: DTDefinition = {
	name: 'Email',
	fieldGroup: 'human_data',
	fieldGroupOrder: 30,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	]
};

export default definition;
