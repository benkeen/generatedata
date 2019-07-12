<?php

/**
 * @package Countries
 *
 * Source data:
 * 		https://en.wikipedia.org/wiki/List_of_Colombian_Departments_by_population
 */

class Country_Colombia extends CountryPlugin {
	protected $countryName = "Colombia";
	protected $countrySlug = "colombia";
	protected $regionNames = "Australian St./Terr.";
	protected $continent = "south_america";

//	protected $extendedData = array(
//		"zipFormat" => array(
//			"format" => "Xxxx",
//			"replacements" => array(
//				"X" => "123456789",
//				"x" => "0123456789"
//			)
//		),
// 		"phoneFormat" => array(
//			"displayFormats" => array(
//				"Xxxx-xxxx",
//				"(0x) xxxx xxxx",
//				"04xx xxx xxx"
//			)
//		)
//	);

	protected $countryData = array(
		array(
			"regionName" => "Amazonas",
			"regionShort" => "AMA",
			"regionSlug" => "amazonas",
			"weight" => 5,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Antioquia",
			"regionShort" => "ANT",
			"regionSlug" => "antioquia",
			"weight" => 560,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Arauca",
			"regionShort" => "ARA",
			"regionSlug" => "arauca",
			"weight" => 15,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Atlántico",
			"regionShort" => "ATL",
			"regionSlug" => "atlantico",
			"weight" => 211,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Bolívar",
			"regionShort" => "BOL",
			"regionSlug" => "bolivar",
			"weight" => 210,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Boyacá",
			"regionShort" => "BOY",
			"regionSlug" => "boyaca",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Caldas",
			"regionShort" => "CAL",
			"regionSlug" => "caldas",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Caquetá",
			"regionShort" => "CAQ",
			"regionSlug" => "caqueta",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Casanare",
			"regionShort" => "CAS",
			"regionSlug" => "casanare",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Cauca",
			"regionShort" => "CAU",
			"regionSlug" => "cauca",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Cesar",
			"regionShort" => "CES",
			"regionSlug" => "cesar",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Chocó",
			"regionShort" => "CHO",
			"regionSlug" => "choco",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Córdoba",
			"regionShort" => "COR",
			"regionSlug" => "cordoba",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Cundinamarca",
			"regionShort" => "CUN",
			"regionSlug" => "cundinamarca",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Distrito Capital",
			"regionShort" => "DC",
			"regionSlug" => "distrito_capital",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Guainía",
			"regionShort" => "GUA",
			"regionSlug" => "guainia",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Guaviare",
			"regionShort" => "GUV",
			"regionSlug" => "guaviare",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Huila",
			"regionShort" => "HUI",
			"regionSlug" => "huila",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "La Guajira",
			"regionShort" => "LAG",
			"regionSlug" => "la_guajira",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Magdalena",
			"regionShort" => "MAG",
			"regionSlug" => "magdalena",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Meta",
			"regionShort" => "MET",
			"regionSlug" => "meta",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Nariño",
			"regionShort" => "NAR",
			"regionSlug" => "narino",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Norte de Santander",
			"regionShort" => "NSA",
			"regionSlug" => "norte_de_santander",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Putumayo",
			"regionShort" => "PUT",
			"regionSlug" => "putumayo",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Quindío",
			"regionShort" => "QUI",
			"regionSlug" => "quindio",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Risaralda",
			"regionShort" => "RIS",
			"regionSlug" => "risaralda",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "San Andrés y Providencia",
			"regionShort" => "SAP",
			"regionSlug" => "san_andres",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Santander",
			"regionShort" => "SAN",
			"regionSlug" => "santander",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Sucre",
			"regionShort" => "SUC",
			"regionSlug" => "sucre",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Tolima",
			"regionShort" => "TOL",
			"regionSlug" => "tolima",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Tolima",
			"regionShort" => "TOL",
			"regionSlug" => "tolima",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Valle del Cauca",
			"regionShort" => "VAC",
			"regionSlug" => "valle_del_cauca",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Vaupés",
			"regionShort" => "VAU",
			"regionSlug" => "vaupes",
			"weight" => 3,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Vichada",
			"regionShort" => "VID",
			"regionSlug" => "vichada",
			"weight" => 3,
			"cities" => array(

			)
		)
	);


	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
