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
	private $countries;



	public function generateItem($row, $placeholderStr, $existingRowData) {
		//global $g_countries;
		$random_country = $g_countries[rand(0, count($g_countries)-1)];
		return array(
			"display" => $random_country["country"],
			"slug"    => $random_country["slug"],
			"id"      => $random_country["id"]
		);
	}

	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($export_type)
		{
			case "sql":
				if ($options == "MySQL" || $options == "SQLite")
					$info = "varchar(100) default NULL";
				else if ($options == "Oracle")
					$info = "varchar2(100) default NULL";
				break;
		}

		return $info;
	}


	public function getTemplateOptions($postdata, $col, $num_cols) {
		if (isset($postdata["option_$col"])) {
			$g_countries = Country_get_countries($postdata["countryChoice"]);
		} else {
			$g_countries = Country_get_countries();
		}
		return "";
	}


	public function getOptionsColumnHTML() {
		$html =<<< END
<input type="checkbox" name="dtOption_%ROW%" value="" id="dtOption_%ROW%" checked="checked" />
	<label for="dtOption_%ROW%">{$this->L["Country_limit_results"]}</label>
END;
		return $html;
	}


	// TODO

	// VALUES ('Afghanistan', 'afghanistan'),('Albania', 'albania'),('Algeria', 'algeria'),('American Samoa', 'american_samoa'),('Andorra', 'andorra'),('Angola', 'angola'),('Anguilla', 'anguilla'),('Antarctica', 'antarctica'),('Antigua and Barbuda', 'antigua_and_barbuda'),('Argentina', 'argentina'),('Armenia', 'armenia'),('Aruba', 'aruba'),('Austria', 'austria'),('Azerbaijan', 'azerbaijan'),('Bahamas', 'bahamas'),('Bahrain', 'bahrain'),('Bangladesh', 'bangladesh'),('Barbados', 'barbados'),('Belarus', 'belarus'),('Belgium', 'belgium'),('Belize', 'belize'),('Benin', 'benin'),('Bermuda', 'bermuda'),('Bhutan', 'bhutan'),('Bolivia', 'bolivia'),('Bosnia and Herzegovina', 'bosnia_and_herzegovina'),('Botswana', 'botswana'),('Bouvet Island', 'bouvet_island'),('Brazil', 'brazil'),('British Indian Ocean Territory', 'british_indian_ocean_territory'),('Brunei Darussalam', 'brunei_darussalam'),('Bulgaria', 'bulgaria'),('Burkina Faso', 'burkina_faso'),('Burundi', 'burundi'),('Cambodia', 'cambodia'),('Cameroon', 'cameroon'),('Canada', 'canada'),('Cape Verde', 'cape_verde'),('Cayman Islands', 'cayman_islands'),('Central African Republic', 'central_african_republic'),('Chad', 'chad'),('Chile', 'chile'),('China', 'china'),('Christmas Island', 'christmas_island'),('Cocos (Keeling) Islands', 'cocos_keeling_islands'),('Colombia', 'colombia'),('Comoros', 'comoros'),('Congo', 'congo'),('Cook Islands', 'cook_islands'),('Costa Rica', 'costa_rica'),('Croatia', 'croatia'),('Cuba', 'cuba'),('Cyprus', 'cyprus'),('Czech Republic', 'czech_republic'),('Denmark', 'denmark'),('Djibouti', 'djibouti'),('Dominica', 'dominica'),('Dominican Republic', 'dominican_republic'),('Ecuador', 'ecuador'),('Egypt', 'egypt'),('El Salvador', 'el_salvador'),('Equatorial Guinea', 'equatorial_guinea'),('Eritrea', 'eritrea'),('Estonia', 'estonia'),('Ethiopia', 'ethiopia'),('Falkland Islands (Malvinas)', 'falkland_islands_malvinas'),('Faroe Islands', 'faroe_islands'),('Fiji', 'fiji'),('Finland', 'finland'),('France', 'france'),('French Guiana', 'french_guiana'),('French Polynesia', 'french_polynesia'),('French Southern Territories', 'french_southern_territories'),('Gabon', 'gabon'),('Gambia', 'gambia'),('Georgia', 'georgia'),('Germany', 'germany'),('Ghana', 'ghana'),('Gibraltar', 'gibraltar'),('Greece', 'greece'),('Greenland', 'greenland'),('Grenada', 'grenada'),('Guadeloupe', 'guadeloupe'),('Guam', 'guam'),('Guatemala', 'guatemala'),('Guinea', 'guinea'),('Guinea-bissau', 'guinea_bissau'),('Guyana', 'guyana'),('Haiti', 'haiti'),('Heard Island and Mcdonald Islands', 'heard_island_and_mcdonald_islands'),('Holy See (Vatican City State)', 'holy_see_vatican_city_state'),('Honduras', 'honduras'),('Hong Kong', 'hong_kong'),('Hungary', 'hungary'),('Iceland', 'iceland'),('India', 'india'),('Indonesia', 'indonesia'),('Iran, Islamic Republic of', 'iran_islamic_republic_of'),('Iraq', 'iraq'),('Ireland', 'ireland'),('Israel', 'israel'),('Italy', 'italy'),('Jamaica', 'jamaica'),('Japan', 'japan'),('Jordan', 'jordan'),('Kazakhstan', 'kazakhstan'),('Kenya', 'kenya'),('Kiribati', 'kiribati'),('Korea', 'korea'),('Korea, Republic of', 'korea_republic_of'),('Kuwait', 'kuwait'),('Kyrgyzstan', 'kyrgyzstan'),('Latvia', 'latvia'),('Lebanon', 'lebanon'),('Lesotho', 'lesotho'),('Liberia', 'liberia'),('Libyan Arab Jamahiriya', 'libyan_arab_jamahiriya'),('Liechtenstein', 'liechtenstein'),('Lithuania', 'lithuania'),('Luxembourg', 'luxembourg'),('Macao', 'macao'),('Macedonia', 'macedonia'),('Madagascar', 'madagascar'),('Malawi', 'malawi'),('Malaysia', 'malaysia'),('Maldives', 'maldives'),('Mali', 'mali'),('Malta', 'malta'),('Marshall Islands', 'marshall_islands'),('Martinique', 'martinique'),('Mauritania', 'mauritania'),('Mauritius', 'mauritius'),('Mayotte', 'mayotte'),('Mexico', 'mexico'),('Micronesia', 'micronesia'),('Moldova', 'moldova'),('Monaco', 'monaco'),('Mongolia', 'mongolia'),('Montserrat', 'montserrat'),('Morocco', 'morocco'),('Mozambique', 'mozambique'),('Myanmar', 'myanmar'),('Namibia', 'namibia'),('Nauru', 'nauru'),('Nepal', 'nepal'),('Netherlands', 'netherlands'),('Netherlands Antilles', 'netherlands_antilles'),('New Caledonia', 'new_caledonia'),('New Zealand', 'new_zealand'),('Nicaragua', 'nicaragua'),('Niger', 'niger'),('Nigeria', 'nigeria'),('Niue', 'niue'),('Norfolk Island', 'norfolk_island'),('Northern Mariana Islands', 'northern_mariana_islands'),('Norway', 'norway'),('Oman', 'oman'),('Pakistan', 'pakistan'),('Palau', 'palau'),('Palestinian Territory, Occupied', 'palestinian_territory_occupied'),('Panama', 'panama'),('Papua New Guinea', 'papua_new_guinea'),('Paraguay', 'paraguay'),('Peru', 'peru'),('Philippines', 'philippines'),('Pitcairn', 'pitcairn'),('Poland', 'poland'),('Portugal', 'portugal'),('Puerto Rico', 'puerto_rico'),('Qatar', 'qatar'),('Reunion', 'reunion'),('Romania', 'romania'),('Russian Federation', 'russian_federation'),('Rwanda', 'rwanda'),('Saint Helena', 'saint_helena'),('Saint Kitts and Nevis', 'saint_kitts_and_nevis'),('Saint Lucia', 'saint_lucia'),('Saint Pierre and Miquelon', 'saint_pierre_and_miquelon'),('Saint Vincent and The Grenadines', 'saint_vincent_and_the_grenadines'),('Samoa', 'samoa'),('San Marino', 'san_marino'),('Sao Tome and Principe', 'sao_tome_and_principe'),('Saudi Arabia', 'saudi_arabia'),('Senegal', 'senegal'),('Serbia and Montenegro', 'serbia_and_montenegro'),('Seychelles', 'seychelles'),('Sierra Leone', 'sierra_leone'),('Singapore', 'singapore'),('Slovakia', 'slovakia'),('Slovenia', 'slovenia'),('Solomon Islands', 'solomon_islands'),('Somalia', 'somalia'),('South Africa', 'south_africa'),('South Georgia and The South Sandwich Islands', 'south_georgia_and_the_south_sandwich_islands'),('Spain', 'spain'),('Sri Lanka', 'sri_lanka'),('Sudan', 'sudan'),('Suriname', 'suriname'),('Svalbard and Jan Mayen', 'svalbard_and_jan_mayen'),('Swaziland', 'swaziland'),('Sweden', 'sweden'),('Switzerland', 'switzerland'),('Syrian Arab Republic', 'syrian_arab_republic'),('Taiwan, Province of China', 'taiwan_province_of_china'),('Tajikistan', 'tajikistan'),('Tanzania, United Republic of', 'tanzania_united_republic_of'),('Thailand', 'thailand'),('Timor-leste', 'timor_leste'),('Togo', 'togo'),('Tokelau', 'tokelau'),('Tonga', 'tonga'),('Trinidad and Tobago', 'trinidad_and_tobago'),('Tunisia', 'tunisia'),('Turkey', 'turkey'),('Turkmenistan', 'turkmenistan'),('Turks and Caicos Islands', 'turks_and_caicos_islands'),('Tuvalu', 'tuvalu'),('Uganda', 'uganda'),('Ukraine', 'ukraine'),('United Arab Emirates', 'united_arab_emirates'),('United Kingdom', 'united_kingdom'),('United States', 'united_states'),('United States Minor Outlying Islands', 'united_states_minor_outlying_islands'),('Uruguay', 'uruguay'),('Uzbekistan', 'uzbekistan'),('Vanuatu', 'vanuatu'),('Venezuela', 'venezuela'),('Viet Nam', 'viet_nam'),('Virgin Islands, British', 'virgin_islands_british'),('Virgin Islands, U.S.', 'virgin_islands_us'),('Wallis and Futuna', 'wallis_and_futuna'),('Western Sahara', 'western_sahara'),('Yemen', 'yemen'),('Zambia', 'zambia'),('Zimbabwe', 'zimbabwe')

	/**
	 * Returns an array of countries
	 */
	function Country_get_countries($country_slugs = array())
	{
		global $g_table_prefix;

		$where_clause = "";
		if (!empty($country_slugs))
		{
			$where_clause = "WHERE has_full_data_set = 'yes'";
			$slug_clauses = array();
			foreach ($country_slugs as $slug)
				$slug_clauses[] = "country_slug = '$slug'";

			$slug_clause = "(" . implode(" OR ", $slug_clauses) . ")";
			$where_clause .= "AND $slug_clause";
		}

		$query = mysql_query("
			SELECT *
			FROM   {$g_table_prefix}countries
			$where_clause
				");

		$countries = array();
		while ($country_info = mysql_fetch_assoc($query))
		{
			$countries[] = array(
				"country" => $country_info['country'],
				"id"      => $country_info['id'],
				"slug"    => $country_info["country_slug"]
			);
		}

		return $countries;
	}


	function Country_get_regions($country_id)
	{
		global $g_table_prefix;

		$query = mysql_query("SELECT * FROM {$g_table_prefix}regions WHERE country_id = $country_id");
		$region_info = array();
		while ($row = mysql_fetch_assoc($query))
		{
			$region_info[] = $row;
		}

		return $region_info;
	}
}
