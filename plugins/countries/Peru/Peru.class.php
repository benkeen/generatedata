<?php

/**
 * @package Countries
 */

class Country_Peru extends CountryPlugin
{
	protected $continent = "south_america";
	protected $countryName = "Peru";
	protected $countrySlug = "peru";
	protected $regionNames = "Peruvian regions";

//	protected $extendedData = array(
//		"zipFormat" => array(
//			"format" => "%*@ *@*",
//			"replacements" => array(
//				"%" => "ABCEGHJKLMNPRSTVXY",
//				"*" => "0123456789",
//				"@" => "ABCEGHJKLMNPRSTVWXYZ",
//
//				// used in individual provinces below
//				"&" => "GHJ",
//				"^" => "KLMNP"
//			)
//		),
//
//		// the general phone format and area codes for the country
//		"phoneFormat" => array(
//			"areaCodes" => array(587, 603, 780, 205, 604, 778, 204, 431, 506, 709, 902, 867, 416, 647, 437, 519, 226, 613,
//				343, 705, 249, 807, 905, 289, 365, 902, 418, 581, 450, 579, 514, 438, 819, 873, 306),
//			"displayFormats" => array(
//				"(AAA) Xxx-xxxx",
//				"1 (AAA) Xxx-xxxx",
//				"1-AAA-Xxx-xxxx"
//			)
//		)
//	);

	// our country-wide data, with info separated into regions
	protected $countryData = array(
		array(
			"regionName" => "Piura",
			"regionShort" => "PIU",
			"regionSlug" => "piura",
			"weight" => 16,
			"cities" => array(
				"Piura", "Sullana", "Paita", "Catacaos", "Talara", "Chulucanas", "Sechura"
			)
		),
		array(
			"regionName" => "La Libertad",
			"regionShort" => "LAL",
			"regionSlug" => "lalibertad",
			"weight" => 15,
			"cities" => array(
				"Trujillo", "Chepén", "Pacasmayo", "Guadalupe",
			)
		),
		array(
			"regionName" => "Cajamarca",
			"regionShort" => "CAJ",
			"regionSlug" => "cajamarca",
			"weight" => 14,
			"cities" => array(
				"Cajamarca", "Jaén"
			)
		),
		array(
			"regionName" => "Puno",
			"regionShort" => "PUN",
			"regionSlug" => "puno",
			"weight" => 12,
			"cities" => array(
				"Juliaca", "Puno"
			)
		),
		array(
			"regionName" => "Cusco",
			"regionShort" => "CUS",
			"regionSlug" => "cusco",
			"weight" => 12,
			"cities" => array(
				"Cusco", "Sicuani"
			)
		),
		array(
			"regionName" => "Arequipa",
			"regionShort" => "ARE",
			"regionSlug" => "arequipa",
			"weight" => 11,
			"cities" => array(
				"Arequipa"
			)
		),
		array(
			"regionName" => "Junín",
			"regionShort" => "JUN",
			"regionSlug" => "junín",
			"weight" => 11,
			"cities" => array(
				"Huancayo", "Tarma"
			)
		),
		array(
			"regionName" => "Lambayeque",
			"regionShort" => "LAM",
			"regionSlug" => "lambayeque",
			"weight" => 11,
			"cities" => array(
				"Chiclayo", "Lambayeque"
			)
		),
		array(
			"regionName" => "Ancash",
			"regionShort" => "ANC",
			"regionSlug" => "ancash",
			"weight" => 10,
			"cities" => array(
				"Chimbote", "Huaraz"
			)
		),
		array(
			"regionName" => "Loreto",
			"regionShort" => "LOR",
			"regionSlug" => "loreto",
			"weight" => 9,
			"cities" => array(
				"Iquitos", "Yurimaguas"
			)
		),
		array(
			"regionName" => "Lima",
			"regionShort" => "LIM",
			"regionSlug" => "Lima",
			"weight" => 9,
			"cities" => array(
				"Lima", "Huacho", "Huaral", "San Vicente de Cañete", "Barranca", "Chancay", "Mala"
			)
		)
	);


	public function install()
	{
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
