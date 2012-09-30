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

/*

	'Afghanistan'
	(2, 'Albania', NULL, NULL, 'no', '', NULL),
	(3, 'Algeria', NULL, NULL, 'no', '', NULL),
	(4, 'American Samoa', NULL, NULL, 'no', '', NULL),
	(5, 'Andorra', NULL, NULL, 'no', '', NULL),
	(6, 'Angola', NULL, NULL, 'no', '', NULL),
	(7, 'Anguilla', NULL, NULL, 'no', '', NULL),
	(8, 'Antarctica', NULL, NULL, 'no', '', NULL),
	(9, 'Antigua and Barbuda', NULL, NULL, 'no', '', NULL),
	(10, 'Argentina', NULL, NULL, 'no', '', NULL),
	(11, 'Armenia', NULL, NULL, 'no', '', NULL),
	(12, 'Aruba', NULL, NULL, 'no', '', NULL),
	(13, 'Australia', 'australia', 'country_australia', 'yes', 'Australian St./Terr.', 'Xxxx'),
	(14, 'Austria', NULL, NULL, 'no', '', NULL),
	(15, 'Azerbaijan', NULL, NULL, 'no', '', NULL),
	(16, 'Bahamas', NULL, NULL, 'no', '', NULL),
	(17, 'Bahrain', NULL, NULL, 'no', '', NULL),
	(18, 'Bangladesh', NULL, NULL, 'no', '', NULL),
	(19, 'Barbados', NULL, NULL, 'no', '', NULL),
	(20, 'Belarus', NULL, NULL, 'no', '', NULL),
	(21, 'Belgium', 'belgium', 'country_belgium', 'yes', 'Belgium Prov.', 'Xxxx'),
	(22, 'Belize', NULL, NULL, 'no', '', NULL),
	(23, 'Benin', NULL, NULL, 'no', '', NULL),
	(24, 'Bermuda', NULL, NULL, 'no', '', NULL),
	(25, 'Bhutan', NULL, NULL, 'no', '', NULL),
	(26, 'Bolivia', NULL, NULL, 'no', '', NULL),
	(27, 'Bosnia and Herzegovina', NULL, NULL, 'no', '', NULL),
	(28, 'Botswana', NULL, NULL, 'no', '', NULL),
	(29, 'Bouvet Island', NULL, NULL, 'no', '', NULL),
	(30, 'Brazil', NULL, NULL, 'no', '', NULL),
	(31, 'British Indian Ocean Territory', NULL, NULL, 'no', '', NULL),
	(32, 'Brunei Darussalam', NULL, NULL, 'no', '', NULL),
	(33, 'Bulgaria', NULL, NULL, 'no', '', NULL),
	(34, 'Burkina Faso', NULL, NULL, 'no', '', NULL),
	(35, 'Burundi', NULL, NULL, 'no', '', NULL),
	(36, 'Cambodia', NULL, NULL, 'no', '', NULL),
	(37, 'Cameroon', NULL, NULL, 'no', '', NULL),
	(38, 'Canada', 'canada', 'country_canada', 'yes', 'Canadian Prov.', 'LXL XLx'),
	(39, 'Cape Verde', NULL, NULL, 'no', '', NULL),
	(40, 'Cayman Islands', NULL, NULL, 'no', '', NULL),
	(41, 'Central African Republic', NULL, NULL, 'no', '', NULL),
	(42, 'Chad', NULL, NULL, 'no', '', NULL),
	(43, 'Chile', NULL, NULL, 'no', '', NULL),
	(44, 'China', NULL, NULL, 'no', '', NULL),
	(45, 'Christmas Island', NULL, NULL, 'no', '', NULL),
	(46, 'Cocos (Keeling) Islands', NULL, NULL, 'no', '', NULL),
	(47, 'Colombia', NULL, NULL, 'no', '', NULL),
	(48, 'Comoros', NULL, NULL, 'no', '', NULL),
	(49, 'Congo', NULL, NULL, 'no', '', NULL),
	(50, 'Cook Islands', NULL, NULL, 'no', '', NULL),
	(51, 'Costa Rica', NULL, NULL, 'no', '', NULL),
	(52, 'Croatia', NULL, NULL, 'no', '', NULL),
	(53, 'Cuba', NULL, NULL, 'no', '', NULL),
	(54, 'Cyprus', NULL, NULL, 'no', '', NULL),
	(55, 'Czech Republic', NULL, NULL, 'no', '', NULL),
	(56, 'Denmark', NULL, NULL, 'no', '', NULL),
	(57, 'Djibouti', NULL, NULL, 'no', '', NULL),
	(58, 'Dominica', NULL, NULL, 'no', '', NULL),
	(59, 'Dominican Republic', NULL, NULL, 'no', '', NULL),
	(60, 'Ecuador', NULL, NULL, 'no', '', NULL),
	(61, 'Egypt', NULL, NULL, 'no', '', NULL),
	(62, 'El Salvador', NULL, NULL, 'no', '', NULL),
	(63, 'Equatorial Guinea', NULL, NULL, 'no', '', NULL),
	(64, 'Eritrea', NULL, NULL, 'no', '', NULL),
	(65, 'Estonia', NULL, NULL, 'no', '', NULL),
	(66, 'Ethiopia', NULL, NULL, 'no', '', NULL),
	(67, 'Falkland Islands (Malvinas)', NULL, NULL, 'no', '', NULL),
	(68, 'Faroe Islands', NULL, NULL, 'no', '', NULL),
	(69, 'Fiji', NULL, NULL, 'no', '', NULL),
	(70, 'Finland', NULL, NULL, 'no', '', NULL),
	(71, 'France', NULL, NULL, 'no', '', NULL),
	(72, 'French Guiana', NULL, NULL, 'no', '', NULL),
	(73, 'French Polynesia', NULL, NULL, 'no', '', NULL),
	(74, 'French Southern Territories', NULL, NULL, 'no', '', NULL),
	(75, 'Gabon', NULL, NULL, 'no', '', NULL),
	(76, 'Gambia', NULL, NULL, 'no', '', NULL),
	(77, 'Georgia', NULL, NULL, 'no', '', NULL),
	(78, 'Germany', NULL, NULL, 'no', '', NULL),
	(79, 'Ghana', NULL, NULL, 'no', '', NULL),
	(80, 'Gibraltar', NULL, NULL, 'no', '', NULL),
	(81, 'Greece', NULL, NULL, 'no', '', NULL),
	(82, 'Greenland', NULL, NULL, 'no', '', NULL),
	(83, 'Grenada', NULL, NULL, 'no', '', NULL),
	(84, 'Guadeloupe', NULL, NULL, 'no', '', NULL),
	(85, 'Guam', NULL, NULL, 'no', '', NULL),
	(86, 'Guatemala', NULL, NULL, 'no', '', NULL),
	(87, 'Guinea', NULL, NULL, 'no', '', NULL),
	(88, 'Guinea-bissau', NULL, NULL, 'no', '', NULL),
	(89, 'Guyana', NULL, NULL, 'no', '', NULL),
	(90, 'Haiti', NULL, NULL, 'no', '', NULL),
	(91, 'Heard Island and Mcdonald Islands', NULL, NULL, 'no', '', NULL),
	(92, 'Holy See (Vatican City State)', NULL, NULL, 'no', '', NULL),
	(93, 'Honduras', NULL, NULL, 'no', '', NULL),
	(94, 'Hong Kong', NULL, NULL, 'no', '', NULL),
	(95, 'Hungary', NULL, NULL, 'no', '', NULL),
	(96, 'Iceland', NULL, NULL, 'no', '', NULL),
	(97, 'India', NULL, NULL, 'no', '', NULL),
	(98, 'Indonesia', NULL, NULL, 'no', '', NULL),
	(99, 'Iran, Islamic Republic of', NULL, NULL, 'no', '', NULL),
	(100, 'Iraq', NULL, NULL, 'no', '', NULL),
	(101, 'Ireland', NULL, NULL, 'no', '', NULL),
	(102, 'Israel', NULL, NULL, 'no', '', NULL),
	(103, 'Italy', NULL, NULL, 'no', '', NULL),
	(104, 'Jamaica', NULL, NULL, 'no', '', NULL),
	(105, 'Japan', NULL, NULL, 'no', '', NULL),
	(106, 'Jordan', NULL, NULL, 'no', '', NULL),
	(107, 'Kazakhstan', NULL, NULL, 'no', '', NULL),
	(108, 'Kenya', NULL, NULL, 'no', '', NULL),
	(109, 'Kiribati', NULL, NULL, 'no', '', NULL),
	(110, 'Korea', NULL, NULL, 'no', '', NULL),
	(111, 'Korea, Republic of', NULL, NULL, 'no', '', NULL),
	(112, 'Kuwait', NULL, NULL, 'no', '', NULL),
	(113, 'Kyrgyzstan', NULL, NULL, 'no', '', NULL),
	(114, 'Latvia', NULL, NULL, 'no', '', NULL),
	(115, 'Lebanon', NULL, NULL, 'no', '', NULL),
	(116, 'Lesotho', NULL, NULL, 'no', '', NULL),
	(117, 'Liberia', NULL, NULL, 'no', '', NULL),
	(118, 'Libyan Arab Jamahiriya', NULL, NULL, 'no', '', NULL),
	(119, 'Liechtenstein', NULL, NULL, 'no', '', NULL),
	(120, 'Lithuania', NULL, NULL, 'no', '', NULL),
	(121, 'Luxembourg', NULL, NULL, 'no', '', NULL),
	(122, 'Macao', NULL, NULL, 'no', '', NULL),
	(123, 'Macedonia', NULL, NULL, 'no', '', NULL),
	(124, 'Madagascar', NULL, NULL, 'no', '', NULL),
	(125, 'Malawi', NULL, NULL, 'no', '', NULL),
	(126, 'Malaysia', NULL, NULL, 'no', '', NULL),
	(127, 'Maldives', NULL, NULL, 'no', '', NULL),
	(128, 'Mali', NULL, NULL, 'no', '', NULL),
	(129, 'Malta', NULL, NULL, 'no', '', NULL),
	(130, 'Marshall Islands', NULL, NULL, 'no', '', NULL),
	(131, 'Martinique', NULL, NULL, 'no', '', NULL),
	(132, 'Mauritania', NULL, NULL, 'no', '', NULL),
	(133, 'Mauritius', NULL, NULL, 'no', '', NULL),
	(134, 'Mayotte', NULL, NULL, 'no', '', NULL),
	(135, 'Mexico', NULL, NULL, 'no', '', NULL),
	(136, 'Micronesia', NULL, NULL, 'no', '', NULL),
	(137, 'Moldova', NULL, NULL, 'no', '', NULL),
	(138, 'Monaco', NULL, NULL, 'no', '', NULL),
	(139, 'Mongolia', NULL, NULL, 'no', '', NULL),
	(140, 'Montserrat', NULL, NULL, 'no', '', NULL),
	(141, 'Morocco', NULL, NULL, 'no', '', NULL),
	(142, 'Mozambique', NULL, NULL, 'no', '', NULL),
	(143, 'Myanmar', NULL, NULL, 'no', '', NULL),
	(144, 'Namibia', NULL, NULL, 'no', '', NULL),
	(145, 'Nauru', NULL, NULL, 'no', '', NULL),
	(146, 'Nepal', NULL, NULL, 'no', '', NULL),
	(147, 'Netherlands', 'netherlands', 'country_netherlands', 'yes', 'Netherlands Prov.', 'xxxxLL'),
	(148, 'Netherlands Antilles', NULL, NULL, 'no', '', NULL),
	(149, 'New Caledonia', NULL, NULL, 'no', '', NULL),
	(150, 'New Zealand', NULL, NULL, 'no', '', NULL),
	(151, 'Nicaragua', NULL, NULL, 'no', '', NULL),
	(152, 'Niger', NULL, NULL, 'no', '', NULL),
	(153, 'Nigeria', NULL, NULL, 'no', '', NULL),
	(154, 'Niue', NULL, NULL, 'no', '', NULL),
	(155, 'Norfolk Island', NULL, NULL, 'no', '', NULL),
	(156, 'Northern Mariana Islands', NULL, NULL, 'no', '', NULL),
	(157, 'Norway', NULL, NULL, 'no', '', NULL),
	(158, 'Oman', NULL, NULL, 'no', '', NULL),
	(159, 'Pakistan', NULL, NULL, 'no', '', NULL),
	(160, 'Palau', NULL, NULL, 'no', '', NULL),
	(161, 'Palestinian Territory, Occupied', NULL, NULL, 'no', '', NULL),
	(162, 'Panama', NULL, NULL, 'no', '', NULL),
	(163, 'Papua New Guinea', NULL, NULL, 'no', '', NULL),
	(164, 'Paraguay', NULL, NULL, 'no', '', NULL),
	(165, 'Peru', NULL, NULL, 'no', '', NULL),
	(166, 'Philippines', NULL, NULL, 'no', '', NULL),
	(167, 'Pitcairn', NULL, NULL, 'no', '', NULL),
	(168, 'Poland', NULL, NULL, 'no', '', NULL),
	(169, 'Portugal', NULL, NULL, 'no', '', NULL),
	(170, 'Puerto Rico', NULL, NULL, 'no', '', NULL),
	(171, 'Qatar', NULL, NULL, 'no', '', NULL),
	(172, 'Reunion', NULL, NULL, 'no', '', NULL),
	(173, 'Romania', NULL, NULL, 'no', '', NULL),
	(174, 'Russian Federation', NULL, NULL, 'no', '', NULL),
	(175, 'Rwanda', NULL, NULL, 'no', '', NULL),
	(176, 'Saint Helena', NULL, NULL, 'no', '', NULL),
	(177, 'Saint Kitts and Nevis', NULL, NULL, 'no', '', NULL),
	(178, 'Saint Lucia', NULL, NULL, 'no', '', NULL),
	(179, 'Saint Pierre and Miquelon', NULL, NULL, 'no', '', NULL),
	(180, 'Saint Vincent and The Grenadines', NULL, NULL, 'no', '', NULL),
	(181, 'Samoa', NULL, NULL, 'no', '', NULL),
	(182, 'San Marino', NULL, NULL, 'no', '', NULL),
	(183, 'Sao Tome and Principe', NULL, NULL, 'no', '', NULL),
	(184, 'Saudi Arabia', NULL, NULL, 'no', '', NULL),
	(185, 'Senegal', NULL, NULL, 'no', '', NULL),
	(186, 'Serbia and Montenegro', NULL, NULL, 'no', '', NULL),
	(187, 'Seychelles', NULL, NULL, 'no', '', NULL),
	(188, 'Sierra Leone', NULL, NULL, 'no', '', NULL),
	(189, 'Singapore', NULL, NULL, 'no', '', NULL),
	(190, 'Slovakia', NULL, NULL, 'no', '', NULL),
	(191, 'Slovenia', NULL, NULL, 'no', '', NULL),
	(192, 'Solomon Islands', NULL, NULL, 'no', '', NULL),
	(193, 'Somalia', NULL, NULL, 'no', '', NULL),
	(194, 'South Africa', NULL, NULL, 'no', '', NULL),
	(195, 'South Georgia and The South Sandwich Islands', NULL, NULL, 'no', '', NULL),
	(196, 'Spain', NULL, NULL, 'no', '', NULL),
	(197, 'Sri Lanka', NULL, NULL, 'no', '', NULL),
	(198, 'Sudan', NULL, NULL, 'no', '', NULL),
	(199, 'Suriname', NULL, NULL, 'no', '', NULL),
	(200, 'Svalbard and Jan Mayen', NULL, NULL, 'no', '', NULL),
	(201, 'Swaziland', NULL, NULL, 'no', '', NULL),
	(202, 'Sweden', NULL, NULL, 'no', '', NULL),
	(203, 'Switzerland', NULL, NULL, 'no', '', NULL),
	(204, 'Syrian Arab Republic', NULL, NULL, 'no', '', NULL),
	(205, 'Taiwan, Province of China', NULL, NULL, 'no', '', NULL),
	(206, 'Tajikistan', NULL, NULL, 'no', '', NULL),
	(207, 'Tanzania, United Republic of', NULL, NULL, 'no', '', NULL),
	(208, 'Thailand', NULL, NULL, 'no', '', NULL),
	(209, 'Timor-leste', NULL, NULL, 'no', '', NULL),
	(210, 'Togo', NULL, NULL, 'no', '', NULL),
	(211, 'Tokelau', NULL, NULL, 'no', '', NULL),
	(212, 'Tonga', NULL, NULL, 'no', '', NULL),
	(213, 'Trinidad and Tobago', NULL, NULL, 'no', '', NULL),
	(214, 'Tunisia', NULL, NULL, 'no', '', NULL),
	(215, 'Turkey', NULL, NULL, 'no', '', NULL),
	(216, 'Turkmenistan', NULL, NULL, 'no', '', NULL),
	(217, 'Turks and Caicos Islands', NULL, NULL, 'no', '', NULL),
	(218, 'Tuvalu', NULL, NULL, 'no', '', NULL),
	(219, 'Uganda', NULL, NULL, 'no', '', NULL),
	(220, 'Ukraine', NULL, NULL, 'no', '', NULL),
	(221, 'United Arab Emirates', NULL, NULL, 'no', '', NULL),
	(222, 'United Kingdom', 'uk', 'country_uk', 'yes', 'UK Counties', 'Lx xLL|Lxx xLL|LxL xLL|LLx xLL|LLxx xLL|LLxL xLL'),
	(223, 'United States', 'us', 'country_us', 'yes', 'US States', 'xxxxx'),
	(224, 'United States Minor Outlying Islands', NULL, NULL, 'no', '', NULL),
	(225, 'Uruguay', NULL, NULL, 'no', '', NULL),
	(226, 'Uzbekistan', NULL, NULL, 'no', '', NULL),
	(227, 'Vanuatu', NULL, NULL, 'no', '', NULL),
	(228, 'Venezuela', NULL, NULL, 'no', '', NULL),
	(229, 'Viet Nam', NULL, NULL, 'no', '', NULL),
	(230, 'Virgin Islands, British', NULL, NULL, 'no', '', NULL),
	(231, 'Virgin Islands, U.S.', NULL, NULL, 'no', '', NULL),
	(232, 'Wallis and Futuna', NULL, NULL, 'no', '', NULL),
	(233, 'Western Sahara', NULL, NULL, 'no', '', NULL),
	(234, 'Yemen', NULL, NULL, 'no', '', NULL),
	(235, 'Zambia', NULL, NULL, 'no', '', NULL),
	(236, 'Zimbabwe', NULL, NULL, 'no', '', NULL)
";

 */