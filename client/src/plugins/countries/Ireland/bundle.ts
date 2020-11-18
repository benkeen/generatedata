/**
 * Sources:
 * 		http://en.wikipedia.org/wiki/Provinces_of_Ireland
 *
 * @package Countries
 */
import { GetCountryData } from '~types/countries';

const Ireland: GetCountryData = (i18n) => ({
	countryName: i18n.countryName,
	countrySlug: 'ireland',
	regionNames: i18n.regionNames,
	continent: 'europe',
	extendedData: {
		zipFormat: {
			format: 'Xxxx'
		}
	},
	regions: [
		{
			regionName: 'Leinster',
			regionShort: 'L',
			regionSlug: 'leinster',
			weight: 25,
			cities: [
				'Dublin'
			]
		},
		{
			regionName: 'Ulster',
			regionShort: 'U',
			regionSlug: 'ulster',
			weight: 21,
			cities: [
				'Belfast'
			]
		},
		{
			regionName: 'Munster',
			regionShort: 'M',
			regionSlug: 'munster',
			weight: 12,
			cities: [
				'Cork'
			]
		},
		{
			regionName: 'Connacht',
			regionShort: 'C',
			regionSlug: 'connacht',
			weight: 25,
			cities: [
				'Galway'
			]
		}
	]
});

export default Ireland;
