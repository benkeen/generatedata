/**
* Spanish autonomies and cities with population >= 100.000 or province heads
* Weight: percentage of population of the region to the total of Spain * 100
* Source: https://es.wikipedia.org/wiki/Anexo%3AMunicipios_de_Espa%C3%B1a_por_poblaci%C3%B3n
* @package Countries
*/
import { GetCountryData } from '~types/countries';

const Spain: GetCountryData = (i18n) => ({
	countryName: i18n.countryName,
	countrySlug: 'spain',
	regionNames: i18n.regionNames,
	continent: 'europe',
	extendedData: {
		zipFormat: {
			format: 'xxxxx'
		}
	},
	regions: [
		{
			regionName: 'Andalucía',
			regionShort: 'AN',
			regionSlug: 'andalucia',
			weight: 1788,
			cities: [
				'Almería',
				'Cádiz',
				'Córdoba',
				'Granada',
				'Sevilla',
				'Huelva',
				'Jaén',
				'Málaga',
				'Jerez de la Frontera',
				'Marbella',
				'Dos Hermanas',
				'Algeciras'
			]
		},
		{
			regionName: 'Aragón',
			regionShort: 'AR',
			regionSlug: 'aragon',
			weight: 286,
			cities: [
				'Huesca',
				'Teruel',
				'Zaragoza'
			]
		},
		{
			regionName: 'Principado de Asturias',
			regionShort: 'AS',
			regionSlug: 'asturias',
			weight: 228,
			cities: [
				'Oviedo',
				'Gijón'
			]
		},
		{
			regionName: 'Cantabria',
			regionShort: 'CA',
			regionSlug: 'cantabria',
			weight: 126,
			cities: [
				'Santander'
			]
		},
		{
			regionName: 'Castilla - La Mancha',
			regionShort: 'CM',
			regionSlug: 'clm',
			weight: 449,
			cities: [
				'Ciudad Real',
				'Albacete',
				'Cuenca',
				'Toledo',
				'Guadalajara'
			]
		},
		{
			regionName: 'Castilla y León',
			regionShort: 'CL',
			regionSlug: 'cle',
			weight: 539,
			cities: [
				'Burgos',
				'León',
				'Palencia',
				'Valladolid',
				'Zamora',
				'Ávila',
				'Salamanca',
				'Segovia',
				'Soria'
			]
		},
		{
			regionName: 'Catalunya',
			regionShort: 'CA',
			regionSlug: 'cataluña',
			weight: 1602,
			cities: [
				'Barcelona',
				'Tarragona',
				'Girona',
				'Lleida',
				'L\'Hospitalet de Llobregat',
				'Badalona',
				'Tarrasa',
				'Sabadell',
				'Mataró',
				'Santa Coloma de Gramenet',
				'Reus'
			]
		},
		{
			regionName: 'Ceuta',
			regionShort: 'CE',
			regionSlug: 'ceuta',
			weight: 18,
			cities: [
				'Ceuta'
			]
		},
		{
			regionName: 'Comunitat Valenciana',
			regionShort: 'CV',
			regionSlug: 'valencia',
			weight: 1085,
			cities: [
				'Castelló',
				'Valéncia',
				'Alacant',
				'Elx',
				'Torrevieja'
			]
		},
		{
			regionName: 'Canarias',
			regionShort: 'CN',
			regionSlug: 'canarias',
			weight: 448,
			cities: [
				'Santa Cruz de Tenerife',
				'Las Palmas',
				'San Cristóbal de la Laguna',
				'Telde'
			]
		},
		{
			regionName: 'Illes Balears',
			regionShort: 'BA',
			regionSlug: 'baleares',
			weight: 237,
			cities: [
				'Palma de Mallorca'
			]
		},
		{
			regionName: 'Extremadura',
			regionShort: 'EX',
			regionSlug: 'extremadura',
			weight: 234,
			cities: [
				'Badajoz',
				'Cáceres'
			]
		},
		{
			regionName: 'Galicia',
			regionShort: 'GA',
			regionSlug: 'galicia',
			weight: 588,
			cities: [
				'A Coruña',
				'Ourense',
				'Lugo',
				'Pontevedra',
				'Vigo'
			]
		},
		{
			regionName: 'Madrid',
			regionShort: 'MA',
			regionSlug: 'madrid',
			weight: 1375,
			cities: [
				'Madrid',
				'Móstoles',
				'Alcalá de Henares',
				'Fuenlabrada',
				'Leganés',
				'Getafe',
				'Alcorcón',
				'Torrejón de Ardoz',
				'Parla',
				'Alcobendas'
			]
		},
		{
			regionName: 'Melilla',
			regionShort: 'ME',
			regionSlug: 'melilla',
			weight: 17,
			cities: [
				'Melilla'
			]
		},
		{
			regionName: 'Murcia',
			regionShort: 'MU',
			regionSlug: 'murcia',
			weight: 312,
			cities: [
				'Murcia',
				'Cartagena'
			]
		},
		{
			regionName: 'Navarra',
			regionShort: 'NA',
			regionSlug: 'navarra',
			weight: 136,
			cities: [
				'Pamplona'
			]
		},
		{
			regionName: 'Euskadi',
			regionShort: 'PV',
			regionSlug: 'paisvasco',
			weight: 464,
			cities: [
				'Bilbo',
				'Donosti',
				'Gasteiz',
				'Baracaldo'
			]
		},
		{
			regionName: 'La Rioja',
			regionShort: 'LR',
			regionSlug: 'larioja',
			weight: 68,
			cities: [
				'Logroño'
			]
		}
	]
});

export default Spain;
