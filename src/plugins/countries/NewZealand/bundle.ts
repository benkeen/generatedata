/**
 * @package Countries
 */
import { CountryType } from '../../../../types/countries';

export default (i18n: any): CountryType => ({
	countryName: i18n.countryName,
	countrySlug: 'newzealand',
	regionNames: i18n.regionNames,
	continent: 'oceania',
	extendedData: {
		zipFormat: {
			format: 'xxxx'
		}
	},
	regions: [
		{
			regionName: 'North Island',
			regionShort: 'NI',
			regionSlug: 'north_island',
			weight: 3,
			cities: [
				'Auckland', 'Manukau', 'North Shore', 'Waitakere', 'Wellington', 'Hamilton', 'Tauranga',
				'Lower Hutt', 'Palmerston North', 'Hastings', 'Napier', 'Rotorua', 'New Plymouth', 'Whangarei',
				'Porirua', 'Wanganui', 'Kapiti', 'Upper Hutt', 'Gisborne', 'Pukekohe', 'Taupo', 'Masterton',
				'Levin', 'Whakatane', 'Cambridge', 'Te Awamutu', 'Feilding', 'Tokoroa', 'Hawera', 'Waiuku',
				'Waiheke Island', 'Te Puke', 'Kawerau', 'Huntly', 'Thames', 'Morrinsville', 'Matamata', 'Waitara',
				'Kerikeri', 'Dannevirke'
			]
		},
		{
			regionName: 'South Island',
			regionShort: 'SI',
			regionSlug: 'south_island',
			weight: 1,
			cities: [
				'Christchurch', 'Dunedin', 'Nelson', 'Invercargill', 'Blenheim', 'Timaru', 'Ashburton',
				'Oamaru', 'Rangiora', 'Queenstown', 'Greymouth', 'Gore', 'Motueka', 'Wanaka', 'Alexandra',
				'Picton', 'Balclutha', 'Temuka', 'Westport'
			]
		}
	]
});
