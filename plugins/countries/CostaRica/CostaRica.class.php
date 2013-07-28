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
	protected $regionNames = "Provinces";
	protected $zipFormatAdvanced = true;
	protected $zipFormatRegional = true;
	
	protected $zipFormat = array(
		array(
			"area"   => "CR-CR",
			"format" => "ZYxYx",
			"replacements" => array(
				"Z" => "1234567",
				"Y" => "01",
				"x" => "0123456789"
			)
		),
		array(
			"area"   => "CR-A",
			"format" => "ZzxYx",
			"replacements" => array(
				"Z" => "2",
				"z" => "01",
				"Y" => "01",
				"x" => "0123456789"
			)
		),
		array(
			"area"   => "CR-C",
			"format" => "ZzxYx",
			"replacements" => array(
				"Z" => "3",
				"z" => "0",
				"Y" => "01",
				"x" => "0123456789"
			)
		),
		array(
			"area"   => "CR-G",
			"format" => "ZzxYx",
			"replacements" => array(
				"Z" => "5",
				"z" => "01",
				"Y" => "01",
				"x" => "0123456789"
			)
		),
		array(
			"area"   => "CR-H",
			"format" => "ZzxYx",
			"replacements" => array(
				"Z" => "4",
				"z" => "01",
				"Y" => "01",
				"x" => "0123456789"
			)
		),
		array(
			"area"   => "CR-L",
			"format" => "ZzyYx",
			"replacements" => array(
				"Z" => "5",
				"z" => "0",
				"y" => "12",
				"Y" => "01",
				"x" => "0123456789"
			)
		),
		array(
			"area"   => "CR-P",
			"format" => "ZYxYx",
			"replacements" => array(
				"Z" => "1234567",
				"Y" => "01",
				"x" => "0123456789"
			)
		),
		array(
			"area"   => "CR-SJ",
			"format" => "ZzxYx",
			"replacements" => array(
				"Z" => "1",
				"z" => "012",
				"Y" => "01",
				"x" => "0123456789"
			)
		)
	);

	public function install() {
		$data = array(
			array(
				"regionName" => "Alajuela",
				"regionShort" => "A",
				"regionSlug" => "alajuela",
				"weight" => "20",
				"cities" => array(
					"Alajuela", "Quesada", "San José de Alajuela", "San Rafael"
				)
			),
			array(
				"regionName" => "Cartago",
				"regionShort" => "C",
				"regionSlug" => "cartago",
				"weight" => "11",
				"cities" => array(
					"Aguacaliente (San Francisco)", "Carmen", "Cartago", "Paraíso", "San Diego", "San Nicolás", "San Rafael", "Tejar", "Turrialba"
				)
			),
			array(
				"regionName" => "Guanacaste",
				"regionShort" => "G",
				"regionSlug" => "guanacaste",
				"weight" => "8",
				"cities" => array(
					"Cañas", "Liberia", "Nicoya"
				)
			),
			array(
				"regionName" => "Heredia",
				"regionShort" => "H",
				"regionSlug" => "heredia",
				"weight" => "10",
				"cities" => array(
					"Heredia", "Mercedes", "San Francisco", "San Pablo", "Ulloa (Barrial)"
				)
			),
			array(
				"regionName" => "Limón",
				"regionShort" => "L",
				"regionSlug" => "limón",
				"weight" => "2",
				"cities" => array(
					"Guápiles", "Limón (Puerto Limón)", "Siquirres"
				)
			),
			array(
				"regionName" => "Puntarenas",
				"regionShort" => "P",
				"regionSlug" => "puntarenas",
				"weight" => "2",
				"cities" => array(
					"Barranca", "Puntarenas"
				)
			),
			array(
				"regionName" => "San José",
				"regionShort" => "SJ",
				"regionSlug" => "san_josé",
				"weight" => "33",
				"cities" => array(
					"Alajuelita", "Aserrí", "Calle Blancos", "Cinco Esquinas", "Concepción", "Curridabat", "Desamparados", "Gravilias", "Guadalupe", "Ipís", 
					"Mata de Plátano", "Patalillo", "Patarrá", "Purral", "San Antonio", "San Felipe", "San Isidro", "San Isidro de El General",	"San José",
					"San Juan (San Juan de Tibás)", "San Juan de Dios", "San Miguel", "San Pedro", "San Rafael", "San Rafael Abajo", "San Vicente", "Tirrases"
				)
			)
		);

		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $data);
	}
}
