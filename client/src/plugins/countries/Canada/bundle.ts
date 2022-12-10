import { GetCountryData } from '~types/countries';

const Canada: GetCountryData = (i18n) => ({
	countryName: i18n.countryName,
	countrySlug: 'canada',
	regionNames: i18n.regionNames,
	continent: 'north_america',
	extendedData: {

		// the general zip format for the country. This may be optionally overridden for each region if a more
		// specific format is desired. To prevent duplicate code, the replacements listed here cover ALL zip formats
		// for each province
		zipFormat: {
			format: '%*@ *@*',
			replacements: {
				'%': 'ABCEGHJKLMNPRSTVXY',
				'*': '0123456789',
				'@': 'ABCEGHJKLMNPRSTVWXYZ',

				// used in individual provinces below
				'&': 'GHJ', // QC
				'^': 'KLMNP' // ON
			}
		},

		// the general phone format and area codes for the country
		// http://cnac.ca/area_code_maps/canadian_area_codes.htm
		phoneFormat: {
			areaCodes: [
				403, 587, 780, 825,		// AB
				236, 250, 604, 672, 778,	// BC
				204, 431,			// MB
				428, 506,			// NB
				709, 879,			// NL
				867,				// NT, NU, YK
				782, 902,			// NS
				416, 437, 647, 289, 365, 905, 343, 613, 226, 519, 548, 249, 705, 807,	// ON
				782, 902,			// PE
				367, 418, 581, 450, 579, 438, 514, 819, 873,				// QC
				306, 639			// SK
			],
			displayFormats: [
				'(AAA} Xxx-xxxx',
				'1 (AAA} Xxx-xxxx',
				'1-AAA-Xxx-xxxx'
			]
		}
	},

	// our country-wide data, with info separated into regions
	regions: [
		{
			regionName: 'Alberta',
			regionShort: 'AB',
			regionSlug: 'alberta',
			weight: 11,
			cities: [
				'Airdrie', 'Alix', 'Banff', 'Barrhead', 'Bearberry', 'Beaumont', 'Bon Accord', 'Bonnyville',
				'Bonnyville Municipal District', 'Bowden', 'Breton', 'Bruderheim', 'Calgary', 'Calmar', 'Camrose',
				'Canmore', 'Carstairs', 'Castor', 'Chestermere', 'Clearwater Municipal District', 'Coaldale', 'Coalhurst',
				'Cochrane', 'Crowsnest Pass', 'Crystal Springs', 'Devon', 'Drayton Valley', 'Drumheller', 'Eckville',
				'Edmonton', 'Fahler', 'Fort Saskatchewan', 'Gibbons', 'Glendon', 'Grande Prairie', 'Grande Cache',
				'High Level', 'Hines Creek', 'Innisfail', 'Irricana', 'Jasper', 'Kitscoty', 'Lac La Biche County',
				'Lac Ste. Anne', 'Lacombe', 'Lacombe County', 'Lakeland County', 'Lamont', 'Leduc', 'Legal', 'Lloydminster',
				'Lethbridge', 'Mayerthorpe', 'Medicine Hat', 'Millet', 'Morinville', 'Mundare', 'Nanton', 'New Sarepta',
				'Okotoks', 'Oyen', 'Provost', 'Parkland County', 'Penhold', 'Picture Butte', 'Pincher Creek', 'Ponoka',
				'Raymond', 'Red Deer', 'Redwater', 'Rimbey', 'Rocky Mountain House', 'Rocky View', 'Rycroft', 'St. Albert',
				'St. Paul', 'Sedgewick', 'Smoky Lake', 'Spruce Grove', 'Stirling', 'Strathcona County', 'Stony Plain', 'Sundrie',
				'Sunset Point', 'Swan Hills', 'Sylvan Lake', 'Taber', 'Tofield', 'Trochu', 'Valleyview', 'Vegreville', 'Vilna',
				'Wabamun', 'Warburg', 'Warspite', 'Westlock', 'Wetaskiwin', 'Wood Buffalo', 'Woodlands County', 'Yellowhead County'
			],
			extendedData: {
				zipFormat: {
					format: 'T*@ *@*'
				},
				phoneFormat: {
					areaCodes: [403, 587, 780, 825]
				}
			}
		},
		{
			regionName: 'British Columbia',
			regionShort: 'BC',
			regionSlug: 'british_columbia',
			weight: 13,
			cities: [
				'100 Mile House', 'Abbotsford', 'Alert Bay', 'Armstrong', 'Belcarra', 'Burnaby', 'Burns Lake', 'Cache Creek',
				'Cariboo Regional District', 'Castlegar', 'Chetwynd', 'Chilliwack', 'Coldstream', 'Colwood', 'Comox', 'Coquitlam',
				'Cranbrook', 'Dawson Creek', 'Delta', 'Fernie', 'Duncan', 'Fort St. John', 'Fraser Lake', 'Fraser-Fort George',
				'Gibsons', 'Harrison Hot Springs', 'Hope', 'Houston', 'Hudson\'s Hope', 'Kelowna', 'Kent', 'Kimberly', 'Kitimat',
				'Lake Cowichan', 'Langford', 'Langley', 'Lions Bay', 'Mission', 'Maple Ridge', 'Merritt', 'Midway', 'Nanaimo',
				'Nakusp', 'Nelson', 'New Westminster', 'North Cowichan', 'North Saanich', 'North Vancouver', 'Oliver',
				'Pemberton', 'Penticton', 'Pitt Meadows', 'Port Alice', 'Port Coquitlam', 'Port Moody', 'Prince George',
				'Qualicum Beach', 'Richmond', 'Salt Spring Island', 'Silverton', 'Smithers', 'Sooke', 'Sparwood', 'Stewart',
				'Sunshine Coast Regional District', 'Surrey', 'Terrance', 'Tumbler Ridge', 'Ucluelet', 'Vancouver', 'Vanderhoof',
				'Victoria', 'West Vancouver', 'White Rock', 'Williams Lake'
			],
			extendedData: {
				zipFormat: {
					format: 'V*@ *@*'
				},
				phoneFormat: {
					areaCodes: [236, 250, 604, 672, 778]
				}
			}
		},
		{
			regionName: 'Manitoba',
			regionShort: 'MB',
			regionSlug: 'manitoba',
			weight: 4,
			cities: [
				'Winnipeg', 'Stonewall', 'Minitonas', 'Lourdes', 'Flin Flon', 'Daly', 'Brandon', 'Beausejour'
			],
			extendedData: {
				zipFormat: {
					format: 'R*@ *@*'
				},
				phoneFormat: {
					areaCodes: [204, 431]
				}
			}
		},
		{
			regionName: 'New Brunswick',
			regionShort: 'NB',
			regionSlug: 'new_brunswick',
			weight: 2,
			cities: [
				'Bathurst', 'Campbellton', 'Dieppe', 'Edmundston', 'Fredericton', 'Miramichi', 'Moncton', 'Saint John'
			],
			extendedData: {
				zipFormat: {
					format: 'E*@ *@*'
				},
				phoneFormat: {
					areaCodes: [428, 506]
				}
			}
		},
		{
			regionName: 'Newfoundland and Labrador',
			regionShort: 'NL',
			regionSlug: 'newfoundland_and_labrador',
			weight: 2,
			cities: [
				'St. John\'s', 'Springdale', 'Spaniard\'s Bay', 'Rigolet', 'Paradise', 'Mount Pearl', 'McCallum', 'Marystown',
				'Harbour Grace', 'Glovertown', 'Gander', 'Fogo', 'Fortune', 'Carbonear', 'Burin', 'Bonavista', 'Bay Roberts'
			],
			extendedData: {
				zipFormat: {
					format: 'A*@ *@*'
				},
				phoneFormat: {
					areaCodes: [709, 879]
				}
			}
		},
		{
			regionName: 'Northwest Territories',
			regionShort: 'NT',
			regionSlug: 'northwest_territories',
			weight: 1,
			cities: [
				'Yellowknife', 'Wrigley', 'Wha Ti', 'Wekweti', 'Tulita', 'Tuktoyaktuk', 'Tsiigehtchic', 'Sachs Harbour',
				'Rae Lakes', 'Rae-Edzo', 'Paulatuk', 'Norman Wells', 'Lutsel K\'e', 'Kakisa', 'Inuvik', 'Holman', 'Hay River',
				'Fort Smith', 'Fort Simpson', 'Fort Resolution', 'Fort Providence', 'Fort McPherson', 'Fort Laird',
				'Fort Good Hope', 'Enterprise', 'Deline', 'Coleville Lake', 'Aklavik'
			],
			extendedData: {
				zipFormat: {
					format: 'X*@ *@*'
				},
				phoneFormat: {
					areaCodes: [867]
				}
			}
		},
		{
			regionName: 'Nova Scotia',
			regionShort: 'NS',
			regionSlug: 'nova_scotia',
			weight: 1,
			cities: [
				'Municipal District', 'Town of Yarmouth', 'Wolfville', 'Pugwash', 'Pictou', 'New Glasgow',
				'Halifax', 'Guysborough', 'Cumberland County', 'Cape Breton Island', 'Berwick', 'Baddeck', 'Argyle',
				'Annapolis Royal', 'Annapolis County'
			],
			extendedData: {
				zipFormat: {
					format: 'B*@ *@*'
				},
				phoneFormat: {
					areaCodes: [782, 902]
				}
			}
		},
		{
			regionName: 'Nunavut',
			regionShort: 'NU',
			regionSlug: 'nunavut',
			weight: 1,
			cities: [
				'Arviat', 'Cambridge Bay', 'Gjoa Haven', 'Pangnirtung', 'Iqaluit'
			],
			extendedData: {
				zipFormat: {
					format: 'X*@ *@*'
				},
				phoneFormat: {
					areaCodes: [867]
				}
			}
		},
		{
			regionName: 'Ontario',
			regionShort: 'ON',
			regionSlug: 'ontario',
			weight: 39,
			cities: [
				'Ajax', 'Aurora', 'Ancaster Town', 'Barrie', 'Bath', 'Blind River', 'Burlington', 'Caledon', 'Cobourg',
				'Cornwall', 'Cumberland', 'East Gwillimbury', 'Essex', 'Etobicoke', 'Gloucester', 'Goderich', 'Grey County',
				'Guelph', 'Hamilton', 'Hearst', 'Kapuskasing', 'Kawartha Lakes', 'Kearny', 'King Township', 'Kingston',
				'Kitchener', 'Lakeshore', 'Lanark County', 'LaSalle', 'Leamington', 'Malahide', 'Markham',
				'Merrickville-Wolford', 'Midlands', 'Township of Minden Hills', 'Minto', 'Newbury', 'Newmarket',
				'Norfolk County', 'North Bay', 'Northumberland', 'Orangeville', 'Orilla', 'Osgoode', 'Ottawa',
				'Ottawa-Carleton', 'Owen Sound', 'Oxford County', 'Pickering', 'Port Hope', 'Quinte West', 'Ramara',
				'Renfrew', 'Richmond Hill', 'Russell', 'Scarborough', 'St. Catharines', 'St. Thomas', 'Greater Sudbury',
				'Tay', 'Thorold', 'Thunder Bay', 'Toronto', 'Valley East', 'Vanier', 'Vaughan', 'Warwick', 'Welland',
				'Whitby', 'Whitchurch-Stouffville', 'Whitewater Region Township', 'Wilmont', 'Windsor', 'Woodstock'
			],
			extendedData: {
				zipFormat: {
					format: '^*@ *@*'
				},
				phoneFormat: {
					areaCodes: [416, 647, 437, 519, 226, 613, 343, 705, 249, 807, 905, 289, 365]
				}
			}
		},
		{
			regionName: 'Prince Edward Island',
			regionShort: 'PE',
			regionSlug: 'prince_edward_island',
			weight: 1,
			cities: [
				'Charlottetown', 'Montague', 'Stratford'
			],
			extendedData: {
				zipFormat: {
					format: 'C*@ *@*'
				},
				phoneFormat: {
					areaCodes: [782, 902]
				}
			}
		},
		{
			regionName: 'Quebec',
			regionShort: 'QC',
			regionSlug: 'quebec',
			weight: 23,
			cities: [
				'Amqui', 'Cabano', 'Dégelis', 'Price', 'Rimouski', 'Rivière-du-Loup', 'Sainte-Flavie', 'Alma', 'Chambord',
				'Chicoutimi', 'La Baie', 'Labrecque', 'Saguenay', 'Saint-Prime', 'Shipshaw', 'Baie-Saint-Paul', 'Beauport',
				'Cap-Rouge', 'Deschambault', 'Isle-aux-Coudres', 'Lac-Serent', 'Malbaie', 'Neuville', 'Pointe-au-Pic',
				'Québec City', 'Saint-Hilarion', 'Saint-Urbain', 'Batiscan', 'Cap-de-la-Madeleine', 'Champlain',
				'Pointe-du-Lac', 'Saint-Georges', 'Shawinigan', 'Trois-Rivières', 'Asbestos', 'Richmond', 'Sherbrooke',
				'Valcourt', 'Anjou', 'Baie-D\'Urfé', 'Beaconsfield', 'Côte Saint-Luc', 'Dollard-des-Ormeaux', 'Dorval',
				'Hampstead', 'Kirkland', 'Lachine', 'LaSalle', 'Montreal', 'Outremont', 'Pierrefonds', 'Pointe-aux-Trembles',
				'Pointe-Claire', 'Roxboro', 'Saint-Laurent', 'Saint-Pierre', 'Senneville', 'Verdun', 'Westmount', 'Aylmer',
				'Buckingham', 'Cantley', 'Chelsea', 'Collines-de-l\'Outaouais', 'Gatineau', 'Hull', 'Ville de Maniwaki',
				'Mansfield-et-Pontefract', 'Montebello', 'Montpellier', 'Namur', 'Notre-Dame-de-la-Salette', 'Shawville',
				'Thurso', 'Dubuisson', 'Malartic', 'Notre-Dame-du-Nord', 'Rouyn-Noranda', 'Baie-Comeau', 'Fermont',
				'Kawawachikamach', 'Matagami', 'Caplan', 'Carleton', 'Gaspé', 'Gespeg', 'Maria', 'Murdochville',
				'Cap-Saint-Ignace', 'Charny', 'Lévis'
			],
			extendedData: {
				zipFormat: {
					format: '&*@ *@*'
				},
				phoneFormat: {
					areaCodes: [418, 581, 450, 579, 514, 438, 819, 873]
				}
			}
		},
		{
			regionName: 'Saskatchewan',
			regionShort: 'SK',
			regionSlug: 'saskatchewan',
			weight: 4,
			cities: [
				'Assiniboia', 'Calder', 'Canora', 'Estevan', 'Gravelbourg', 'Hudson Bay', 'Lang', 'Langenburg', 'Lloydminster',
				'Macklin', 'Maple Creek', 'Milestone', 'Moose Jaw', 'North Battleford', 'Prince Albert', 'Regina', 'Saskatoon',
				'Weyburn', 'Yorkton'
			],
			extendedData: {
				zipFormat: {
					format: 'S*@ *@*'
				},
				phoneFormat: {
					areaCodes: [306, 639]
				}
			}
		},
		{
			regionName: 'Yukon',
			regionShort: 'YT',
			regionSlug: 'yukon',
			weight: 1,
			cities: [
				'Whitehorse', 'Watson Lake'
			],
			extendedData: {
				zipFormat: {
					format: 'Y*@ *@*'
				},
				phoneFormat: {
					areaCodes: [867]
				}
			}
		}
	]
});

export default Canada;
