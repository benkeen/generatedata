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
			"format" => "xxxxx-xxxxx",
			"replacements" => array(
				"x" => "0123456789"
			)
		),
 		"phoneFormat" => array(
			"displayFormats" => array(
				"045 Xx Xxxx xxx",
				"045 Xx Xxxx xxxx",
				"045 Xxx Xxxx xxx",
				"045 Xxx Xxxx xxxx",
				"Xxx-Xxxx xxx",
				"55–Xxxx xxxx",
				"55–Xxxx xxx"
			)
		)
	);

	protected $countryData = array(
		array(
			"regionName" => "Mexico City",
			"regionShort" => "CDMX",
			"regionSlug" => "mexico_city",
			"weight" => 89,
			"cities" => array(
				"Mexico City"
			)
		),
		array(
			"regionName" => "Veracruz",
			"regionShort" => "Ver.",
			"regionSlug" => "veracruz",
			"weight" => 76,
			"cities" => array(
				"Veracruz", "Xalapa", "Coatzacoalcos", "Poza Rica", "Córdoba", "Boca del Río", "Orizaba", "Minatitlán"
			)
		),
		array(
			"regionName" => "Jalisco",
			"regionShort" => "Jal.",
			"regionSlug" => "jalisco",
			"weight" => 74,
			"cities" => array(
				"Guadalajara", "Zapopan", "Tlaquepaque", "Tonalá", "Puerto Vallarta"
			)
		),
		array(
			"regionName" => "Puebla",
			"regionShort" => "Pue.",
			"regionSlug" => "puebla",
			"weight" => 58,
			"cities" => array(
				"Tehuacán"
			)
		),
		array(
			"regionName" => "Guanajuato",
			"regionShort" => "Gto.",
			"regionSlug" => "guanajuato",
			"weight" => 55,
			"cities" => array(
				"León", "Irapuato", "Celaya", "Salamanca"
			)
		),
		array(
			"regionName" => "Chiapas",
			"regionShort" => "Chis.",
			"regionSlug" => "chiapas",
			"weight" => 48,
			"cities" => array(
				"Tuxtla Gutiérrez", "Tapachula", "San Cristóbal de las Casas"
			)
		),
		array(
			"regionName" => "Nuevo León",
			"regionShort" => "N.L.",
			"regionSlug" => "nuevoleon",
			"weight" => 47,
			"cities" => array(
				"Monterrey", "Guadalupe", "San Nicolás de los Garza", "Ciudad Apodaca", "General Escobedo",
				"Ciudad Santa Catarina", "San Pedro Garza García"
			)
		),
		array(
			"regionName" => "Michoacán",
			"regionShort" => "Mich.",
			"regionSlug" => "michoacan",
			"weight" => 44,
			"cities" => array(
				"Morelia", "Uruapan", "Zamora de Hidalgo"
			)
		),
		array(
			"regionName" => "Oaxaca",
			"regionShort" => "Oax.",
			"regionSlug" => "oaxaca",
			"weight" => 38,
			"cities" => array(
				"Oaxaca"
			)
		),
		array(
			"regionName" => "Chihuahua",
			"regionShort" => "Chih.",
			"regionSlug" => "chihuahua",
			"weight" => 34,
			"cities" => array(
				"Juárez", "Chihuahua", "Delicias", "Hidalgo del Parral"
			)
		),
		array(
			"regionName" => "Guerrero",
			"regionShort" => "Gro.",
			"regionSlug" => "guerrero",
			"weight" => 34,
			"cities" => array(
				"Acapulco", "Chilpancingo", "Iguala"
			)
		),
		array(
			"regionName" => "Tamaulipas",
			"regionShort" => "Tamps.",
			"regionSlug" => "Tamaulipas",
			"weight" => 33,
			"cities" => array(
				"Reynosa", "Matamoros", "Nuevo Laredo", "Tampico", "Ciudad Victoria", "Ciudad Madero"
			)
		),
		array(
			"regionName" => "Baja California",
			"regionShort" => "B.C.",
			"regionSlug" => "baja_california",
			"weight" => 32,
			"cities" => array(
				"Tijuana", "Mexicali", "Ensenada", "La Paz"
			)
		),
		array(
			"regionName" => "Sinaloa",
			"regionShort" => "Sin.",
			"regionSlug" => "sinaloa",
			"weight" => 28,
			"cities" => array(
				"Culiacán", "Mazatlán", "Los Mochis"
			)
		),
		array(
			"regionName" => "Coahuila",
			"regionShort" => "Coah.",
			"regionSlug" => "coahuila",
			"weight" => 27,
			"cities" => array(
				"Saltillo", "Torreón", "Monclova", "Piedras Negras", "Acuña"
			)
		),
		array(
			"regionName" => "Hidalgo",
			"regionShort" => "Hgo.",
			"regionSlug" => "Hidalgo",
			"weight" => 27,
			"cities" => array(
				"Pachuca"
			)
		),
		array(
			"regionName" => "Sonora",
			"regionShort" => "Son.",
			"regionSlug" => "Sonora",
			"weight" => 27,
			"cities" => array(
				"Hermosillo", "Ciudad Obregón", "Nogales", "San Luis Río Colorado", "Navojoa", "Guaymas"
			)
		),
		array(
			"regionName" => "San Luis Potosí",
			"regionShort" => "S.L.P.",
			"regionSlug" => "San Luis Potosí",
			"weight" => 26,
			"cities" => array(
				"San Luis Potosí", "Soledad de Graciano Sánchez", "Ciudad Valles"
			)
		),
		array(
			"regionName" => "Tabasco",
			"regionShort" => "Tab.",
			"regionSlug" => "Tabasco",
			"weight" => 22,
			"cities" => array(
				"Villahermosa"
			)
		),
		array(
			"regionName" => "Yucatán",
			"regionShort" => "Yuc.",
			"regionSlug" => "Yucatán",
			"weight" => 20,
			"cities" => array(
				"Mérida"
			)
		),
		array(
			"regionName" => "Querétaro",
			"regionShort" => "Qro.",
			"regionSlug" => "Querétaro",
			"weight" => 18,
			"cities" => array(
				"Querétaro", "San Juan del Río"
			)
		),
		array(
			"regionName" => "Morelos",
			"regionShort" => "Mor.",
			"regionSlug" => "Morelos",
			"weight" => 18,
			"cities" => array(
				"Cuernavaca", "Jiutepec", "Cuautla"
			)
		)
	);


	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
