import { DTDefinition } from '@generatedata/types';

const definition: DTDefinition = {
  fieldGroup: 'humanData',
  fieldGroupOrder: 30,
  dependencies: [
    'Alphanumeric',
    'AutoIncrement',
    'Boolean',
    'City',
    'Company',
    'Constant',
    'Country',
    'Currency',
    'CVV',
    'Date',
    'GUID',
    'IBAN',
    'LatLng',
    'List',
    'Names',
    'NormalDistribution',
    'NumberRange',
    'OrganizationNumber',
    'PAN',
    'PersonalNumber',
    'Phone',
    'PIN',
    'PostalZip',
    'Region',
    'Rut',
    'SIRET',
    'StreetAddress',
    'TextFixed',
    'TextRandom',
    'Track1',
    'Track2'
  ]
};

export default definition;
