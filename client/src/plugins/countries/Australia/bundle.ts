import { GetCountryData } from '~types/countries';

const Australia: GetCountryData = (i18n) => ({
	countryName: i18n.countryName,
	countrySlug: 'australia',
	regionNames: i18n.regionNames,
	continent: 'oceania',
	extendedData: {
		zipFormat: {
			format: 'Xxxx'
		},
		phoneFormat: {
			displayFormats: [
				'Xxxx-xxxx',
				'(0x) xxxx xxxx',
				'04xx xxx xxx'
			]
		}
	},
	regions: [
		{
			regionName: 'Australian Capital Territory',
			regionShort: 'ACT',
			regionSlug: 'australian_capital_territories',
			weight: 3,
			cities: [
				'Canberra'
			]
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
				'Wollongong'
			]
		},
		{
			regionName: 'Northern Territory',
			regionShort: 'NT',
			regionSlug: 'northern_territory',
			weight: 2,
			cities: [
				'Darwin',
				'Palmerston'
			]
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
				'Townsville'
			]
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
				'Whyalla'
			]
		},
		{
			regionName: 'Tasmania',
			regionShort: 'TAS',
			regionSlug: 'tasmania',
			weight: 5,
			cities: [
				'Greater Hobart',
				'Burnie',
				'Devonport',
				'Launceston'
			]
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
				'Wodonga'
			]
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
				'Wanneroo'
			]
		}
	]
});

export default Australia;
