<?php

/**
 * @package Countries
 */

class Country_Poland extends CountryPlugin {
	protected $countryName = "Poland";
	protected $countrySlug = "poland";
	protected $regionNames = "Polish States";
	protected $continent = "europe";

	protected $extendedData = array(
		"zipFormat" => "xx-xxx",
		"phoneFormat" => "Xx xxx xx xx"
	);

	protected $countryData = array(
		array(
			"regionName" => "Dolnośląskie",
			"regionShort" => "DS",
			"regionSlug" => "dolnoslaskie",
			"weight" => 291,
			"cities" => array(
				"Wrocław", "Wałbrzych", "Legnica", "Jelenia Góra"
			)
		),

		array(
			"regionName" => "Kujawsko-pomorskie",
			"regionShort" => "KP",
			"regionSlug" => "kujawskopomorskie",
			"weight" => 210,
			"cities" => array(
				"Bydgoszcz", "Toruń"
			)
		),

		array(
			"regionName" => "Lubelskie",
			"regionShort" => "LU",
			"regionSlug" => "lubelskie",
			"weight" => 217,
			"cities" => array(
				"Lublin", "Chełm", "Zamość", "Biała Podlaska"
			)
		),

		array(
			"regionName" => "Lubuskie",
			"regionShort" => "LB",
			"regionSlug" => "lubuskie",
			"weight" => 102,
			"cities" => array(
				"Gorzów Wielkopolski", "Zielona Góra"
			)
		),

		array(
			"regionName" => "łódzkie",
			"regionShort" => "LD",
			"regionSlug" => "lodzkie",
			"weight" => 252,
			"cities" => array(
				"Łódź", "Piotrków Trybunalski", "Pabianice", "Tomaszów Mazowiecki"
			)
		),

		array(
			"regionName" => "Małopolskie",
			"regionShort" => "MP",
			"regionSlug" => "malopolskie",
			"weight" => 335,
			"cities" => array(
				"Kraków", "Tarnów"
			)
		),

		array(
			"regionName" => "Mazowieckie",
			"regionShort" => "MA",
			"regionSlug" => "mazowieckie",
			"weight" => 530,
			"cities" => array(
				"Warszawa", "Radom", "Płock", "Siedlce"
			)
		),

		array(
			"regionName" => "Opolskie",
			"regionShort" => "OP",
			"regionSlug" => "opolskie",
			"weight" => 101,
			"cities" => array(
				"Opole", "Kędzierzyn-Koźle"
			)
		),

		array(
			"regionName" => "Podkarpackie",
			"regionShort" => "PK",
			"regionSlug" => "podkarpackie",
			"weight" => 213,
			"cities" => array(
				"Rzeszów", "Przemyśl", "Stalowa Wola", "Mielec"
			)
		),

		array(
			"regionName" => "Podlaskie",
			"regionShort" => "PD",
			"regionSlug" => "podlaskie",
			"weight" => 120,
			"cities" => array(
				"Białystok", "Suwałki", "Łomża"
			)
		),

		array(
			"regionName" => "Pomorskie",
			"regionShort" => "PM",
			"regionSlug" => "pomorskie",
			"weight" => 229,
			"cities" => array(
				"Gdańsk", "Gdynia", "Słupsk", "Tczew"
			)
		),

		array(
			"regionName" => "Sląskie",
			"regionShort" => "SL",
			"regionSlug" => "slaskie",
			"weight" => 462,
			"cities" => array(
				"Katowice", "Częstochowa", "Sosnowiec", "Gliwice"
			)
		),

		array(
			"regionName" => "Swiętokrzyskie",
			"regionShort" => "SK",
			"regionSlug" => "swietokrzyskie",
			"weight" => 127,
			"cities" => array(
				"Kielce", "Ostrowiec Świętokrzyski", "Starachowice"
			)
		),

		array(
			"regionName" => "Warmińsko-mazurskie",
			"regionShort" => "WM",
			"regionSlug" => "warminskomazurskie",
			"weight" => 145,
			"cities" => array(
				"Olsztyn", "Elbląg", "Ełk"
			)
		),

		array(
			"regionName" => "Wielkopolskie",
			"regionShort" => "WP",
			"regionSlug" => "wielkopolskie",
			"weight" => 342,
			"cities" => array(
				"Poznań", "Kalisz", "Konin", "Piła"
			)
		),

		array(
			"regionName" => "Zachodniopomorskie",
			"regionShort" => "ZP",
			"regionSlug" => "zachodniopomorskie",
			"weight" => 172,
			"cities" => array(
				"Szczecin", "Koszalin", "Stargard Szczeciński"
			)
		)
	);

	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}