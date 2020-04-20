import { CountryType } from '../../../../types/countries';

export default (i18n: any): CountryType => ({
	countryName: i18n.countryName,
	countrySlug: 'sweden',
	regionNames: i18n.regionNames,
	continent: 'europe',
	extendedData: {
		zipFormat: {
			format: 'xxxxx'
		}
	},
	regions: [
		{
			regionName: 'Gävleborgs län',
			regionShort: 'X',
			regionSlug: 'gavleborg',
			weight: 1,
			cities: [
				'Gävle', 'Sandviken', 'Hudiksvall', 'Bollnäs', 'Söderhamn', 'Hofors', 'Ockelbo'
			]
		},
		{
			regionName: 'Dalarnas län',
			regionShort: 'W',
			regionSlug: 'dalarna',
			weight: 1,
			cities: [
				'Borlänge', 'Falun', 'Avesta', 'Ludvika', 'Mora'
			]
		},
		{
			regionName: 'Stockholms län',
			regionShort: 'AB',
			regionSlug: 'stockholms_lan',
			weight: 5,
			cities: [
				'Stockholm', 'Södertälje', 'Täby', 'Tumba', 'Upplands Väsby', 'Lidingo', 'Vallentuna', 'Åkersberga',
				'Märsta', 'Boo'
			]
		},
		{
			regionName: 'Västra Götalands län',
			regionShort: 'O',
			regionSlug: 'vastra_gotaland',
			weight: 4,
			cities: [
				'Göteborg', 'Borås', 'Trollhättan', 'Skövde', 'Uddevalla', 'Lidköping', 'Alingsås', 'Kungälv',
				'Vänersborg', 'Lerum'
			]
		},
		{
			regionName: 'Östergötlands län',
			regionShort: 'E',
			regionSlug: 'ostergotland',
			weight: 2,
			cities: [
				'Linköping', 'Norrköping', 'Motala', 'Finspång', 'Mjölby'
			]
		},
		{
			regionName: 'Jönköpings län',
			regionShort: 'F',
			regionSlug: 'jonkoping',
			weight: 2,
			cities: [
				'Jönköping', 'Värnamo', 'Nässjö', 'Tranås', 'Vetlanda'
			]
		}
	]
});
