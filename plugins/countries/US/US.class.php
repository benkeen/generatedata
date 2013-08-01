<?php

/**
 * @package Countries
 */

class Country_US extends CountryPlugin {
	protected $continent   = "north_america";
	protected $countryName = "United States";
	protected $countrySlug = "US";
	protected $regionNames = "US States";

	protected $extendedData = array(
		"zipFormat" => array(
			"format" => "Xxxxx",
			"replacements" => array(
				"X" => "123456789",
				"x" => "0123456789"
			)
		),
		"phoneFormat" => array(
			"displayFormats" => array(
				"(AAA) Xxx-xxxx",
				"1 (AAA) Xxx-xxxx",
				"1-AAA-Xxx-xxxx"
			)
		)
	);

	protected $countryData = array(
		array(
			"regionName" => 'Alabama',
			"regionShort" => 'AL',
			"regionSlug" => 'alabama',
			"weight" => 2,
			"cities" => array(
				"Birmingham", "Montgomery", "Mobile", "Huntsville", "Tuscaloosa", "Birmingham", "Montgomery", "Mobile", "Huntsville", "Tuscaloosa"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "ZYxxx",
					"replacements" => array(
						"Z" => "3",
						"Y" => "56",
						"x" => "0123456789"
					)
				)
			)
		),
		array(
			"regionName" => 'Alaska',
			"regionShort" => 'AK',
			"regionSlug" => 'alaska',
			"weight" => 2,
			"cities" => array(
				"Anchorage", "Fairbanks", "Juneau", "College", "Anchorage", "Fairbanks", "Juneau", "College", "Ketchikan"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "ZZYxx",
					"replacements" => array(
						"Z" => "9",
						"Y" => "56789",
						"x" => "0123456789"
					)
				)
			)
		),
		array(
			"regionName" => 'Arizona',
			"regionShort" => 'AZ',
			"regionSlug" => 'arizona',
			"weight" => 2,
			"cities" => array(
				"Phoenix", "Tucson", "Mesa", "Glendale", "Chandler"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "ZYxxx",
					"replacements" => array(
						"Z" => "8",
						"Y" => "56",
						"x" => "0123456789"
					)
				)
			)
		),
		array(
			"regionName" => 'Arkansas',
			"regionShort" => 'AR',
			"regionSlug" => 'arkansas',
			"weight" => 2,
			"cities" => array(
				"Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Jonesboro"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "ZYxxx",
					"replacements" => array(
						"Z" => "7",
						"Y" => "12",
						"x" => "0123456789"
					)
				)
			)
		),
		array(
			"regionName" => 'California',
			"regionShort" => 'CA',
			"regionSlug" => 'california',
			"weight" => 2,
			"cities" => array(
				"Los Angeles", "San Diego", "San Jose", "San Francisco", "Fresno", "Sacramento"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"area" => "US-CA",
					"format" => "ZYxxx",
					"replacements" => array(
						"Z" => "9",
						"Y" => "0123456",
						"x" => "0123456789"
					)
				)
			)
		),
		array(
			"regionName" => 'Colorado',
			"regionShort" => 'CO',
			"regionSlug" => 'colorado',
			"weight" => 2,
			"cities" => array(
				"Denver", "Colorado Springs", "Aurora", "Lakewood", "Fort Collins"
			)
		),
		array(
			"regionName" => 'Connecticut',
			"regionShort" => 'CT',
			"regionSlug" => 'connecticut',
			"weight" => 2,
			"cities" => array(
				"Bridgeport", "New Haven", "Hartford", "Stamford", "Waterbury"
			)
		),
		array(
			"regionName" => 'Delaware',
			"regionShort" => 'DE',
			"regionSlug" => 'delaware',
			"weight" => 2,
			"cities" => array(
				"Wilmington", "Dover", "Newark", "Pike Creek", "Bear"
			)
		),
		array(
			"regionName" => 'Florida',
			"regionShort" => 'FL',
			"regionSlug" => 'florida',
			"weight" => 2,
			"cities" => array(
				"Jacksonville", "Miami", "Tampa", "St. Petersburg", "Orlando", "Tallahassee"
			)
		),
		array(
			"regionName" => 'Georgia',
			"regionShort" => 'GA',
			"regionSlug" => 'georgia',
			"weight" => 2,
			"cities" => array(
				"Georgia", "Atlanta", "Augusta", "Columbus", "Savannah", "Athens"
			)
		),
		array(
			"regionName" => 'Hawaii',
			"regionShort" => 'HI',
			"regionSlug" => 'hawaii',
			"weight" => 2,
			"cities" => array(
				"Honolulu", "Hilo", "Kailua", "Kaneohe", "Kapolei"
			)
		),
		array(
			"regionName" => 'Idaho',
			"regionShort" => 'ID',
			"regionSlug" => 'idaho',
			"weight" => 2,
			"cities" => array(
				"Boise", "Nampa", "Meridian", "Pocatello", "Idaho Falls"
			)
		),
		array(
			"regionName" => 'Illinois',
			"regionShort" => 'IL',
			"regionSlug" => 'illinois',
			"weight" => 2,
			"cities" => array(
				"Chicago", "Aurora", "Rockford", "Joliet", "Naperville", "Springfield"
			)
		),
		array(
			"regionName" => 'Indiana',
			"regionShort" => 'IN',
			"regionSlug" => 'indiana',
			"weight" => 2,
			"cities" => array(
				"Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Gary"
			)
		),
		array(
			"regionName" => 'Iowa',
			"regionShort" => 'IA',
			"regionSlug" => 'iowa',
			"weight" => 2,
			"cities" => array(
				"Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City"
			)
		),
		array(
			"regionName" => 'Kansas',
			"regionShort" => 'KS',
			"regionSlug" => 'kansas',
			"weight" => 2,
			"cities" => array(
				"Wichita", "Overland Park", "Kansas City", "Topeka", "Olathe"
			)
		),
		array(
			"regionName" => 'Kentucky',
			"regionShort" => 'KY',
			"regionSlug" => 'kentucky',
			"weight" => 2,
			"cities" => array(
				"Louisville", "Lexington", "Owensboro", "Bowling Green", "Covington", "Frankfort"
			)
		),
		array(
			"regionName" => 'Louisiana',
			"regionShort" => 'LA',
			"regionSlug" => 'louisiana',
			"weight" => 2,
			"cities" => array(
				"New Orleans", "Baton Rouge", "Shreveport", "Metairie", "Lafayette"
			)
		),
		array(
			"regionName" => 'Maine',
			"regionShort" => 'ME',
			"regionSlug" => 'maine',
			"weight" => 2,
			"cities" => array(
				"Portland", "Lewiston", "Bangor", "South Portland", "Auburn", "Augusta"
			)
		),
		array(
			"regionName" => 'Maryland',
			"regionShort" => 'MD',
			"regionSlug" => 'maryland',
			"weight" => 2,
			"cities" => array(
				"Baltimore", "Rockville", "Frederick", "Gaithersburg", "Columbia", "Annapolis"
			)
		),
		array(
			"regionName" => 'Massachusetts',
			"regionShort" => 'MA',
			"regionSlug" => 'massachusetts',
			"weight" => 2,
			"cities" => array(
				"Boston", "Worcester", "Springfield", "Lowell", "Cambridge"
			)
		),
		array(
			"regionName" => 'Michigan',
			"regionShort" => 'MI',
			"regionSlug" => 'michigan',
			"weight" => 2,
			"cities" => array(
				"Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Flint", "Lansing"
			)
		),
		array(
			"regionName" => 'Minnesota',
			"regionShort" => 'MN',
			"regionSlug" => 'minnesota',
			"weight" => 2,
			"cities" => array(
				"Minneapolis", "Saint Paul", "Rochester", "Duluth", "Bloomington"
			)
		),
		array(
			"regionName" => 'Mississippi',
			"regionShort" => 'MS',
			"regionSlug" => 'mississippi',
			"weight" => 2,
			"cities" => array(
				"Jackson", "Gulfport", "Hattiesburg", "Biloxi", "Southaven"
			)
		),
		array(
			"regionName" => 'Missouri',
			"regionShort" => 'MO',
			"regionSlug" => 'missouri',
			"weight" => 2,
			"cities" => array(
				"Kansas City", "Saint Louis", "Springfield", "Independence", "Columbia", "Jefferson City"
			)
		),
		array(
			"regionName" => 'Montana',
			"regionShort" => 'MT',
			"regionSlug" => 'montana',
			"weight" => 2,
			"cities" => array(
				"Billings", "Missoula", "Great Falls", "Butte", "Bozeman", "Helena"
			)
		),
		array(
			"regionName" => 'Nebraska',
			"regionShort" => 'NE',
			"regionSlug" => 'nebraska',
			"weight" => 2,
			"cities" => array(
				"Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"
			)
		),
		array(
			"regionName" => 'Nevada',
			"regionShort" => 'NV',
			"regionSlug" => 'nevada',
			"weight" => 2,
			"cities" => array(
				"Las Vegas", "Henderson", "North Las Vegas", "Reno", "Paradise", "Carson City"
			)
		),
		array(
			"regionName" => 'Ohio',
			"regionShort" => 'OH',
			"regionSlug" => 'ohio',
			"weight" => 2,
			"cities" => array(
				"Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"
			)
		),
		array(
			"regionName" => 'Oklahoma',
			"regionShort" => 'OK',
			"regionSlug" => 'oklahoma',
			"weight" => 2,
			"cities" => array(
				"Oklahoma City", "Tulsa", "Norman", "Lawton", "Broken Arrow"
			)
		),
		array(
			"regionName" => 'Oregon',
			"regionShort" => 'OR',
			"regionSlug" => 'oregon',
			"weight" => 2,
			"cities" => array(
				"Portland", "Eugene", "Salem", "Gresham", "Hillsboro"
			)
		),
		array(
			"regionName" => 'Pennsylvania',
			"regionShort" => 'PA',
			"regionSlug" => 'pennsylvania',
			"weight" => 2,
			"cities" => array(
				"Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Harrisburg"
			)
		),
		array(
			"regionName" => 'Tennessee',
			"regionShort" => 'TN',
			"regionSlug" => 'tennessee',
			"weight" => 2,
			"cities" => array(
				"Memphis", "Nashville", "Knoxville", "Chattanooga", "Clarksville"
			)
		),
		array(
			"regionName" => 'Texas',
			"regionShort" => 'TX',
			"regionSlug" => 'texas',
			"weight" => 2,
			"cities" => array(
				"Houston", "San Antonio", "Dallas", "Austin", "Fort Worth"
			)
		),
		array(
			"regionName" => 'Utah',
			"regionShort" => 'UT',
			"regionSlug" => 'utah',
			"weight" => 2,
			"cities" => array(
				"Salt Lake City", "West Valley City", "Provo", "West Jordan", "Sandy"
			)
		),
		array(
			"regionName" => 'Vermont',
			"regionShort" => 'VT',
			"regionSlug" => 'vermont',
			"weight" => 2,
			"cities" => array(
				"Burlington", "Essex", "Rutland", "Colchester", "South Burlington", "Montpelier"
			)
		),
		array(
			"regionName" => 'Virginia',
			"regionShort" => 'VA',
			"regionSlug" => 'virginia',
			"weight" => 2,
			"cities" => array(
				"Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Newport News"
			)
		),
		array(
			"regionName" => 'Washington',
			"regionShort" => 'WA',
			"regionSlug" => 'washington',
			"weight" => 2,
			"cities" => array(
				"Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Olympia"
			)
		),
		array(
			"regionName" => 'Wisconsin',
			"regionShort" => 'WI',
			"regionSlug" => 'wisconsin',
			"weight" => 2,
			"cities" => array(
				"Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine"
			)
		),
		array(
			"regionName" => 'Wyoming',
			"regionShort" => 'WY',
			"regionSlug" => 'wyoming',
			"weight" => 2,
			"cities" => array(
				"Wyoming", "Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs"
			)
		)
	);

	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
