import { CountryType } from '../../../../types/countries';

export default (i18n: any): CountryType => ({
	countryName: i18n.countryName,
	countrySlug: 'austria',
	regionNames: i18n.regionNames,
	continent: 'europe',
	extendedData: {
		zipFormat: {
			format: 'Xxxx',
			replacements: {
				X: '123456789',
				x: '0123456789'
			}
		}
	},
	regions: [
		{
			regionName: 'Vienna',
			regionShort: 'Wien',
			regionSlug: 'vienna',
			weight: 4113,
			cities: [
				'Vienna'
			]
		},
		{
			regionName: 'Vorarlberg',
			regionShort: 'Vbg.',
			regionSlug: 'voralberg',
			weight: 142,
			cities: [
				'Dornbirn',
				'Feldkirch',
				'Bregenz',
				'Lustenau',
				'Hohenems',
				'Bludenz',
				'Hard',
				'Rankweil',
				'Götzis',
				'Lauterach',
				'Wolfurt',
				'Höchst',
				'Altach'
			]
		},
		{
			regionName: 'Upper Austria',
			regionShort: 'OÖ.',
			regionSlug: 'upper_austria',
			weight: 117,
			cities: [
				'Linz',
				'Wels',
				'Steyr',
				'Leonding',
				'Traun',
				'Braunau am Inn',
				'Ansfelden',
				'Bad Ischl',
				'Gmunden',
				'Marchtrenk',
				'Vöcklabruck',
				'Ried im Innkreis',
				'Enns',
				'Altmünster',
				'Laakirchen',
				'Sierning'
			]
		},
		{
			regionName: 'Lower Austria',
			regionShort: 'NÖ.',
			regionSlug: 'lower_austria',
			weight: 84,
			cities: [
				'St. Pölten',
				'Wiener Neustadt',
				'Klosterneuburg',
				'Baden',
				'Krems an der Donau',
				'Amstetten',
				'Mödling',
				'Traiskirchen',
				'Schwechat',
				'Stockerau',
				'Tulln an der Donau',
				'Ternitz',
				'Perchtoldsdorf',
				'Korneuburg',
				'Neunkirchen',
				'Hollabrunn',
				'Waidhofen an der Ybbs',
				'Bad Vöslau',
				'Brunn am Gebirge',
				'Zwettl-Niederösterreich'
			]
		},
		{
			regionName: 'Salzburg',
			regionShort: 'Sbg.',
			regionSlug: 'salzburg',
			weight: 74,
			cities: [
				'Salzburg',
				'Hallein',
				'Saalfelden am Steinernen Meer',
				'Wals-Siezenheim',
				'Sankt Johann im Pongau',
				'Bischofshofen'
			]
		},
		{
			regionName: 'Styria',
			regionShort: 'Stm.',
			regionSlug: 'styria',
			weight: 73,
			cities: [
				'Graz',
				'Leoben',
				'Kapfenberg',
				'Bruck an der Mur',
				'Knittelfeld',
				'Köflach',
				'Voitsberg',
				'Judenburg',
				'Weiz'
			]
		},
		{
			regionName: 'Burgenland',
			regionShort: 'Bgl.',
			regionSlug: 'burgenland',
			weight: 72,
			cities: [
				'Eisenstadt',
				'Oberwart',
				'Neusiedl am See',
				'Mattersburg',
				'Pinkafeld',
				'Neudörfl',
				'Parndorf',
				'Jennersdorf',
				'Güssing',
				'Gols',
				'Großpetersdorf',
				'Neufeld an der Leitha',
				'Deutschkreutz',
				'Rechnitz',
				'Oberpullendorf',
				'Siegendorf',
				'Pöttsching',
				'Bruckneudorf',
				'Frauenkirchen',
				'Forchtenstein'
			]
		},
		{
			regionName: 'Carinthia',
			regionShort: 'Ktn.',
			regionSlug: 'carinthia',
			weight: 59,
			cities: [
				'Klagenfurt',
				'Villach',
				'Wolfsberg',
				'Spittal an der Drau',
				'Feldkirchen in Kärnten',
				'St. Veit an der Glan',
				'Völkermarkt',
				'St. Andrä',
				'Velden am Wörther See',
				'Finkenstein am Faaker See',
				'Ebenthal in Kärnten',
				'Ferlach'
			]
		},
		{
			regionName: 'Tyrol',
			regionShort: 'Tirol',
			regionSlug: 'tyrol',
			weight: 56,
			cities: [
				'Innsbruck',
				'Kufstein',
				'Telfs',
				'Schwaz',
				'Hall in Tirol',
				'Wörgl',
				'Lienz',
				'Imst',
				'Rum',
				'St. Johann in Tirol',
				'Kitzbühel',
				'Zirl',
				'Landeck'
			]
		}
	]
});
