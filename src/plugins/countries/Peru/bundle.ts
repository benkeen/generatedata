import { CountryType } from '../../../../types/countries';

export default (i18n: any): CountryType => ({
	countryName: i18n.countryName,
	countrySlug: 'peru',
	regionNames: i18n.regionNames,
	continent: 'south_america',
	extendedData: {
		zipFormat: {
			format: 'Zxxxx',
			replacements: {
				A: '1234',
				x: '0123456789'
			}
		},
		phoneFormat: {
			displayFormats: ['Xxx xxx xxx']
		}
	},
	regions: [
		{
			regionName: 'Piura',
			regionShort: 'PIU',
			regionSlug: 'piura',
			weight: 16,
			cities: [
				'Piura', 'Sullana', 'Paita', 'Catacaos', 'Talara', 'Chulucanas', 'Sechura'
			]
		},
		{
			regionName: 'La Libertad',
			regionShort: 'LAL',
			regionSlug: 'lalibertad',
			weight: 15,
			cities: [
				'Trujillo', 'Chepén', 'Pacasmayo', 'Guadalupe',
			]
		},
		{
			regionName: 'Cajamarca',
			regionShort: 'CAJ',
			regionSlug: 'cajamarca',
			weight: 14,
			cities: [
				'Cajamarca', 'Jaén'
			]
		},
		{
			regionName: 'Puno',
			regionShort: 'PUN',
			regionSlug: 'puno',
			weight: 12,
			cities: [
				'Juliaca', 'Puno'
			]
		},
		{
			regionName: 'Cusco',
			regionShort: 'CUS',
			regionSlug: 'cusco',
			weight: 12,
			cities: [
				'Cusco', 'Sicuani'
			]
		},
		{
			regionName: 'Arequipa',
			regionShort: 'ARE',
			regionSlug: 'arequipa',
			weight: 11,
			cities: [
				'Arequipa'
			]
		},
		{
			regionName: 'Junín',
			regionShort: 'JUN',
			regionSlug: 'junín',
			weight: 11,
			cities: [
				'Huancayo', 'Tarma'
			]
		},
		{
			regionName: 'Lambayeque',
			regionShort: 'LAM',
			regionSlug: 'lambayeque',
			weight: 11,
			cities: [
				'Chiclayo', 'Lambayeque'
			]
		},
		{
			regionName: 'Ancash',
			regionShort: 'ANC',
			regionSlug: 'ancash',
			weight: 10,
			cities: [
				'Chimbote', 'Huaraz'
			]
		},
		{
			regionName: 'Loreto',
			regionShort: 'LOR',
			regionSlug: 'loreto',
			weight: 9,
			cities: [
				'Iquitos', 'Yurimaguas'
			]
		},
		{
			regionName: 'Lima',
			regionShort: 'LIM',
			regionSlug: 'Lima',
			weight: 9,
			cities: [
				'Lima', 'Huacho', 'Huaral', 'San Vicente de Cañete', 'Barranca', 'Chancay', 'Mala'
			]
		}
	]
});
