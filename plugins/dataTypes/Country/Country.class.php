<?php

/**
 * This data type generates a random country name. A few things to know:
 * - The Core script comes with three database tables for country, region and city.
 * - The only countries listed in the country table are those for the Country-Specific Data plugins.
 * - This data type offers a single option when selected: "limit countries to those selected above". This
 *   is used to let the module know to either limit results to the selected Country plugins, or to pull from a much
 *   larger list (hardcoded in the class below). The benefits to using the country-specific data mapping is that
 *   it allows the script to intelligently generate rows of data where the City, Region and Country fields are
 *   in sync (i.e. no cities that don't belong to a particular region, etc).
 *
 * @author Ben Keen <ben.keen@gmail.com>
 * @package DataTypes
 */
class DataType_Country extends DataTypePlugin {
	protected $dataTypeName = "Country";
	protected $dataTypeFieldGroup = "geo";
	protected $dataTypeFieldGroupOrder = 50;
	protected $jsModules = array("Country.js");
	private $countries = array('Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra',
		'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia',
		'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin',
		'Bermuda', 'Bhutan', 'Bolivia', 'Bonaire, Sint Eustatius and Saba', 'Bosnia and Herzegovina', 'Botswana',
		'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
		'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile',
		'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo (Brazzaville)',
		'Congo, the Democratic Republic of the', 'Cook Islands', 'Costa Rica', "Côte D'Ivoire (Ivory Coast)", 'Croatia',
		'Cuba', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
		'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands',
		'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories',
		'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe',
		'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and Mcdonald Islands',
		'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia',
		'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan',
		'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon',
		'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar',
		'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius',
		'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco',
		'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua',
		'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau',
		'Palestine, State of', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands',
		'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda',
		'Saint Barthélemy',  'Saint Helena, Ascension and Tristan da Cunha', 'Saint Kitts and Nevis', 'Saint Lucia',
		'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent and The Grenadines', 'Samoa', 'San Marino',
		'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
		'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
		'South Georgia and The South Sandwich Islands', 'Spain', 'Sri Lanka', 'Sudan', 'South Sudan', 'Suriname',
		'Svalbard and Jan Mayen Islands', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
		'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
		'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
		'United Kingdom (Great Britain)', 'United States', 'United States Minor Outlying Islands', 'Uruguay',
		'Uzbekistan', 'Vanuatu', 'Venezuela', 'Viet Nam', 'Virgin Islands, British', 'Virgin Islands, United States',
		'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe');
	private $numCountries;
	private $selectedCountrySlugs;
	private $numSelectedCountrySlugs;
	private $countryRegionData;
	private $numCountryRegionData;


	/**
	 * For convenience, the constructor gets ALL country-plugin installed and stores all their data locally.
	 * The individual generate() calls for each row filter out the country data it's not interested in.
	 * @param string $runtimeContext
	 */
	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			$this->numCountries = count($this->countries);
			$this->countryRegionData = Core::$geoData->getCountryRegionHash();
			$this->numCountryRegionData = count($this->countryRegionData);
		}
	}

	public function generate($generator, $generationContextData) {
		$data = array();
		if ($generationContextData["generationOptions"] == "all") {
			$data["display"] = $this->countries[mt_rand(0, $this->numCountries-1)];
		} else {
			// pick a random country from whatever countries were selected
			$randomCountrySlug = $this->selectedCountrySlugs[mt_rand(0, $this->numSelectedCountrySlugs-1)];
			$randomCountry     = $this->countryRegionData[$randomCountrySlug];

			$data = array(
				"display" => $randomCountry["country"],
				"slug"    => $randomCountry["country_slug"],
				"id"      => $randomCountry["id"]
			);
		}
		return $data;
	}

	/**
	 * @see DataTypePlugin::getRowGenerationOptions()
	 */
	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		$selectedCountrySlugs = $generator->getCountries();

		$option = "all";
		if (isset($postdata["dtOption_$colNum"])) {
			$option = "countryPluginsOnly";
		}

		// if the user didn't select any countries and they checked the "limit to those countries selected above
		// option, there's nothing for us to generate. Just return false so the row is ignored. TODO: update the 
		// JS code to throw an error 
		if (empty($selectedCountrySlugs) && $option == "countryPluginsOnly") {
			return false;
		}

		$this->selectedCountrySlugs    = $selectedCountrySlugs;
		$this->numSelectedCountrySlugs = count($selectedCountrySlugs);

		return $option;
	}


	public function getOptionsColumnHTML() {
		$html =<<< END
<input type="checkbox" name="dtOption_%ROW%" class="dtCountry_allCountries" value="" id="dtOption_%ROW%" /><label
	class="dtCountry_allCountriesLabel" for="dtOption_%ROW%">{$this->L["limit_results"]}</label>
END;
		return $html;
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(100) default NULL",
			"SQLField_Oracle" => "varchar2(100) default NULL",
			"SQLField_MSSQL" => "VARCHAR(100) NULL"
		);
	}

	/**
	 * Returns an array of countries.
	 */
	public function getCountries($countrySlugs) {
		$whereClause = "";
		if (!empty($countrySlugs)) {
			$whereClause = "WHERE has_full_data_set = 'yes'";
			$slugClauses = array();
			foreach ($countrySlugs as $slug) {
				$slugClauses[] = "country_slug = '$slug'";
			}

			$slugClause = "(" . implode(" OR ", $slugClauses) . ")";
			$whereClause .= "AND $slugClause";
		}

		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			SELECT *
			FROM   {$prefix}countries
			$whereClause
		");

		$countries = array();
		while ($countryInfo = mysqli_fetch_assoc($query)) {
			$countries[] = array(
				"country" => $countryInfo['country'],
				"id"      => $countryInfo['id'],
				"slug"    => $countryInfo["country_slug"]
			);
		}
		return $countries;
	}

	function getRegions($countryID) {
		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			SELECT *
			FROM  {$prefix}regions
			WHERE country_id = $countryID
		");

		if ($response["success"]) {
			$regionInfo = array();
			while ($row = mysqli_fetch_assoc($response["results"])) {
				$regionInfo[] = $row;
			}
		}

		return $regionInfo;
	}
}
