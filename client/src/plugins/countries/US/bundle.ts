import { GetCountryData } from '~types/countries';

const US: GetCountryData = (i18n) => ({
	countryName: i18n.countryName,
	countrySlug: 'US',
	regionNames: i18n.regionNames,
	continent: 'north_america',

	extendedData: {
		zipFormat: {
			format: 'Xxxxx'
		},
		phoneFormat: {
			displayFormats: [
				'(AAA} Xxx-xxxx',
				'1 (AAA} Xxx-xxxx',
				'1-AAA-Xxx-xxxx'
			]
		}
	},

	regions: [
		{
			regionName: 'Alabama',
			regionShort: 'AL',
			regionSlug: 'alabama',
			weight: 2,
			cities: [
				'Birmingham', 'Montgomery', 'Mobile', 'Huntsville', 'Tuscaloosa', 'Birmingham', 'Montgomery',
				'Mobile', 'Huntsville', 'Tuscaloosa'
			],
			extendedData: {
				zipFormat: {
					format: 'ZYxxx',
					replacements: {
						'Z': '3',
						'Y': '56',
						'x': '0123456789'
					}
				}
			}
		},
		{
			regionName: 'Alaska',
			regionShort: 'AK',
			regionSlug: 'alaska',
			weight: 2,
			cities: [
				'Anchorage', 'Fairbanks', 'Juneau', 'College', 'Anchorage', 'Fairbanks', 'Juneau', 'College', 'Ketchikan'
			],
			extendedData: {
				zipFormat: {
					'format': 'ZZYxx',
					'replacements': {
						'Z': '9',
						'Y': '56789',
						'x': '0123456789'
					}
				}
			}
		},
		{
			regionName: 'Arizona',
			regionShort: 'AZ',
			regionSlug: 'arizona',
			weight: 2,
			cities: [
				'Phoenix', 'Tucson', 'Mesa', 'Glendale', 'Chandler'
			],
			extendedData: {
				zipFormat: {
					format: 'ZYxxx',
					replacements: {
						'Z': '8',
						'Y': '56',
						'x': '0123456789'
					}
				}
			}
		},
		{
			regionName: 'Arkansas',
			regionShort: 'AR',
			regionSlug: 'arkansas',
			weight: 2,
			cities: [
				'Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro'
			],
			extendedData: {
				'zipFormat': {
					'format': 'ZYxxx',
					'replacements': {
						'Z': '7',
						'Y': '12',
						'x': '0123456789'
					}
				}
			}
		},
		{
			regionName: 'California',
			regionShort: 'CA',
			regionSlug: 'california',
			weight: 2,
			cities: [
				'Los Angeles', 'San Diego', 'San Jose', 'San Francisco', 'Fresno', 'Sacramento'
			],
			extendedData: {
				zipFormat: {
					// 'area': 'US-CA',
					format: 'ZYxxx',
					replacements: {
						'Z': '9',
						'Y': '0123456',
						'x': '0123456789'
					}
				}
			}
		},
		{
			regionName: 'Colorado',
			regionShort: 'CO',
			regionSlug: 'colorado',
			weight: 2,
			cities: [
				'Denver', 'Colorado Springs', 'Aurora', 'Lakewood', 'Fort Collins'
			]
		},
		{
			regionName: 'Connecticut',
			regionShort: 'CT',
			regionSlug: 'connecticut',
			weight: 2,
			cities: [
				'Bridgeport', 'New Haven', 'Hartford', 'Stamford', 'Waterbury'
			]
		},
		{
			regionName: 'Delaware',
			regionShort: 'DE',
			regionSlug: 'delaware',
			weight: 2,
			cities: [
				'Wilmington', 'Dover', 'Newark', 'Pike Creek', 'Bear'
			]
		},
		{
			regionName: 'Florida',
			regionShort: 'FL',
			regionSlug: 'florida',
			weight: 2,
			cities: [
				'Jacksonville', 'Miami', 'Tampa', 'St. Petersburg', 'Orlando', 'Tallahassee'
			]
		},
		{
			regionName: 'Georgia',
			regionShort: 'GA',
			regionSlug: 'georgia',
			weight: 2,
			cities: [
				'Georgia', 'Atlanta', 'Augusta', 'Columbus', 'Savannah', 'Athens'
			]
		},
		{
			regionName: 'Hawaii',
			regionShort: 'HI',
			regionSlug: 'hawaii',
			weight: 2,
			cities: [
				'Honolulu', 'Hilo', 'Kailua', 'Kaneohe', 'Kapolei'
			]
		},
		{
			regionName: 'Idaho',
			regionShort: 'ID',
			regionSlug: 'idaho',
			weight: 2,
			cities: [
				'Boise', 'Nampa', 'Meridian', 'Pocatello', 'Idaho Falls'
			]
		},
		{
			regionName: 'Illinois',
			regionShort: 'IL',
			regionSlug: 'illinois',
			weight: 2,
			cities: [
				'Chicago', 'Aurora', 'Rockford', 'Joliet', 'Naperville', 'Springfield'
			]
		},
		{
			regionName: 'Indiana',
			regionShort: 'IN',
			regionSlug: 'indiana',
			weight: 2,
			cities: [
				'Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Gary'
			]
		},
		{
			regionName: 'Iowa',
			regionShort: 'IA',
			regionSlug: 'iowa',
			weight: 2,
			cities: [
				'Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City'
			]
		},
		{
			regionName: 'Kansas',
			regionShort: 'KS',
			regionSlug: 'kansas',
			weight: 2,
			cities: [
				'Wichita', 'Overland Park', 'Kansas City', 'Topeka', 'Olathe'
			]
		},
		{
			regionName: 'Kentucky',
			regionShort: 'KY',
			regionSlug: 'kentucky',
			weight: 2,
			cities: [
				'Louisville', 'Lexington', 'Owensboro', 'Bowling Green', 'Covington', 'Frankfort'
			]
		},
		{
			regionName: 'Louisiana',
			regionShort: 'LA',
			regionSlug: 'louisiana',
			weight: 2,
			cities: [
				'New Orleans', 'Baton Rouge', 'Shreveport', 'Metairie', 'Lafayette'
			]
		},
		{
			regionName: 'Maine',
			regionShort: 'ME',
			regionSlug: 'maine',
			weight: 2,
			cities: [
				'Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn', 'Augusta'
			]
		},
		{
			regionName: 'Maryland',
			regionShort: 'MD',
			regionSlug: 'maryland',
			weight: 2,
			cities: [
				'Baltimore', 'Rockville', 'Frederick', 'Gaithersburg', 'Columbia', 'Annapolis'
			]
		},
		{
			regionName: 'Massachusetts',
			regionShort: 'MA',
			regionSlug: 'massachusetts',
			weight: 2,
			cities: [
				'Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge'
			]
		},
		{
			regionName: 'Michigan',
			regionShort: 'MI',
			regionSlug: 'michigan',
			weight: 2,
			cities: [
				'Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Flint', 'Lansing'
			]
		},
		{
			regionName: 'Minnesota',
			regionShort: 'MN',
			regionSlug: 'minnesota',
			weight: 2,
			cities: [
				'Minneapolis', 'Saint Paul', 'Rochester', 'Duluth', 'Bloomington'
			]
		},
		{
			regionName: 'Mississippi',
			regionShort: 'MS',
			regionSlug: 'mississippi',
			weight: 2,
			cities: [
				'Jackson', 'Gulfport', 'Hattiesburg', 'Biloxi', 'Southaven'
			]
		},
		{
			regionName: 'Missouri',
			regionShort: 'MO',
			regionSlug: 'missouri',
			weight: 2,
			cities: [
				'Kansas City', 'Saint Louis', 'Springfield', 'Independence', 'Columbia', 'Jefferson City'
			]
		},
		{
			regionName: 'Montana',
			regionShort: 'MT',
			regionSlug: 'montana',
			weight: 2,
			cities: [
				'Billings', 'Missoula', 'Great Falls', 'Butte', 'Bozeman', 'Helena'
			]
		},
		{
			regionName: 'Nebraska',
			regionShort: 'NE',
			regionSlug: 'nebraska',
			weight: 2,
			cities: [
				'Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney'
			]
		},
		{
			regionName: 'Nevada',
			regionShort: 'NV',
			regionSlug: 'nevada',
			weight: 2,
			cities: [
				'Las Vegas', 'Henderson', 'North Las Vegas', 'Reno', 'Paradise', 'Carson City'
			]
		},
		{
			regionName: 'Ohio',
			regionShort: 'OH',
			regionSlug: 'ohio',
			weight: 2,
			cities: [
				'Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron'
			]
		},
		{
			regionName: 'Oklahoma',
			regionShort: 'OK',
			regionSlug: 'oklahoma',
			weight: 2,
			cities: [
				'Oklahoma City', 'Tulsa', 'Norman', 'Lawton', 'Broken Arrow'
			]
		},
		{
			regionName: 'Oregon',
			regionShort: 'OR',
			regionSlug: 'oregon',
			weight: 2,
			cities: [
				'Portland', 'Eugene', 'Salem', 'Gresham', 'Hillsboro'
			]
		},
		{
			regionName: 'Pennsylvania',
			regionShort: 'PA',
			regionSlug: 'pennsylvania',
			weight: 2,
			cities: [
				'Philadelphia', 'Pittsburgh', 'Allentown', 'Erie', 'Reading', 'Harrisburg'
			]
		},
		{
			regionName: 'Tennessee',
			regionShort: 'TN',
			regionSlug: 'tennessee',
			weight: 2,
			cities: [
				'Memphis', 'Nashville', 'Knoxville', 'Chattanooga', 'Clarksville'
			]
		},
		{
			regionName: 'Texas',
			regionShort: 'TX',
			regionSlug: 'texas',
			weight: 2,
			cities: [
				'Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth'
			]
		},
		{
			regionName: 'Utah',
			regionShort: 'UT',
			regionSlug: 'utah',
			weight: 2,
			cities: [
				'Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Sandy'
			]
		},
		{
			regionName: 'Vermont',
			regionShort: 'VT',
			regionSlug: 'vermont',
			weight: 2,
			cities: [
				'Burlington', 'Essex', 'Rutland', 'Colchester', 'South Burlington', 'Montpelier'
			]
		},
		{
			regionName: 'Virginia',
			regionShort: 'VA',
			regionSlug: 'virginia',
			weight: 2,
			cities: [
				'Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News'
			]
		},
		{
			regionName: 'Washington',
			regionShort: 'WA',
			regionSlug: 'washington',
			weight: 2,
			cities: [
				'Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue', 'Olympia'
			]
		},
		{
			regionName: 'Wisconsin',
			regionShort: 'WI',
			regionSlug: 'wisconsin',
			weight: 2,
			cities: [
				'Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine'
			]
		},
		{
			regionName: 'Wyoming',
			regionShort: 'WY',
			regionSlug: 'wyoming',
			weight: 2,
			cities: [
				'Wyoming', 'Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs'
			]
		}
	]
});

export default US;
