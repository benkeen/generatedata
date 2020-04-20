import { CountryType } from '../../../../types/countries';

export default (i18n: any): CountryType => ({
	countryName: i18n.countryName,
	countrySlug: 'nigeria',
	regionNames: i18n.regionNames,
	continent: 'africa',
	extendedData: {
		zipFormat: {
			format: 'Xxxxxx'
		},
		phoneFormat: {
			displayFormats: ['xxx xxxx']
		}
	},
	regions: [
		{
			regionName: 'Kano',
			regionShort: 'KN',
			regionSlug: 'kano',
			weight: 94,
			cities: [
				'Kano'
			]
		},
		{
			regionName: 'Lagos',
			regionShort: 'LA',
			regionSlug: 'lagos',
			weight: 91,
			cities: [
				'Lagos'
			]
		},
		{
			regionName: 'Kaduna',
			regionShort: 'KD',
			regionSlug: 'kaduna',
			weight: 61,
			cities: [
				'Kaduna', 'Zaria'
			]
		},
		{
			regionName: 'Katsina',
			regionShort: 'KT',
			regionSlug: 'katsina',
			weight: 58,
			cities: [
				'Katsina', 'Funtua'
			]
		},
		{
			regionName: 'Oyo',
			regionShort: 'OY',
			regionSlug: 'oyo',
			weight: 56,
			cities: [
				'Ibadan', 'Ogbomosho', 'Oyo', 'Iseyin', 'Shaki', 'Kisi', 'Igboho'
			]
		},
		{
			regionName: 'Rivers',
			regionShort: 'RI',
			regionSlug: 'rivers',
			weight: 52,
			cities: [
				'Port Harcourt', 'Buguma'
			]
		},
		{
			regionName: 'Bauchi',
			regionShort: 'BA',
			regionSlug: 'bauchi',
			weight: 46,
			cities: [
				'Bauchi'
			]
		},
		{
			regionName: 'Jigawa',
			regionShort: 'JI',
			regionSlug: 'jigawa',
			weight: 43,
			cities: [
				'Dutse'
			]
		},
		{
			regionName: 'Benue',
			regionShort: 'BE',
			regionSlug: 'benue',
			weight: 42,
			cities: [
				'Makurdi', 'Gboko', 'Otukpo'
			]
		},
		{
			regionName: 'Anambra',
			regionShort: 'AN',
			regionSlug: 'anambra',
			weight: 42,
			cities: [
				'Onitsha', 'Okpoko', 'Awka'
			]
		},
		{
			regionName: 'Borno',
			regionShort: 'BO',
			regionSlug: 'borno',
			weight: 42,
			cities: [
				'Maiduguri', 'Bama'
			]
		},
		{
			regionName: 'Delta',
			regionShort: 'DE',
			regionSlug: 'delta',
			weight: 41,
			cities: [
				'Warri', 'Sapele'
			]
		},
		{
			regionName: 'Niger',
			regionShort: 'NI',
			regionSlug: 'niger',
			weight: 40,
			cities: [
				'Minna', 'Bida'
			]
		},
		{
			regionName: 'Imo',
			regionShort: 'IM',
			regionSlug: 'imo',
			weight: 39,
			cities: [
				'Owerri', 'Okigwe'
			]
		},
		{
			regionName: 'Akwa Ibom',
			regionShort: 'AK',
			regionSlug: 'akwaibom',
			weight: 39,
			cities: [
				'Uyo', 'Ikot Ekpene'
			]
		},
		{
			regionName: 'Ogun',
			regionShort: 'OG',
			regionSlug: 'ogun',
			weight: 38,
			cities: [
				'Abeokuta', 'Sagamu', 'Ijebu Ode'
			]
		},
		{
			regionName: 'Sokoto',
			regionShort: 'SO',
			regionSlug: 'sokoto',
			weight: 37,
			cities: [
				'Sokoto'
			]
		},
		{
			regionName: 'Osun',
			regionShort: 'OS',
			regionSlug: 'osun',
			weight: 34,
			cities: [
				'Osogbo', 'Ife', 'Ilesa', 'Ila', 'Gbongan', 'Modakeke'
			]
		},
		{
			regionName: 'Kogi',
			regionShort: 'KO',
			regionSlug: 'kogi',
			weight: 33,
			cities: [
				'Okene'
			]
		}
	]
});
