<?php

/**
 * @package Countries
 */

class Country_Brazil extends CountryPlugin {
	protected $countryName = "Brazil";
	protected $countrySlug = "brazil";
	protected $regionNames = "Brazilian States";
	protected $continent = "south_america";

	protected $extendedData = array(
		"zipFormat" => array(
			"format" => "xxxxx-xxx",
			"replacements" => array(
				"X" => "123456789",
				"x" => "0123456789",
				"Y" => "012345678",
				"W" => "01234567",
				"V" => "0123456",
				"U" => "012345",
				"T" => "01234",
				"S" => "0123",
				"R" => "678",
				"Q" => "89",
				"P" => "3456"
			)
		)
	);


	protected $countryData = array(
		array(
			"regionName" => "São Paulo",
			"regionShort" => "SP",
			"regionSlug" => "sau_paulo",
			"weight" => 41,
			"cities" => array(
				"Guarulhos", "Campinas", "Osasco", "Ribeirão Preto", "Mauá", "Mogi das Cruzes", "Diadema",
				"Jundiaí", "Carapicuíba", "Piracicaba"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "1Xxxx-xxx"
				)
			)
		),
		array(
			"regionName" => "Minas Gerais",
			"regionShort" => "MG",
			"regionSlug" => "minas_gerais",
			"weight" => 20,
			"cities" => array(
				"Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Montes Claros",
				"Ribeirão das Neves", "Uberaba", "Governador Valadares", "Ipatinga", "Sete Lagoas",
				"Divinópolis", "Santa Luzia"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "3xxxxxxx"
				)
			)
		),
		array(
			"regionName" => "Rio de Janeiro",
			"regionShort" => "RJ",
			"regionSlug" => "rio",
			"weight" => 16,
			"cities" => array(
				"Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói", "Belford Roxo",
				"Campos dos Goytacazes", "São João de Meriti", "Petrópolis"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "2Yxxx-xxx"
				)
			)
		),
		array(
			"regionName" => "Bahia",
			"regionShort" => "BA",
			"regionSlug" => "bahia",
			"weight" => 14,
			"cities" => array(
				"Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Itabuna",
				"Juazeiro", "Ilhéus", "Lauro de Freitas"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "4Yxxx-xxx"
				)
			)
		),
		array(
			"regionName" => "Rio Grande do Sul",
			"regionShort" => "RS",
			"regionSlug" => "rio_grande",
			"weight" => 11,
			"cities" => array(
				"Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria", "Gravataí",
				"Novo Hamburgo", "Rio Grande"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "9xxxx-xxx"
				)
			)
		),
		array(
			"regionName" => "Paraná",
			"regionShort" => "PR",
			"regionSlug" => "parana",
			"weight" => 11,
			"cities" => array(
				"Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel", "São José dos Pinhais",
				"Foz do Iguaçu", "Colombo", "Guarapuava", "Paranaguá"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "8Wxxx-xxx"
				)
			)
		),
		array(
			"regionName" => "Pernambuco",
			"regionShort" => "PE",
			"regionSlug" => "pernambuco",
			"weight" => 9,
			"cities" => array(
				"Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Paulista", "Petrolina",
				"Cabo de Santo Agostinho", "Camaragibe"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "5Vxxx-xxx"
				)
			)
		),
		array(
			"regionName" => "Ceará",
			"regionShort" => "CE",
			"regionSlug" => "ceara",
			"weight" => 9,
			"cities" => array(
				"Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral", "Crato",
				"Itapipoca", "Maranguape"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "6Sxxx-xxx"
				)
			)
		),
		array(
			"regionName" => "Pará",
			"regionShort" => "PA",
			"regionSlug" => "para",
			"weight" => 8,
			"cities" => array(
				"Belém", "Ananindeua", "Santarém", "Marabá", "Castanhal", "Parauapebas",
				"Abaetetuba", "Cametá", "Bragança"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "6RYxx-xxx"
				)
			)
		),
		array(
			"regionName" => "Maranhão",
			"regionShort" => "MA",
			"regionSlug" => "maranhao",
			"weight" => 7,
			"cities" => array(
				"São Luís", "Imperatriz", "Timon", "Caxias", "Codó", "Paço do Lumiar", "Açailândia",
				"Bacabal", "Santa Inês", "Balsas", "Chapadinha", "Barra do Corda"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "65xxx-xxx"
				)
			)
		),
		array(
			"regionName" => "Santa Catarina",
			"regionShort" => "SC",
			"regionSlug" => "santa_catarina",
			"weight" => 6,
			"cities" => array(
				"Joinville", "Florianópolis", "Blumenau", "São José", "Criciúma", "Chapecó", "Itajaí"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "8Qxxx-xxx"
				)
			)
		),
		array(
			"regionName" => "Goiás",
			"regionShort" => "GO",
			"regionSlug" => "goias",
			"weight" => 6,
			"cities" => array(
				"Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia",
				"Águas Lindas de Goiás", "Valparaíso de Goiás"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "7P7xx-xxx"
				)
			)
		),
		array(
			"regionName" => "Paraíba",
			"regionShort" => "PB",
			"regionSlug" => "paraiba",
			"weight" => 4,
			"cities" => array(
				"João Pessoa", "Campina Grande", "Santa Rita", "Patos",  "Bayeux", "Sousa", "Cajazeiras"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "58xxx-xxx"
				)
			)
		)
	);


	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
