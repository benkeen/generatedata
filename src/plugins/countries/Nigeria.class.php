<?php

/**
 * @package Countries
 */

class Country_Nigeria extends CountryPlugin {
	protected $countryName = "Nigeria";
	protected $countrySlug = "nigeria";
	protected $regionNames = "Nigerian States";
	protected $continent = "africa";

	protected $extendedData = array(
		"zipFormat" => "Xxxxxx",
		"phoneFormat" => "xxx xxxx"
	);


	protected $countryData = array(
		array(
			"regionName" => "Kano",
			"regionShort" => "KN",
			"regionSlug" => "kano",
			"weight" => 94,
			"cities" => array(
				"Kano"
			)
		),

		array(
			"regionName" => "Lagos",
			"regionShort" => "LA",
			"regionSlug" => "lagos",
			"weight" => 91,
			"cities" => array(
				"Lagos"
			)
		),

		array(
			"regionName" => "Kaduna",
			"regionShort" => "KD",
			"regionSlug" => "kaduna",
			"weight" => 61,
			"cities" => array(
				"Kaduna", "Zaria"
			)
		),

		array(
			"regionName" => "Katsina",
			"regionShort" => "KT",
			"regionSlug" => "katsina",
			"weight" => 58,
			"cities" => array(
				"Katsina", "Funtua"
			)
		),

		array(
			"regionName" => "Oyo",
			"regionShort" => "OY",
			"regionSlug" => "oyo",
			"weight" => 56,
			"cities" => array(
				"Ibadan", "Ogbomosho", "Oyo", "Iseyin", "Shaki", "Kisi", "Igboho"
			)
		),

		array(
			"regionName" => "Rivers",
			"regionShort" => "RI",
			"regionSlug" => "rivers",
			"weight" => 52,
			"cities" => array(
				"Port Harcourt", "Buguma"
			)
		),

		array(
			"regionName" => "Bauchi",
			"regionShort" => "BA",
			"regionSlug" => "bauchi",
			"weight" => 46,
			"cities" => array(
				"Bauchi"
			)
		),

		array(
			"regionName" => "Jigawa",
			"regionShort" => "JI",
			"regionSlug" => "jigawa",
			"weight" => 43,
			"cities" => array(
				"Dutse"
			)
		),

		array(
			"regionName" => "Benue",
			"regionShort" => "BE",
			"regionSlug" => "benue",
			"weight" => 42,
			"cities" => array(
				"Makurdi", "Gboko", "Otukpo"
			)
		),

		array(
			"regionName" => "Anambra",
			"regionShort" => "AN",
			"regionSlug" => "anambra",
			"weight" => 42,
			"cities" => array(
				"Onitsha", "Okpoko", "Awka"
			)
		),

		array(
			"regionName" => "Borno",
			"regionShort" => "BO",
			"regionSlug" => "borno",
			"weight" => 42,
			"cities" => array(
				"Maiduguri", "Bama"
			)
		),

		array(
			"regionName" => "Delta",
			"regionShort" => "DE",
			"regionSlug" => "delta",
			"weight" => 41,
			"cities" => array(
				"Warri", "Sapele"
			)
		),

		array(
			"regionName" => "Niger",
			"regionShort" => "NI",
			"regionSlug" => "niger",
			"weight" => 40,
			"cities" => array(
				"Minna", "Bida"
			)
		),

		array(
			"regionName" => "Imo",
			"regionShort" => "IM",
			"regionSlug" => "imo",
			"weight" => 39,
			"cities" => array(
				"Owerri", "Okigwe"
			)
		),

		array(
			"regionName" => "Akwa Ibom",
			"regionShort" => "AK",
			"regionSlug" => "akwaibom",
			"weight" => 39,
			"cities" => array(
				"Uyo", "Ikot Ekpene"
			)
		),

		array(
			"regionName" => "Ogun",
			"regionShort" => "OG",
			"regionSlug" => "ogun",
			"weight" => 38,
			"cities" => array(
				"Abeokuta", "Sagamu", "Ijebu Ode"
			)
		),

		array(
			"regionName" => "Sokoto",
			"regionShort" => "SO",
			"regionSlug" => "sokoto",
			"weight" => 37,
			"cities" => array(
				"Sokoto"
			)
		),

		array(
			"regionName" => "Osun",
			"regionShort" => "OS",
			"regionSlug" => "osun",
			"weight" => 34,
			"cities" => array(
				"Osogbo", "Ife", "Ilesa", "Ila", "Gbongan", "Modakeke"
			)
		),

		array(
			"regionName" => "Kogi",
			"regionShort" => "KO",
			"regionSlug" => "kogi",
			"weight" => 33,
			"cities" => array(
				"Okene"
			)
		)
	);

	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}