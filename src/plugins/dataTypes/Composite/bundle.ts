import { DTDefinition } from '../../../../types/dataTypes';

export { Help } from './Composite.ui';
export { generate, getMetadata } from './Composite.generate';


const definition: DTDefinition = {
	name: 'Composite',
	fieldGroup: 'other',
	fieldGroupOrder: 20,
	processOrder: 150,
	localeFiles: [
		'de', 'en', 'es', 'fr', 'nl'
	],
	exports: [
		'Help', 'getMetadata'
	],
	schema: {
		$schema: 'http://json-schema.org/draft-04/schema#',
		type: 'object',
		properties: {
			placeholder: {
				type: 'string'
			}
		},
		required: [
			'placeholder'
		]
	}
};

export default definition;
