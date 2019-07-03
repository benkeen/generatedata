<?php

/**
 * @package Countries
 */

class Country_Mexico extends CountryPlugin {
	protected $countryName = "Mexico";
	protected $countrySlug = "mexico";
	protected $regionNames = "Mexican States";
	protected $continent   = "north_america";

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
			"regionName" => "Aguascalientes",
			"regionShort" => "Ags.",
			"regionSlug" => "aguascalientes",
			"weight" => 12,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Baja California",
			"regionShort" => "B.C.",
			"regionSlug" => "baja_california",
			"weight" => 31,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Chiapas",
			"regionShort" => "Chis.",
			"regionSlug" => "chiapas",
			"weight" => 48,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Chihuahua",
			"regionShort" => "Chih.",
			"regionSlug" => "chihuahua",
			"weight" => 34,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Coahuila",
			"regionShort" => "Coah.",
			"regionSlug" => "coahuila",
			"weight" => 27,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Mexico City",
			"regionShort" => "CDMX",
			"regionSlug" => "mexico_city",
			"weight" => 89,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Durango",
			"regionShort" => "Dgo.",
			"regionSlug" => "durango",
			"weight" => 16,
			"cities" => array(

			)
		),
	);


	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
