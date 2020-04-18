/**
 * Sources:
 * 		http://en.wikipedia.org/wiki/Provinces_of_Ireland
 *
 * @package Countries
 */
import { CountryType } from '../../../../types/countries';

export default (i18n: any): CountryType => ({
	countryName: i18n.countryName,
	countrySlug: 'ireland',
	regionNames: i18n.regionNames,
	continent: 'europe',
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
