import { GetCountryData } from '~types/countries';

const Spain: GetCountryData = (i18n) => ({
	countryName: i18n.countryName,
	countrySlug: 'ukraine',
	regionNames: i18n.regionNames,
	continent: 'europe',
	extendedData: {
		zipFormat: {
			// could be more specific
			// https://en.wikipedia.org/wiki/Postal_codes_in_Ukraine
			format: 'XX-XX'
		},
		phoneFormat: {
			displayFormats: [
				'XXX-XX-XX'
			]
		}
	},
	regions: [
		{
			regionName: 'Cherkasy oblast',
			regionShort: 'CK',
			regionSlug: 'cherkasy',
			weight: 12,
			cities: [
				'Cherkasy', 'Uman', 'Smila'
			]
		},
		{
			regionName: 'Chernihiv oblast',
			regionShort: 'CH',
			regionSlug: 'chernihiv',
			weight: 10,
			cities: [
				'Chernihiv', 'Nizhyn'
			]
		},
		{
			regionName: 'Chernivtsi oblast',
			regionShort: 'CV',
			regionSlug: 'chernivtsi',
			weight: 9,
			cities: [
				'Chernivtsi', 'Kitsman', 'Vashkivtsi'
			]
		},
		{
			regionName: 'Dnipropetrovsk oblast',
			regionShort: 'DP',
			regionSlug: 'dnipropetrovsk',
			weight: 32,
			cities: [
				'Dnipro', 'Kryvyi Rih', 'Kamianske', 'Nikopol', 'Pavlohrad', 'Novomoskovsk'
			]
		},
		{
			regionName: 'Donetsk oblast',
			regionShort: 'DT',
			regionSlug: 'donetsk',
			weight: 42,
			cities: [
				'Donetsk', 'Mariupol', 'Makiivka', 'Horlivka', 'Kramatorsk', 'Sloviansk', 'Yenakiieve', 'Bakhmut',
				'Kostiantynivka'
			]
		},
		{
			regionName: 'Ivano-Frankivsk oblast',
			regionShort: 'IF',
			regionSlug: 'ivano-frankivsk',
			weight: 14,
			cities: [
				'Ivano-Frankivsk', 'Kalush'
			]
		},
		{
			regionName: 'Kharkiv oblast',
			regionShort: 'KK',
			regionSlug: 'kharkiv',
			weight: 27,
			cities: [
				'Kharkiv', 'Lozova', 'Izium'
			]
		},
		{
			regionName: 'Kherson oblast',
			regionShort: 'KS',
			regionSlug: 'kherson',
			weight: 10,
			cities: [
				'Kherson', 'Nova Kakhovka'
			]
		},
		{
			regionName: 'Khmelnytskyi oblast',
			regionShort: 'KM',
			regionSlug: 'khmelnytskyi',
			weight: 13,
			cities: [
				'Khmelnytskyi', 'Kamianets-Podilskyi'
			]
		},
		{
			regionName: 'Kyiv oblast',
			regionShort: 'KV',
			regionSlug: 'kyiv',
			weight: 18,
			cities: [
				'Kyiv', 'Bila Tserkva', 'Brovary', 'Boryspil', 'Irpin'
			]
		},
		{
			regionName: 'Kirovohrad oblast',
			regionShort: 'KH',
			regionSlug: 'kirovohrad',
			weight: 9,
			cities: [
				'Kropyvnytskyi', 'Oleksandriia'
			]
		},
		{
			regionName: 'Luhansk oblast',
			regionShort: 'LH',
			regionSlug: 'luhansk',
			weight: 22,
			cities: [
				'Luhansk', 'Alchevsk', 'Sievierodonetsk', 'Lysychansk', 'Khrustalnyi', 'Kadiyivka', 'Dovzhansk'
			]
		},
		{
			regionName: 'Lviv oblast',
			regionShort: 'LV',
			regionSlug: 'lviv',
			weight: 25,
			cities: [
				'Lviv', 'Drohobych', 'Chervonohrad'
			]
		},
		{
			regionName: 'Mykolaiv oblast',
			regionShort: 'MY',
			regionSlug: 'mykolaiv',
			weight: 11,
			cities: [
				'Mykolaiv', 'Pervomaisk'
			]
		},
		{
			regionName: 'Odessa oblast',
			regionShort: 'OD',
			regionSlug: 'odessa',
			weight: 24,
			cities: [
				'Odessa', 'Izmail'
			]
		},
		{
			regionName: 'Poltava oblast',
			regionShort: 'PL',
			regionSlug: 'poltava',
			weight: 14,
			cities: [
				'Poltava', 'Kremenchuk'
			]
		},
		{
			regionName: 'Rivne oblast',
			regionShort: 'RV',
			regionSlug: 'rivne',
			weight: 12,
			cities: [
				'Rivne', 'Varash', 'Dubno'
			]
		},
		{
			regionName: 'Sumy oblast',
			regionShort: 'SM',
			regionSlug: 'sumy',
			weight: 11,
			cities: [
				'Sumy', 'Konotop', 'Shostka'
			]
		},
		{
			regionName: 'Ternopil oblast',
			regionShort: 'TP',
			regionSlug: 'ternopil',
			weight: 10,
			cities: [
				'Ternopil', 'Chortkiv'
			]
		},
		{
			regionName: 'Vinnytsia oblast',
			regionShort: 'VI',
			regionSlug: 'vinnytsia',
			weight: 16,
			cities: [
				'Vinnytsia', 'Khmilnyk', 'Haisyn'
			]
		},
		{
			regionName: 'Volyn oblast',
			regionShort: 'VO',
			regionSlug: 'volyn',
			weight: 10,
			cities: [
				'Lutsk', 'Kovel'
			]
		},
		{
			regionName: 'Zakarpattia oblast',
			regionShort: 'ZK',
			regionSlug: 'zakarpattia',
			weight: 13,
			cities: [
				'Uzhhorod', 'Mukachevo'
			]
		},
		{
			regionName: 'Zaporizhzhia oblast',
			regionShort: 'ZP',
			regionSlug: 'zaporizhzhia',
			weight: 17,
			cities: [
				'Zaporizhzhia', 'Melitopol', 'Berdiansk'
			]
		},
		{
			regionName: 'Zhytomyr oblast',
			regionShort: 'ZT',
			regionSlug: 'zhytomyr',
			weight: 12,
			cities: [
				'Zhytomyr', 'Berdychiv', 'Korosten'
			]
		}
	]
});

export default Spain;
