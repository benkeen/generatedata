import { CountryType } from '../../../../types/countries';

export default (i18n: any): CountryType => ({
	countryName: i18n.countryName,
	countrySlug: 'poland',
	regionNames: i18n.regionNames,
	continent: 'europe',
	extendedData: {
		zipFormat: {
			format: 'xx-xxx'
		},
		phoneFormat: {
			displayFormats: ['Xx xxx xx xx']
		}
	},
	regions: [
		{
			regionName: 'Dolnośląskie',
			regionShort: 'DS',
			regionSlug: 'dolnoslaskie',
			weight: 291,
			cities: [
				'Wrocław', 'Wałbrzych', 'Legnica', 'Jelenia Góra'
			]
		},
		{
			regionName: 'Kujawsko-pomorskie',
			regionShort: 'KP',
			regionSlug: 'kujawskopomorskie',
			weight: 210,
			cities: [
				'Bydgoszcz', 'Toruń'
			]
		},
		{
			regionName: 'Lubelskie',
			regionShort: 'LU',
			regionSlug: 'lubelskie',
			weight: 217,
			cities: [
				'Lublin', 'Chełm', 'Zamość', 'Biała Podlaska'
			]
		},
		{
			regionName: 'Lubuskie',
			regionShort: 'LB',
			regionSlug: 'lubuskie',
			weight: 102,
			cities: [
				'Gorzów Wielkopolski', 'Zielona Góra'
			]
		},
		{
			regionName: 'łódzkie',
			regionShort: 'LD',
			regionSlug: 'lodzkie',
			weight: 252,
			cities: [
				'Łódź', 'Piotrków Trybunalski', 'Pabianice', 'Tomaszów Mazowiecki'
			]
		},
		{
			regionName: 'Małopolskie',
			regionShort: 'MP',
			regionSlug: 'malopolskie',
			weight: 335,
			cities: [
				'Kraków', 'Tarnów'
			]
		},
		{
			regionName: 'Mazowieckie',
			regionShort: 'MA',
			regionSlug: 'mazowieckie',
			weight: 530,
			cities: [
				'Warszawa', 'Radom', 'Płock', 'Siedlce'
			]
		},
		{
			regionName: 'Opolskie',
			regionShort: 'OP',
			regionSlug: 'opolskie',
			weight: 101,
			cities: [
				'Opole', 'Kędzierzyn-Koźle'
			]
		},
		{
			regionName: 'Podkarpackie',
			regionShort: 'PK',
			regionSlug: 'podkarpackie',
			weight: 213,
			cities: [
				'Rzeszów', 'Przemyśl', 'Stalowa Wola', 'Mielec'
			]
		},
		{
			regionName: 'Podlaskie',
			regionShort: 'PD',
			regionSlug: 'podlaskie',
			weight: 120,
			cities: [
				'Białystok', 'Suwałki', 'Łomża'
			]
		},
		{
			regionName: 'Pomorskie',
			regionShort: 'PM',
			regionSlug: 'pomorskie',
			weight: 229,
			cities: [
				'Gdańsk', 'Gdynia', 'Słupsk', 'Tczew'
			]
		},
		{
			regionName: 'Sląskie',
			regionShort: 'SL',
			regionSlug: 'slaskie',
			weight: 462,
			cities: [
				'Katowice', 'Częstochowa', 'Sosnowiec', 'Gliwice'
			]
		},
		{
			regionName: 'Swiętokrzyskie',
			regionShort: 'SK',
			regionSlug: 'swietokrzyskie',
			weight: 127,
			cities: [
				'Kielce', 'Ostrowiec Świętokrzyski', 'Starachowice'
			]
		},
		{
			regionName: 'Warmińsko-mazurskie',
			regionShort: 'WM',
			regionSlug: 'warminskomazurskie',
			weight: 145,
			cities: [
				'Olsztyn', 'Elbląg', 'Ełk'
			]
		},
		{
			regionName: 'Wielkopolskie',
			regionShort: 'WP',
			regionSlug: 'wielkopolskie',
			weight: 342,
			cities: [
				'Poznań', 'Kalisz', 'Konin', 'Piła'
			]
		},
		{
			regionName: 'Zachodniopomorskie',
			regionShort: 'ZP',
			regionSlug: 'zachodniopomorskie',
			weight: 172,
			cities: [
				'Szczecin', 'Koszalin', 'Stargard Szczeciński'
			]
		}
	]
});
