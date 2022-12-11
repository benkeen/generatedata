/**
 * Sources:
 * 		https://en.wikipedia.org/wiki/Provinces_of_Indonesia
 * 		https://en.wikipedia.org/wiki/List_of_Indonesian_cities_by_population
 *
 * @package Countries
 */
import { GetCountryData } from '~types/countries';

const Indonesia: GetCountryData = (i18n) => ({
	countryName: i18n.countryName,
	countrySlug: 'indonesia',
	regionNames: i18n.regionNames,
	continent: 'asia',
	extendedData: {
		zipFormat: {
			format: 'Xxxxx'
		},
		phoneFormat: {
			displayFormats: [
				'62 Xx xxx xxxx'
			]
		}
	},
	regions: [
		{
			regionName: 'Aceh',
			regionShort: 'AC',
			regionSlug: 'aceh',
			weight: 50,
			cities: [
				'Banda Aceh'
			]
		},
		{
			regionName: 'Bali',
			regionShort: 'BA',
			regionSlug: 'bali',
			weight: 41,
			cities: [
				'Denpasar'
			]
		},
		{
			regionName: 'Bangka Belitung Islands',
			regionShort: 'BB',
			regionSlug: 'babel',
			weight: 14,
			cities: [
				'Pangkalpinang'
			]
		},
		{
			regionName: 'Banten',
			regionShort: 'BT',
			regionSlug: 'banten',
			weight: 119,
			cities: [
				'Serang'
			]
		},
		{
			regionName: 'Bengkulu',
			regionShort: 'BE',
			regionSlug: 'bengkulu',
			weight: 19,
			cities: [
				'Bengkulu'
			]
		},
		{
			regionName: 'Central Java',
			regionShort: 'JT',
			regionSlug: 'central_java',
			weight: 338,
			cities: [
				'Semarang'
			]
		},
		{
			regionName: 'Central Kalimantan',
			regionShort: 'KT',
			regionSlug: 'central_kalimantan',
			weight: 25,
			cities: [
				'Palangka Raya'
			]
		},
		{
			regionName: 'Central Sulawesi',
			regionShort: 'ST',
			regionSlug: 'central_sulawesi',
			weight: 29,
			cities: [
				'Palu'
			]
		},
		{
			regionName: 'East Java',
			regionShort: 'JI',
			regionSlug: 'east_java',
			weight: 388,
			cities: [
				'Surabaya', 'Malang', 'Kediri', 'Probolinggo', 'Pasuruan', 'Madiun', 'Batu', 'Blitar', 'Mojokerto'
			]
		},
		{
			regionName: 'East Kalimantan',
			regionShort: 'KI',
			regionSlug: 'east_kalimantan',
			weight: 34,
			cities: [
				'Samarinda', 'Balikpapan', 'Bontang'
			]
		},
		{
			regionName: 'East Nusa Tenggara',
			regionShort: 'NT',
			regionSlug: 'east_nusa_tenggara',
			weight: 51,
			cities: [
				'Kupang'
			]
		},
		{
			regionName: 'Gorontalo',
			regionShort: 'GO',
			regionSlug: 'gorontalo',
			weight: 11,
			cities: [
				'Gorontalo'
			]
		},
		{
			regionName: 'Special Capital Region of Jakarta',
			regionShort: 'JK',
			regionSlug: 'jakarta_region',
			weight: 102,
			cities: [
				'Jakarta', 'East Jakarta', 'West Jakarta', 'South Jakarta', 'North Jakarta', 'Central Jakarta'
			]
		},
		{
			regionName: 'Jambi',
			regionShort: 'JA',
			regionSlug: 'jambi',
			weight: 34,
			cities: [
				'Jambi', 'Sungai Penuh'
			]
		},
		{
			regionName: 'Lampung',
			regionShort: 'LA',
			regionSlug: 'lampung',
			weight: 81,
			cities: [
				'Bandar Lampung', 'Metro'
			]
		},
		{
			regionName: 'Maluku',
			regionShort: 'MA',
			regionSlug: 'maluku',
			weight: 17,
			cities: [
				'Ambon', 'Tual'
			]
		},
		{
			regionName: 'North Kalimantan',
			regionShort: 'KU',
			regionSlug: 'north_kalimantan',
			weight: 6,
			cities: [
				'Tarakan'
			]
		},
		{
			regionName: 'North Maluku',
			regionShort: 'MU',
			regionSlug: 'north_maluku',
			weight: 12,
			cities: [
				'Ternate', 'Tidore'
			]
		},
		{
			regionName: 'North Sulawesi',
			regionShort: 'SA',
			regionSlug: 'north_sulawesi',
			weight: 24,
			cities: [
				'Manado', 'Bitung', 'Kotamobagu', 'Tomohon'
			]
		},
		{
			regionName: 'North Sumatra',
			regionShort: 'SU',
			regionSlug: 'north_sumatra',
			weight: 139,
			cities: [
				'Medan', 'Pematangsiantar', 'Binjai', 'Padang Sidempuan', 'Tebing Tinggi', 'Tanjungbalai',
				'Gunungsitoli', 'Sibolga'
			]
		},
		{
			regionName: 'Papua',
			regionShort: 'PA',
			regionSlug: 'papua',
			weight: 31,
			cities: [
				'Jayapura'
			]
		},
		{
			regionName: 'Riau',
			regionShort: 'RI',
			regionSlug: 'riau',
			weight: 63,
			cities: [
				'Pekanbaru', 'Dumai'
			]
		},
		{
			regionName: 'Riau Islands',
			regionShort: 'KR',
			regionSlug: 'riau_islands',
			weight: 20,
			cities: [
				'Tanjung Pinang'
			]
		},
		{
			regionName: 'Southeast Sulawesi',
			regionShort: 'SG',
			regionSlug: 'southeast_sulawesi',
			weight: 25,
			cities: [
				'Kendari', 'Baubau'
			]
		},
		{
			regionName: 'South Kalimantan',
			regionShort: 'KS',
			regionSlug: 'south_kalimantan',
			weight: 40,
			cities: [
				'Banjarmasin', 'Banjarbaru'
			]
		},
		{
			regionName: 'South Sulawesi',
			regionShort: 'SN',
			regionSlug: 'south_sulawesi',
			weight: 85,
			cities: [
				'Makassar', 'Palopo', 'Parepare'
			]
		},
		{
			regionName: 'South Sumatra',
			regionShort: 'SS',
			regionSlug: 'south_sumatra',
			weight: 80,
			cities: [
				'Palembang'
			]
		},
		{
			regionName: 'West Java',
			regionShort: 'JB',
			regionSlug: 'west_java',
			weight: 467,
			cities: [
				'Bandung', 'Bekasi', 'Depok', 'Bogor', 'Tasikmalaya', 'Cimahi', 'Sukabumi', 'Cirebon', 'Banjar'
			]
		},
		{
			regionName: 'West Kalimantan',
			regionShort: 'KB',
			regionSlug: 'west_kalimantan',
			weight: 48,
			cities: [
				'Pontianak', 'Singkawang'
			]
		},
		{
			regionName: 'West Nusa Tenggara',
			regionShort: 'NB',
			regionSlug: 'west_nusa_tenggara',
			weight: 48,
			cities: [
				'Mataram', 'Bima'
			]
		},
		{
			regionName: 'West Papua',
			regionShort: 'PB',
			regionSlug: 'west_papua',
			weight: 9,
			cities: [
				'Manokwari'
			]
		},
		{
			regionName: 'West Sulawesi',
			regionShort: 'SR',
			regionSlug: 'west_sulawesi',
			weight: 13,
			cities: [
				'Mamuju'
			]
		},
		{
			regionName: 'West Sumatra',
			regionShort: 'SB',
			regionSlug: 'west_sumatra',
			weight: 52,
			cities: [
				'Padang', 'Payakumbuh', 'Bukittinggi', 'Pariaman', 'Solok', 'Sawahlunto', 'Padang Panjang'
			]
		},
		{
			regionName: 'Special Region of Yogyakarta',
			regionShort: 'YO',
			regionSlug: 'yogyakarta',
			weight: 37,
			cities: [
				'Yogyakarta'
			]
		}
	]
});

export default Indonesia;
