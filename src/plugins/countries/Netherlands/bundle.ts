import { CountryType } from '../../../../types/countries';

export default (i18n: any): CountryType => ({
	countryName: i18n.countryName,
	countrySlug: 'netherlands',
	regionNames: i18n.regionNames,
	continent: 'europe',
	extendedData: {
		zipFormat: {
			format: 'xxxx LL'
		},
 		phoneFormat: {
		    displayFormats: [
			    '0Xxx-xxxxxx',
			    '0Xx-xxxxxxx',
			    '06-Xxxxxxxxx',
			    '0Xxx xxxxxx',
			    '0Xx xxxxxxx',
			    '06 Xxxxxxxxx',
			    '+31 Xx xxxxxxx',
			    '+31 Xxx xxxxxx',
			    '+31 6 Xxxxxxxxx',
		    ]
	    }
	},
	regions: [
		{
			regionName: 'Drenthe',
			regionShort: 'Dr',
			regionSlug: 'drenthe',
			weight: 5,
			cities: [
				'Assen', 'Coevorden', 'Emmen', 'Hoogeveen', 'Meppel'
			]
		},
		{
			regionName: 'Flevoland',
			regionShort: 'Fl',
			regionSlug: 'flevoland',
			weight: 1,
			cities: [
				'Almere', 'Lelystad'
			]
		},
		{
			regionName: 'Friesland',
			regionShort: 'Fr',
			regionSlug: 'friesland',
			weight: 6,
			cities: [
				'Bolsward', 'Dokkum', 'Drachten', 'Franeker', 'Harlingen', 'Heerenveen', 'Hindeloopen', 'IJlst',
				'Leeuwarden', 'Sloten', 'Sneek', 'Stavoren', 'Workum'
			]
		},
		{
			regionName: 'Gelderland',
			regionShort: 'Gl',
			regionSlug: 'gelderland',
			weight: 20,
			cities: [
				'Apeldoorn', 'Arnhem', 'Buren', 'Culemborg', 'Doetinchem', 'Ede', 'Groenlo', 'Harderwijk', 'Hattem',
				'Huissen', 'Nijkerk', 'Nijmegen', 'Tiel', 'Wageningen', 'Winterswijk', 'Zaltbommel', 'Zutphen'
			]
		},
		{
			regionName: 'Limburg',
			regionShort: 'L.',
			regionSlug: 'limburg',
			weight: 11,
			cities: [
				'Geleen', 'Heerlen', 'Kerkrade', 'Maastricht', 'Roermond', 'Sittard', 'Thorn', 'Valkenburg aan de Geul',
				'Venlo', 'Weert', 'Hasselt', 'Sint-Lambrechts-Herk', 'Wimmertingen', 'Kermt', 'Spalbeek', 'Kuringen',
				'Stokrooie', 'Stevoort', 'Zonhoven', 'Helchteren', 'Houthalen', 'Houthalen-Helchteren', 'Berbroek', 'Donk',
				'Herk-de-Stad', 'Schulen', 'Halen', 'Loksbergen', 'Zelem', 'Heusden', 'Heusden-Zolder', 'Zolder', 'Linkhout',
				'Lummen', 'Meldert', 'Alken', 'Beringen', 'Beverlo', 'Koersel', 'Paal', 'Diepenbeek', 'Genk', 'Gellik',
				'Lanaken', 'Neerharen', 'Veldwezelt', 'Rekem', 'Eisden', 'Leut', 'Maasmechelen', 'Mechelen-aan-de-Maas',
				'Meeswijk', 'Opgrimbie', 'Vucht', 'Boorsem', 'Uikhoven', 'Kessenich', 'Kinrooi', 'Molenbeersel', 'Ophoven',
				'Dilsen-Stokkem', 'Elen', 'Lanklaar', 'Rotem', 'Stokkem', 'Opglabbeek', 'As', 'Niel-bij-As', 'Ellikom',
				'Gruitrode', 'Meeuwen', 'Meeuwen-Gruitrode', 'Neerglabbeek', 'Wijshagen', 'Maaseik', 'Neeroeteren',
				'Opoeteren', 'Zutendaal', 'Berg', 'Diets-Heur', 'Haren', 'Henis', 'Kolmont', 'Koninksem', 'Lauw', 'Mal',
				'Neerrepen', 'Nerem', 'Overrepen', 'Piringen', 'Riksingen', 'Rutten', 's Herenelderen', 'Sluizen', 'Tongeren',
				'Vreren', 'Widooie', 'Herstappe', 'Kortessem', 'Vliermaalroot'
			]
		},
		{
			regionName: 'Noord Brabant',
			regionShort: 'N.',
			regionSlug: 'noord_brabant',
			weight: 24,
			cities: [
				'Bergen op Zoom', 'Breda', 'Eindhoven', 'Geertruidenberg', 'Grave', 'Helmond', 'Heusden', 'Oosterhout',
				'Oss', 'Ravenstein', 'Roosendaal', 'Tilburg', 'Waalwijk'
			]
		},
		{
			regionName: 'Noord Holland',
			regionShort: 'N.',
			regionSlug: 'noord_holland',
			weight: 26,
			cities: [
				'Alkmaar', 'Amstelveen', 'Amsterdam', 'Den Helder', 'Edam', 'Enkhuizen', 'Haarlem', 'Heerhugowaard', 'Hilversum',
				'Hoofddorp', 'Hoorn', 'Laren', 'Purmerend', 'Medemblik', 'Muiden', 'Naarden', 'Schagen', 'Weesp', 'Zaanstad'
			]
		},
		{
			regionName: 'Overijssel',
			regionShort: 'Ov',
			regionSlug: 'overijssel',
			weight: 11,
			cities: [
				'Almelo', 'Deventer', 'Enschede', 'Hengelo', 'Oldenzaal', 'Zwolle'
			]
		},
		{
			regionName: 'Zuid Holland',
			regionShort: 'Z.',
			regionSlug: 'zuid_holland',
			weight: 12,
			cities: [
				'Alphen aan den Rijn', 'Delft', 'Dordrecht', 'Gorinchem', 'Gouda', 'Leiden', 'Rotterdam', 'Spijkenisse',
				'The Hague', 'Zoetermeer'
			]
		},
		{
			regionName: 'Utrecht',
			regionShort: 'U.',
			regionSlug: 'utrecht',
			weight: 4,
			cities: [
				'Amersfoort', 'Leersum', 'Nieuwegein', 'Utrecht', 'Veenendaal', 'Woerden', 'Zeist'
			]
		},
		{
			regionName: 'Zeeland',
			regionShort: 'Zl',
			regionSlug: 'zeeland',
			weight: 35,
			cities: [
				'Flushing', 'Goes', 'Hulst', 'Middelburg', 'Sluis', 'Terneuzen', 'Veere', 'Zierikzee'
			]
		}
	]
});
