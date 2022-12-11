/**
 * Turkey provinces with population >= 1 million, plus the five largest city in each.
 * Sources:
 * 		http://en.wikipedia.org/wiki/Provinces_of_Turkey
 * 		http://en.wikipedia.org/wiki/List_of_cities_in_Turkey
 *
 * Note: Turkey doesn't appear to have short codes for the provinces, so this just sets them all to the full name.
 */
import { GetCountryData } from '~types/countries';

const Turkey: GetCountryData = (i18n) => ({
	countryName: i18n.countryName,
	countrySlug: 'turkey',
	regionNames: i18n.regionNames,
	continent: 'europe',

	extendedData: {
		zipFormat: {
			format: 'xyyyy',
			replacements: {
				'x': '01234567',
				'y': '0123456789'
			}
		}
	},

	regions: [
		{
			regionName: 'Istanbul',
			regionShort: 'Istanbul',
			regionSlug: 'istanbul',
			weight: 14,
			cities: [
				'Istanbul'
			]
		},
		{
			regionName: 'Ankara',
			regionShort: 'Ankara',
			regionSlug: 'ankara',
			weight: 5,
			cities: [
				'Ankara', 'Polatlı', 'Beypazarı', 'Şereflikoçhisar', 'Kızılcahamam'
			]
		},
		{
			regionName: 'İzmir',
			regionShort: 'İzmir',
			regionSlug: 'izmir',
			weight: 4,
			cities: [
				'Izmir', 'Ödemiş', 'Bergama', 'Tire', 'Çeşme'
			]
		},
		{
			regionName: 'Bursa',
			regionShort: 'Bursa',
			regionSlug: 'bursa',
			weight: 3,
			cities: [
				'Bursa', 'İnegöl', 'Mustafakemalpaşa', 'Orhangazi', 'Karacabey'
			]
		},
		{
			regionName: 'Antalya',
			regionShort: 'Antalya',
			regionSlug: 'antalya',
			weight: 2,
			cities: [
				'Antalya', 'Alanya', 'Manavgat', 'Serik', 'Kumluca'
			]
		},
		{
			regionName: 'Adana',
			regionShort: 'Adana',
			regionSlug: 'adana',
			weight: 2,
			cities: [
				'Adana', 'Ceyhan', 'Kozan', 'İmamoğlu', 'Pozantı'
			]
		},
		{
			regionName: 'Konya',
			regionShort: 'Konya',
			regionSlug: 'konya',
			weight: 2,
			cities: [
				'Konya', 'Ereğli', 'Akşehir', 'Seydişehir', 'Karapınar'
			]
		},
		{
			regionName: 'Gaziantep',
			regionShort: 'Gaziantep',
			regionSlug: 'gaziantep',
			weight: 2,
			cities: [
				'Gaziantep', 'Nizip', 'İslahiye', 'Nurdağı', 'Araban'
			]
		},
		{
			regionName: 'Şanlıurfa',
			regionShort: 'Şanlıurfa',
			regionSlug: 'sanliurfa',
			weight: 2,
			cities: [
				'Şanlıurfa', 'Siverek', 'Viranşehir', 'Suruç', 'Birecik'
			]
		},
		{
			regionName: 'Mersin',
			regionShort: 'Mersin',
			regionSlug: 'mersin',
			weight: 2,
			cities: [
				'Mersin', 'Tarsus', 'Silifke', 'Erdemli', 'Anamur'
			]
		},
		{
			regionName: 'Kocaeli',
			regionShort: 'Kocaeli',
			regionSlug: 'kocaeli',
			weight: 2,
			cities: [
				'İzmit', 'Gebze', 'Darıca', 'Gölcük', 'Körfez'
			]
		},
		{
			regionName: 'Diyarbakır',
			regionShort: 'Diyarbakır',
			regionSlug: 'diyarbakir',
			weight: 2,
			cities: [
				'Diyarbakır', 'Ergani', 'Bismil', 'Silvan', 'Çermik'
			]
		},
		{
			regionName: 'Hatay',
			regionShort: 'Hatay',
			regionSlug: 'hatay',
			weight: 2,
			cities: [
				'Antakya', 'İskenderun', 'Dörtyol', 'Kırıkhan', 'Reyhanlı'
			]
		},
		{
			regionName: 'Manisa',
			regionShort: 'Manisa',
			regionSlug: 'manisa',
			weight: 1,
			cities: [
				'Manisa', 'Turgutlu', 'Akhisar', 'Salihli', 'Soma'
			]
		},
		{
			regionName: 'Kayseri',
			regionShort: 'Kayseri',
			regionSlug: 'kayseri',
			weight: 1,
			cities: [
				'Kayseri', 'Develi', 'Yahyalı', 'Bünyan', 'Pınarbaşı'
			]
		},
		{
			regionName: 'Samsun',
			regionShort: 'Samsun',
			regionSlug: 'samsun',
			weight: 1,
			cities: [
				'Samsun', 'Bafra', 'Çarşamba', 'Terme', 'Vezirköprü'
			]
		},
		{
			regionName: 'Balıkesir',
			regionShort: 'Balıkesir',
			regionSlug: 'balikesir',
			weight: 1,
			cities: [
				'Balıkesir', 'Bandırma', 'Edremit', 'Gönen', 'Burhaniye'
			]
		},
		{
			regionName: 'Kahramanmaraş',
			regionShort: 'Kahramanmaraş',
			regionSlug: 'kahramanmaras',
			weight: 1,
			cities: [
				'Kahramanmaraş', 'Elbistan', 'Afşin', 'Pazarcık', 'Göksun'
			]
		},
		{
			regionName: 'Van',
			regionShort: 'Van',
			regionSlug: 'van',
			weight: 1,
			cities: [
				'Van', 'Erciş', 'Bostaniçi', 'Muradiye', 'Çaldıran'
			]
		},
		{
			regionName: 'Aydın',
			regionShort: 'Aydın',
			regionSlug: 'aydin',
			weight: 1,
			cities: [
				'Aydın', 'Nazilli', 'Söke', 'Kuşadası', 'Didim'
			]
		}
	]
});

export default Turkey;
