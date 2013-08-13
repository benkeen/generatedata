<?php

/**
 * @package Countries
 *
 * @author Andre Fortin <andre.v.fortin@gmail.com>
 */

class Country_CostaRica extends CountryPlugin {
	protected $continent   = "central_america";
	protected $countryName = "Costa Rica";
	protected $countrySlug = "CR";
	protected $regionNames = "Costa Rican Provinces";

	protected $extendedData = array(
		"zipFormat" => array(
			"format" => "ZYxYx",
			"replacements" => array(
				"Z" => "1234567",
				"Y" => "01",
				"x" => "0123456789"
			)
		),
		"phoneFormat" => array(
			"displayFormats" => array(
				"xxxxxxxx",
				"xxxx-xxxx"
			)
		)
	);

	protected $countryData = array(
		array(
			"regionName" => "Alajuela",
			"regionShort" => "A",
			"regionSlug" => "alajuela",
			"weight" => 20,
			"cities" => array(
				"Alajuela", "Quesada", "San José de Alajuela", "San Rafael"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "2zxYx",
					"replacements" => array(
						"z" => "01",
						"Y" => "01",
						"x" => "0123456789"
					)
				),
				"phoneFormat" => array(
					"format" => "24xxxxxx"
				)
			)
		),
		array(
			"regionName" => "Cartago",
			"regionShort" => "C",
			"regionSlug" => "cartago",
			"weight" => 11,
			"cities" => array(
				"Aguacaliente (San Francisco)", "Carmen", "Cartago", "Paraíso", "San Diego", "San Nicolás",
				"San Rafael", "Tejar", "Turrialba"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "30xYx",
					"replacements" => array(
						"Y" => "01",
						"x" => "0123456789"
					)
				),
				"phoneFormat" => array(
					"format" => "25xxxxxx"
				)
			)
		),
		array(
			"regionName" => "Guanacaste",
			"regionShort" => "G",
			"regionSlug" => "guanacaste",
			"weight" => 8,
			"cities" => array(
				"Cañas", "Liberia", "Nicoya"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "5zxYx",
					"replacements" => array(
						"z" => "01",
						"Y" => "01",
						"x" => "0123456789"
					)
				),
				"phoneFormat" => array(
					"format" => "26xxxxxx"
				)
			)
		),
		array(
			"regionName" => "Heredia",
			"regionShort" => "H",
			"regionSlug" => "heredia",
			"weight" => 10,
			"cities" => array(
				"Heredia", "Mercedes", "San Francisco", "San Pablo", "Ulloa (Barrial)"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "4zxYx",
					"replacements" => array(
						"z" => "01",
						"Y" => "01",
						"x" => "0123456789"
					)
				),
				"phoneFormat" => array(
					"format" => "25xxxxxx"
				)
			)
		),
		array(
			"regionName" => "Limón",
			"regionShort" => "L",
			"regionSlug" => "limón",
			"weight" => 2,
			"cities" => array(
				"Guápiles", "Limón (Puerto Limón)", "Siquirres"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "50yYx",
					"replacements" => array(
						"y" => "12",
						"Y" => "01",
						"x" => "0123456789"
					)
				),
				"phoneFormat" => array(
					"format" => "27xxxxxx"
				)
			)
		),
		array(
			"regionName" => "Puntarenas",
			"regionShort" => "P",
			"regionSlug" => "puntarenas",
			"weight" => 2,
			"cities" => array(
				"Barranca", "Puntarenas"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "ZYxYx",
					"replacements" => array(
						"Z" => "1234567",
						"Y" => "01",
						"x" => "0123456789"
					)
				),
				"phoneFormat" => array(
					"format" => "27xxxxxx"
				)
			)
		),
		array(
			"regionName" => "San José",
			"regionShort" => "SJ",
			"regionSlug" => "san_josé",
			"weight" => 33,
			"cities" => array(
				"Alajuelita", "Aserrí", "Calle Blancos", "Cinco Esquinas", "Concepción", "Curridabat", "Desamparados", "Gravilias", "Guadalupe", "Ipís",
				"Mata de Plátano", "Patalillo", "Patarrá", "Purral", "San Antonio", "San Felipe", "San Isidro", "San Isidro de El General",	"San José",
				"San Juan (San Juan de Tibás)", "San Juan de Dios", "San Miguel", "San Pedro", "San Rafael", "San Rafael Abajo", "San Vicente", "Tirrases"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "1zxYx",
					"replacements" => array(
						"z" => "012",
						"Y" => "01",
						"x" => "0123456789"
					)
				),
				"phoneFormat" => array(
					"format" => "25xxxxxx"
				)
			)
		)
	);


	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
