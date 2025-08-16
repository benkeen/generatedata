import { DTDefinition } from '~types/dataTypes';

const definition: DTDefinition = {
	fieldGroup: 'other',
	fieldGroupOrder: 20,
	dependencies: [
		'Alphanumeric', 'AutoIncrement', 'Boolean', 'City', 'Company', 'Constant', 'Country', 'Currency',
		'CVV', 'Date', 'Email', 'GUID', 'IBAN', 'LatLng', 'List', 'Names', 'NormalDistribution', 'NumberRange',
		'OrganizationNumber', 'PAN', 'PersonalNumber', 'Phone', 'PIN', 'PostalZip', 'Region', 'Rut', 'SIRET',
		'StreetAddress', 'TextFixed', 'TextRandom', 'Track1', 'Track2', 'WeightedList'
	]
};

export default definition;
