<?php

/**
 * @package Countries
 */

class Country_Russia extends CountryPlugin {
	protected $countryName = "Russia";
	protected $countrySlug = "russia";
	protected $regionNames = "Russian regions";

	// technically it's "eurasia" but that's not considered a continent, so I've read generally it's placed into Europe
	protected $continent = "europe";

	protected $extendedData = array(
		"zipFormat" => array(
			"format" => "Xxxx",
			"replacements" => array(
				"X" => "123456789",
				"x" => "0123456789"
			)
		),
 		"phoneFormat" => array(
			"displayFormats" => array(
				"Xxxx-xxxx",
				"(0x) xxxx xxxx",
				"04xx xxx xxx"
			)
		)
	);

	protected $countryData = array(
		array(
			"regionName" => "North Caucasian",
			"regionShort" => "NC",
			"regionSlug" => "north_caucasian",
			"weight" => 1,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Volga",
			"regionShort" => "VO",
			"regionSlug" => "volga",
			"weight" => 1,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Central",
			"regionShort" => "CE",
			"regionSlug" => "central",
			"weight" => 1,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Siberian",
			"regionShort" => "SI",
			"regionSlug" => "siberian",
			"weight" => 1,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Northwestern",
			"regionShort" => "NW",
			"regionSlug" => "northwestern",
			"weight" => 1,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Southern",
			"regionShort" => "SO",
			"regionSlug" => "southern",
			"weight" => 1,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Ural",
			"regionShort" => "CE",
			"regionSlug" => "ural",
			"weight" => 1,
			"cities" => array(
				"Canberra"
			)
		)
	);


	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
