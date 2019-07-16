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
	protected $regionNames = "Col. Departments";
	protected $continent = "south_america";

	protected $extendedData = array(
		"zipFormat" => array(
			"replacements" => array(
				"X" => "0123456789"
			),
			"format" => "XXXXXX",
		),
 		"phoneFormat" => array(
			"displayFormats" => array(
				"0xx-xxx-xxxx"
			)
		)
	);

	protected $countryData = array(
		array(
			"regionName" => "Amazonas",
			"regionShort" => "AMA",
			"regionSlug" => "amazonas",
			"weight" => 5,
			"cities" => array(
				"Leticia", "Puerto Nariño"
			)
		),
		array(
			"regionName" => "Antioquia",
			"regionShort" => "ANT",
			"regionSlug" => "antioquia",
			"weight" => 560,
			"cities" => array(
				"Medellín", "Bello", "Itagüí", "Envigado", "Apartadó", "Turbo", "Rionegro"
			)
		),
		array(
			"regionName" => "Arauca",
			"regionShort" => "ARA",
			"regionSlug" => "arauca",
			"weight" => 15,
			"cities" => array(
				"Arauca", "Tame", "Saravena"
			)
		),
		array(
			"regionName" => "Atlántico",
			"regionShort" => "ATL",
			"regionSlug" => "atlantico",
			"weight" => 211,
			"cities" => array(
				"Barranquilla", "Soledad", "Malambo", "Sabanalarga"
			)
		),
		array(
			"regionName" => "Bolívar",
			"regionShort" => "BOL",
			"regionSlug" => "bolivar",
			"weight" => 210,
			"cities" => array(
				"Cartagena", "Magangué", "Carmen de Bolivar"
			)
		),
		array(
			"regionName" => "Boyacá",
			"regionShort" => "BOY",
			"regionSlug" => "boyaca",
			"weight" => 3,
			"cities" => array(
				"Tunja", "Duitama", "Sogamoso", "Chiquinquirá"
			)
		),
		array(
			"regionName" => "Caldas",
			"regionShort" => "CAL",
			"regionSlug" => "caldas",
			"weight" => 3,
			"cities" => array(
				"Manizales", "La Dorada", "Riosucio"
			)
		),
		array(
			"regionName" => "Caquetá",
			"regionShort" => "CAQ",
			"regionSlug" => "caqueta",
			"weight" => 3,
			"cities" => array(
				"Florencia", "San Vicente del Caguán", "Cartagena del Chairá"
			)
		),
		array(
			"regionName" => "Casanare",
			"regionShort" => "CAS",
			"regionSlug" => "casanare",
			"weight" => 3,
			"cities" => array(
				"Yopal", "Aguazul", "Paz de Ariporo"
			)
		),
		array(
			"regionName" => "Cauca",
			"regionShort" => "CAU",
			"regionSlug" => "cauca",
			"weight" => 3,
			"cities" => array(
				"Popayán", "Santander de Quilichao", "El Tambo"
			)
		),
		array(
			"regionName" => "Cesar",
			"regionShort" => "CES",
			"regionSlug" => "cesar",
			"weight" => 3,
			"cities" => array(
				"Valledupar", "Aguachica", "Agustín Codazzi"
			)
		),
		array(
			"regionName" => "Chocó",
			"regionShort" => "CHO",
			"regionSlug" => "choco",
			"weight" => 3,
			"cities" => array(
				"Quibdó", "Alto Baudó", "Medio Atrato", "Istmina"
			)
		),
		array(
			"regionName" => "Córdoba",
			"regionShort" => "COR",
			"regionSlug" => "cordoba",
			"weight" => 3,
			"cities" => array(
				"Montería", "Santa Cruz de Lorica", "Tierralta", "Cereté", "Sahagún", "Montelíbano"
			)
		),
		array(
			"regionName" => "Cundinamarca",
			"regionShort" => "CUN",
			"regionSlug" => "cundinamarca",
			"weight" => 3,
			"cities" => array(
				"Soacha", "Fusagasugá", "Facatativá", "Chía", "Zipaquirá", "Girardot", "Mosquera"
			)
		),
		array(
			"regionName" => "Distrito Capital",
			"regionShort" => "DC",
			"regionSlug" => "distrito_capital",
			"weight" => 3,
			"cities" => array(
				"Bogotá"
			)
		),
		array(
			"regionName" => "Guainía",
			"regionShort" => "GUA",
			"regionSlug" => "guainia",
			"weight" => 3,
			"cities" => array(
				"Inírida", "Puerto Colombia", "Barranco Minas", "Mapiripana"
			)
		),
		array(
			"regionName" => "Guaviare",
			"regionShort" => "GUV",
			"regionSlug" => "guaviare",
			"weight" => 3,
			"cities" => array(
				"San José del Guaviare", "El Retorno", "Miraflores", "Calamar"
			)
		),
		array(
			"regionName" => "Huila",
			"regionShort" => "HUI",
			"regionSlug" => "huila",
			"weight" => 3,
			"cities" => array(
				"Neiva", "Pitalito", "Garzón", "La Plata"
			)
		),
		array(
			"regionName" => "La Guajira",
			"regionShort" => "LAG",
			"regionSlug" => "la_guajira",
			"weight" => 3,
			"cities" => array(
				"Riohacha", "Uribia", "Maicao", "Manaure", "San Juan del Cesar"
			)
		),
		array(
			"regionName" => "Magdalena",
			"regionShort" => "MAG",
			"regionSlug" => "magdalena",
			"weight" => 3,
			"cities" => array(
				"Santa Marta", "Ciénaga", "Zona Bananera", "Plato", "Fundación"
			)
		),
		array(
			"regionName" => "Meta",
			"regionShort" => "MET",
			"regionSlug" => "meta",
			"weight" => 3,
			"cities" => array(
				"Villavicencio", "Acacías", "Granada", "Puerto López"
			)
		),
		array(
			"regionName" => "Nariño",
			"regionShort" => "NAR",
			"regionSlug" => "narino",
			"weight" => 3,
			"cities" => array(
				"San Juan de Pasto", "Tumaco", "Ipiales", "Samaniego"
			)
		),
		array(
			"regionName" => "Norte de Santander",
			"regionShort" => "NSA",
			"regionSlug" => "norte_de_santander",
			"weight" => 3,
			"cities" => array(
				"Cúcuta", "Ocaña", "Villa del Rosario", "Los Patios", "Pamplona"
			)
		),
		array(
			"regionName" => "Putumayo",
			"regionShort" => "PUT",
			"regionSlug" => "putumayo",
			"weight" => 3,
			"cities" => array(
				"Puerto Asís", "Orito", "Valle del Guamuez", "Mocoa", "Puerto Guzmán"
			)
		),
		array(
			"regionName" => "Quindío",
			"regionShort" => "QUI",
			"regionSlug" => "quindio",
			"weight" => 3,
			"cities" => array(
				"Armenia", "Calarcá", "La Tebaida", "Montenegro", "Quimbaya"
			)
		),
		array(
			"regionName" => "Risaralda",
			"regionShort" => "RIS",
			"regionSlug" => "risaralda",
			"weight" => 3,
			"cities" => array(
				"Pereira", "Dosquebradas", "Santa Rosa de Cabal"
			)
		),
		array(
			"regionName" => "San Andrés y Providencia",
			"regionShort" => "SAP",
			"regionSlug" => "san_andres",
			"weight" => 3,
			"cities" => array(
				"San Andrés"
			)
		),
		array(
			"regionName" => "Santander",
			"regionShort" => "SAN",
			"regionSlug" => "santander",
			"weight" => 3,
			"cities" => array(
				"Bucaramanga", "Floridablanca", "San Juan de Girón", "Barrancabermeja", "Piedecuesta"
			)
		),
		array(
			"regionName" => "Sucre",
			"regionShort" => "SUC",
			"regionSlug" => "sucre",
			"weight" => 3,
			"cities" => array(
				"Sincelejo", "Corozal", "San Marcos"
			)
		),
		array(
			"regionName" => "Tolima",
			"regionShort" => "TOL",
			"regionSlug" => "tolima",
			"weight" => 3,
			"cities" => array(
				"Ibagué",
			)
		),
		array(
			"regionName" => "Valle del Cauca",
			"regionShort" => "VAC",
			"regionSlug" => "valle_del_cauca",
			"weight" => 3,
			"cities" => array(
				"Cali", "Buenaventura", "Palmira", "Tuluá"
			)
		),
		array(
			"regionName" => "Vaupés",
			"regionShort" => "VAU",
			"regionSlug" => "vaupes",
			"weight" => 3,
			"cities" => array(
				"Mitú", "Pacoa"
			)
		),
		array(
			"regionName" => "Vichada",
			"regionShort" => "VID",
			"regionSlug" => "vichada",
			"weight" => 3,
			"cities" => array(
				"Cumaribo", "Puerto Carreño"
			)
		)
	);


	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
