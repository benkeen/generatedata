<?php

/**
* Spanish autonomies and cities with population >= 100.000 or province heads
* Weight: percentage of population of the region to the total of Spain * 100
* Source: https://es.wikipedia.org/wiki/Anexo%3AMunicipios_de_Espa%C3%B1a_por_poblaci%C3%B3n
* @package Countries
*/
class Country_Spain extends CountryPlugin {
	protected $countryName = "Spain";
	protected $countrySlug = "spain";
	protected $regionNames = "Spanish Autonomies";
	protected $continent = "europe";

	protected $extendedData = array(
		"zipFormat" => "xxxxx"
	);

	protected $countryData = array(
		array(
			"regionName" => "Andalucía",
			"regionShort" => "AN",
			"regionSlug" => "andalucia",
			"weight" => 1788,
			"cities" => array(
				"Almería",
				"Cádiz",
				"Córdoba",
				"Granada",
				"Sevilla",
				"Huelva",
				"Jaén",
				"Málaga",
				"Jerez de la Frontera",
				"Marbella",
				"Dos Hermanas",
				"Algeciras"
			)
		),
		array(
			"regionName" => "Aragón",
			"regionShort" => "AR",
			"regionSlug" => "aragon",
			"weight" => 286,
			"cities" => array(
				"Huesca",
				"Teruel",
				"Zaragoza"
			)
		),
		array(
			"regionName" => "Principado de Asturias",
			"regionShort" => "AS",
			"regionSlug" => "asturias",
			"weight" => 228,
			"cities" => array(
				"Oviedo",
				"Gijón"
			)
		),
		array(
			"regionName" => "Cantabria",
			"regionShort" => "CA",
			"regionSlug" => "cantabria",
			"weight" => 126,
			"cities" => array(
				"Santander"
			)
		),
		array(
			"regionName" => "Castilla - La Mancha",
			"regionShort" => "CM",
			"regionSlug" => "clm",
			"weight" => 449,
			"cities" => array(
				"Ciudad Real",
				"Albacete",
				"Cuenca",
				"Toledo",
				"Guadalajara"
			)
		),
		array(
			"regionName" => "Castilla y León",
			"regionShort" => "CL",
			"regionSlug" => "cle",
			"weight" => 539,
			"cities" => array(
				"Burgos",
				"León",
				"Palencia",
				"Valladolid",
				"Zamora",
				"Ávila",
				"Salamanca",
				"Segovia",
				"Soria"
			)
		),
		array(
			"regionName" => "Catalunya",
			"regionShort" => "CA",
			"regionSlug" => "cataluña",
			"weight" => 1602,
			"cities" => array(
				"Barcelona",
				"Tarragona",
				"Girona",
				"Lleida",
				"L'Hospitalet de Llobregat",
				"Badalona",
				"Tarrasa",
				"Sabadell",
				"Mataró",
				"Santa Coloma de Gramenet",
				"Reus"
			)
		),
		array(
			"regionName" => "Ceuta",
			"regionShort" => "CE",
			"regionSlug" => "ceuta",
			"weight" => 18,
			"cities" => array(
				"Ceuta"
			)
		),
		array(
			"regionName" => "Comunitat Valenciana",
			"regionShort" => "CV",
			"regionSlug" => "valencia",
			"weight" => 1085,
			"cities" => array(
				"Castelló",
				"Valéncia",
				"Alacant",
				"Elx",
				"Torrevieja"
			)
		),
		array(
			"regionName" => "Canarias",
			"regionShort" => "CN",
			"regionSlug" => "canarias",
			"weight" => 448,
			"cities" => array(
				"Santa Cruz de Tenerife",
				"Las Palmas",
				"San Cristóbal de la Laguna",
				"Telde"
			)
		),
		array(
			"regionName" => "Illes Balears",
			"regionShort" => "BA",
			"regionSlug" => "baleares",
			"weight" => 237,
			"cities" => array(
				"Palma de Mallorca"
			)
		),
		array(
			"regionName" => "Extremadura",
			"regionShort" => "EX",
			"regionSlug" => "extremadura",
			"weight" => 234,
			"cities" => array(
				"Badajoz",
				"Cáceres"
			)
		),
		array(
			"regionName" => "Galicia",
			"regionShort" => "GA",
			"regionSlug" => "galicia",
			"weight" => 588,
			"cities" => array(
				"A Coruña",
				"Ourense",
				"Lugo",
				"Pontevedra",
				"Vigo"
			)
		),
		array(
			"regionName" => "Madrid",
			"regionShort" => "MA",
			"regionSlug" => "madrid",
			"weight" => 1375,
			"cities" => array(
				"Madrid",
				"Móstoles",
				"Alcalá de Henares",
				"Fuenlabrada",
				"Leganés",
				"Getafe",
				"Alcorcón",
				"Torrejón de Ardoz",
				"Parla",
				"Alcobendas"
			)
		),
		array(
			"regionName" => "Melilla",
			"regionShort" => "ME",
			"regionSlug" => "melilla",
			"weight" => 17,
			"cities" => array(
				"Melilla"
			)
		),
		array(
			"regionName" => "Murcia",
			"regionShort" => "MU",
			"regionSlug" => "murcia",
			"weight" => 312,
			"cities" => array(
				"Murcia",
				"Cartagena"
			)
		),
		array(
			"regionName" => "Navarra",
			"regionShort" => "NA",
			"regionSlug" => "navarra",
			"weight" => 136,
			"cities" => array(
				"Pamplona"
			)
		),
		array(
			"regionName" => "Euskadi",
			"regionShort" => "PV",
			"regionSlug" => "paisvasco",
			"weight" => 464,
			"cities" => array(
				"Bilbo",
				"Donosti",
				"Gasteiz",
				"Baracaldo"
			)
		),
		array(
			"regionName" => "La Rioja",
			"regionShort" => "LR",
			"regionSlug" => "larioja",
			"weight" => 68,
			"cities" => array(
				"Logroño"
			)
		)
	);

	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}