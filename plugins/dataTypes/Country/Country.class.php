<?php

/**
 * This data type generates a random country name. A few things to know:
 * - The Core script comes with three database tables for country, region and city.
 * - The only countries listed in the country table are those for the Country-Specific Data plugins (so
 *   probably not very many when the script is first released).
 * - This data type offers a single option when selected: "limit countries to those selected above". This
 *   is used to let the module know to either limit results to the Country plugin data, or to pull from a much
 *   larger list (hardcoded in the class below). The benefits to using the country-specific data mapping is that
 *   it allows the script to intelligently generate rows of data where the City, Region and Country fields are
 *   in synch (i.e. no cities that don't belong to a particular region, etc).
 */
class DataType_Country extends DataTypePlugin {
	protected $dataTypeName = "Country";
	protected $dataTypeFieldGroup = "geo";
	protected $dataTypeFieldGroupOrder = 50;
	protected $jsModules = array("Country.js");
	private $countries = array('Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola',
		'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia',
		'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium',
		'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island',
		'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi',
		'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad',
		'Chile', 'China', 'Christmas Island',  'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo',
		'Cook Islands', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti',
		'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea',
		'Estonia', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France',
		'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia',
		'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala',
		'Guinea', 'Guinea-bissau', 'Guyana', 'Haiti', 'Heard Island and Mcdonald Islands',
		'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia',
		'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
		'Korea', 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia',
		'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar',
		'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania',
		'Mauritius', 'Mayotte', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montserrat', 'Morocco',
		'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia',
		'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway',
		'Oman', 'Pakistan', 'Palau', 'Palestinian Territory, Occupied', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
		'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania',
		'Russian Federation', 'Rwanda', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia',
		'Saint Pierre and Miquelon', 'Saint Vincent and The Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
		'Saudi Arabia', 'Senegal', 'Serbia and Montenegro', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia',
		'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and The South Sandwich Islands',
		'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Swaziland', 'Sweden', 'Switzerland',
		'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand',
		'Timor-leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
		'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
		'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Viet Nam', 'Virgin Islands, British',
		'Virgin Islands, U.S.', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe');
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
			$data["display"] = $this->countries[rand(0, $this->numCountries-1)];
		} else {
			// pick a random country from whatever countries were selected
			$randomCountrySlug = $this->selectedCountrySlugs[rand(0, $this->numSelectedCountrySlugs-1)];
			$randomCountry = $this->countryRegionData[$randomCountrySlug];

			$data = array(
				"display" => $randomCountry["country"],
				"slug"    => $randomCountry["country_slug"],
				"id"      => $randomCountry["id"]
			);
		}
		return $data;
	}

	/**
	 * Called for each row. This figures out what country-data we're interested in generating for
	 * this row - either a subset of the selected Country plugins, or ANY country name.
	 * @see DataTypePlugin::getRowGenerationOptions()
	 */
	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		if (empty($selectedCountrySlugs)) {
			$this->selectedCountrySlugs    = $generator->getCountries();
			$this->numSelectedCountrySlugs = count($this->selectedCountrySlugs);
		}

		$option = "all";
		if (isset($postdata["dtOption_$colNum"])) {
			$option = "countryPluginsOnly";
		}
		return $option;
	}


	public function getOptionsColumnHTML() {
		$html =<<< END
<input type="checkbox" name="dtOption_%ROW%" value="" id="dtOption_%ROW%" checked="checked" />
	<label for="dtOption_%ROW%">{$this->L["limit_results"]}</label>
END;
		return $html;
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(100) default NULL",
			"SQLField_Oracle" => "varchar2(100) default NULL"
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
		while ($countryInfo = mysql_fetch_assoc($query)) {
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
			while ($row = mysql_fetch_assoc($response["results"])) {
				$regionInfo[] = $row;
			}
		}

		return $regionInfo;
	}
}
