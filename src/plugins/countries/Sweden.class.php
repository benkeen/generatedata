<?php

/**
 * @package Countries
 */

class Country_Sweden extends CountryPlugin {
	protected $countryName = "Sweden";
	protected $countrySlug = "sweden";
	protected $regionNames = "Svenska län";
	protected $continent = "europe";

	protected $extendedData = array(
		"zipFormat" => "xxxxx"
	);

	protected $countryData = array(
		array(
			"regionName" => "Gävleborgs län",
			"regionShort" => "X",
			"regionSlug" => "gavleborg",
			"weight" => 1,
			"cities" => array(
				"Gävle", "Sandviken", "Hudiksvall", "Bollnäs", "Söderhamn", "Hofors", "Ockelbo"
			)
		),
		array(
			"regionName" => "Dalarnas län",
			"regionShort" => "W",
			"regionSlug" => "dalarna",
			"weight" => 1,
			"cities" => array(
				"Borlänge", "Falun", "Avesta", "Ludvika", "Mora"
			)
		),
		array(
			"regionName" => "Stockholms län",
			"regionShort" => "AB",
			"regionSlug" => "stockholms_lan",
			"weight" => 5,
			"cities" => array(
				"Stockholm", "Södertälje", "Täby", "Tumba", "Upplands Väsby", "Lidingo", "Vallentuna", "Åkersberga",
				"Märsta", "Boo"
			)
		),
		array(
			"regionName" => "Västra Götalands län",
			"regionShort" => "O",
			"regionSlug" => "vastra_gotaland",
			"weight" => 4,
			"cities" => array(
				"Göteborg", "Borås", "Trollhättan", "Skövde", "Uddevalla", "Lidköping", "Alingsås", "Kungälv",
				"Vänersborg", "Lerum"
			)
		),
		array(
			"regionName" => "Östergötlands län",
			"regionShort" => "E",
			"regionSlug" => "ostergotland",
			"weight" => 2,
			"cities" => array(
				"Linköping", "Norrköping", "Motala", "Finspång", "Mjölby"
			)
		),
		array(
			"regionName" => "Jönköpings län",
			"regionShort" => "F",
			"regionSlug" => "jonkoping",
			"weight" => 2,
			"cities" => array(
				"Jönköping", "Värnamo", "Nässjö", "Tranås", "Vetlanda"
			)
		)
	);

	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}