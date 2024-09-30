import { GetCountryData } from '~types/countries';

const Australia: GetCountryData = (i18n) => ({
	countryName: i18n.countryName,
	countrySlug: 'australia',
	regionNames: i18n.regionNames,
	continent: 'oceania',
	extendedData: {
		zipFormat: {
			format: 'Xxxx',
		},
		// the general phone format and area codes for the country
		// https://voicerules.com/blog/telecommuting/how-to-call-australia-from-the-us/
		phoneFormat: {
			areaCodes: [
				4,	// Mobile phones
				5, 	// Mobile phones
				2,	// New South Wales, Canberra region, and parts of northern Victoria
				7,	// Queensland
				3,	// Tasmania, Victoria, and parts of southern New South Wales
				8,	// Western and South Australia, the Northern Territory, New South Wales, Cocos, and Christmas Islands
			],
			displayFormats: [
				'+61 A Xxxx xxxx',
			],
		},
	},
	regions: [
		{
			regionName: 'Australian Capital Territory',
			regionShort: 'ACT',
			regionSlug: 'australian_capital_territories',
			weight: 3,
			cities: ['Canberra'],
			extendedData: {
				zipFormat: {
					format: 'Xxxx',
				},
				phoneFormat: {
					areaCodes: [2, 4, 5],
				},
			},
		},
		{
			regionName: 'New South Wales',
			regionShort: 'NSW',
			regionSlug: 'new_south_wales',
			weight: 69,
			cities: [
				'Sydney',
				'Albury',
				'Armidale',
				'Bathurst',
				'Blue Mountains',
				'Broken Hill',
				'Campbelltown',
				'Cessnock',
				'Dubbo',
				'Goulburn',
				'Grafton',
				'Lithgow',
				'Liverpool',
				'Newcastle',
				'Orange',
				'Parramatta',
				'Penrith',
				'Queanbeyan',
				'Tamworth',
				'Wagga Wagga',
				'Wollongong',
			],
			extendedData: {
				zipFormat: {
					format: 'Xxxx',
				},
				phoneFormat: {
					areaCodes: [8, 3, 2, 4, 5],
				},
			},
		},
		{
			regionName: 'Northern Territory',
			regionShort: 'NT',
			regionSlug: 'northern_territory',
			weight: 2,
			cities: ['Darwin', 'Palmerston'],
			extendedData: {
				zipFormat: {
					format: 'Xxxx',
				},
				phoneFormat: {
					areaCodes: [8, 4, 5],
				},
			},
		},
		{
			regionName: 'Queensland',
			regionShort: 'QLD',
			regionSlug: 'queensland',
			weight: 42,
			cities: [
				'Brisbane',
				'Bundaberg',
				'Cairns',
				'Caloundra',
				'Charters Towers',
				'Gladstone',
				'Gold Coast',
				'Hervey Bay',
				'Ipswich',
				'Logan City',
				'Mackay',
				'Maryborough',
				'Mount Isa',
				'Redcliffe',
				'Redlands',
				'Rockhampton',
				'Toowoomba',
				'Townsville',
			],
			extendedData: {
				zipFormat: {
					format: 'Xxxx',
				},
				phoneFormat: {
					areaCodes: [7, 4, 5],
				},
			},
		},
		{
			regionName: 'South Australia',
			regionShort: 'SA',
			regionSlug: 'south_australia',
			weight: 16,
			cities: [
				'Adelaide',
				'Mount Gambier',
				'Murray Bridge',
				'Port Augusta',
				'Port Pirie',
				'Port Lincoln',
				'Victor Harbor',
				'Whyalla',
			],
			extendedData: {
				zipFormat: {
					format: 'Xxxx',
				},
				phoneFormat: {
					areaCodes: [8, 4, 5],
				},
			},
		},
		{
			regionName: 'Tasmania',
			regionShort: 'TAS',
			regionSlug: 'tasmania',
			weight: 5,
			cities: ['Greater Hobart', 'Burnie', 'Devonport', 'Launceston'],
			extendedData: {
				zipFormat: {
					format: 'Xxxx',
				},
				phoneFormat: {
					areaCodes: [3, 4, 5],
				},
			},
		},
		{
			regionName: 'Victoria',
			regionShort: 'VIC',
			regionSlug: 'victoria',
			weight: 52,
			cities: [
				'Melbourne',
				'Ararat',
				'Bairnsdale',
				'Benalla',
				'Ballarat',
				'Bendigo',
				'Belgrave',
				'Dandenong',
				'Frankston',
				'Geelong',
				'Hamilton',
				'Horsham',
				'Melton',
				'Moe',
				'Morwell',
				'Mildura',
				'Sale',
				'Shepparton',
				'Swan Hill',
				'Traralgon',
				'Wangaratta',
				'Warrnambool',
				'Wodonga',
			],
			extendedData: {
				zipFormat: {
					format: 'Xxxx',
				},
				phoneFormat: {
					areaCodes: [3, 2, 4, 5],
				},
			},
		},
		{
			regionName: 'Western Australia',
			regionShort: 'WA',
			regionSlug: 'western_australia',
			weight: 21,
			cities: [
				'Perth',
				'Albany',
				'Armadale',
				'Bayswater',
				'Belmont',
				'Bunbury',
				'Canning',
				'Cockburn',
				'Fremantle',
				'Geraldton-Greenough',
				'Gosnells',
				'Joondalup',
				'Kalgoorlie-Boulder',
				'Mandurah',
				'Melville',
				'Nedlands',
				'Rockingham',
				'South Perth',
				'Stirling',
				'Subiaco',
				'Swan',
				'Wanneroo',
			],
			extendedData: {
				zipFormat: {
					format: 'Xxxx',
				},
				phoneFormat: {
					areaCodes: [8, 4, 5],
				},
			},
		},
	],
});

export default Australia;
