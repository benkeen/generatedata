<?php

/**
 * Turkey provinces with population >= 1 million, plus the five largest city in each.
 * Sources:
 * 		http://en.wikipedia.org/wiki/Provinces_of_Turkey
 * 		http://en.wikipedia.org/wiki/List_of_cities_in_Turkey
 *
 * Note: Turkey doesn't appear to have short codes for the provinces, so this just sets them all to the full name.
 *
 * @package Countries
 */
class Country_Turkey extends CountryPlugin {
	protected $countryName = "Turkey";
	protected $countrySlug = "turkey";
	protected $regionNames = "Turkey provinces";
	protected $continent = "europe";

	protected $extendedData = array(
		"zipFormat" => array(
			"format" => "xyyyy",
			"replacements" => array(
				"x" => "01234567",
				"y" => "0123456789"
			)
		)
	);

	protected $countryData = array(
		array(
			"regionName" => "Istanbul",
			"regionShort" => "Ist",
			"regionSlug" => "istanbul",
			"weight" => 14,
			"cities" => array(
				"Istanbul"
			)
		),
		array(
			"regionName" => "Ankara",
			"regionShort" => "Ank",
			"regionSlug" => "ankara",
			"weight" => 5,
			"cities" => array(
				"Ankara", "Polatlı", "Beypazarı", "Şereflikoçhisar", "Kızılcahamam"
			)
		),
		array(
			"regionName" => "İzmir",
			"regionShort" => "İzm",
			"regionSlug" => "izmir",
			"weight" => 4,
			"cities" => array(
				"Izmir", "Ödemiş", "Bergama", "Tire", "Çeşme"
			)
		),
		array(
			"regionName" => "Bursa",
			"regionShort" => "Bur",
			"regionSlug" => "bursa",
			"weight" => 3,
			"cities" => array(
				"Bursa", "İnegöl", "Mustafakemalpaşa", "Orhangazi", "Karacabey"
			)
		),
		array(
			"regionName" => "Antalya",
			"regionShort" => "Ant",
			"regionSlug" => "antalya",
			"weight" => 2,
			"cities" => array(
				"Antalya", "Alanya", "Manavgat", "Serik", "Kumluca"
			)
		),
		array(
			"regionName" => "Adana",
			"regionShort" => "Ada",
			"regionSlug" => "adana",
			"weight" => 2,
			"cities" => array(
				"Adana", "Ceyhan", "Kozan", "İmamoğlu", "Pozantı"
			)
		),
		array(
			"regionName" => "Konya",
			"regionShort" => "Kon",
			"regionSlug" => "konya",
			"weight" => 2,
			"cities" => array(
				"Konya", "Ereğli", "Akşehir", "Seydişehir", "Karapınar"
			)
		),
		array(
			"regionName" => "Gaziantep",
			"regionShort" => "Gaz",
			"regionSlug" => "gaziantep",
			"weight" => 2,
			"cities" => array(
				"Gaziantep", "Nizip", "İslahiye", "Nurdağı", "Araban"
			)
		),
		array(
			"regionName" => "Şanlıurfa",
			"regionShort" => "Şan",
			"regionSlug" => "sanliurfa",
			"weight" => 2,
			"cities" => array(
				"Şanlıurfa", "Siverek", "Viranşehir", "Suruç", "Birecik"
			)
		),
		array(
			"regionName" => "Mersin",
			"regionShort" => "Mer",
			"regionSlug" => "mersin",
			"weight" => 2,
			"cities" => array(
				"Mersin", "Tarsus", "Silifke", "Erdemli", "Anamur"
			)
		),
		array(
			"regionName" => "Kocaeli",
			"regionShort" => "Koc",
			"regionSlug" => "kocaeli",
			"weight" => 2,
			"cities" => array(
				"İzmit", "Gebze", "Darıca", "Gölcük", "Körfez"
			)
		),
		array(
			"regionName" => "Diyarbakır",
			"regionShort" => "Diy",
			"regionSlug" => "diyarbakir",
			"weight" => 2,
			"cities" => array(
				"Diyarbakır", "Ergani", "Bismil", "Silvan", "Çermik"
			)
		),
		array(
			"regionName" => "Hatay",
			"regionShort" => "Hat",
			"regionSlug" => "hatay",
			"weight" => 2,
			"cities" => array(
				"Antakya", "İskenderun", "Dörtyol", "Kırıkhan", "Reyhanlı"
			)
		),
		array(
			"regionName" => "Manisa",
			"regionShort" => "Man",
			"regionSlug" => "manisa",
			"weight" => 1,
			"cities" => array(
				"Manisa", "Turgutlu", "Akhisar", "Salihli", "Soma"
			)
		),
		array(
			"regionName" => "Kayseri",
			"regionShort" => "Kay",
			"regionSlug" => "kayseri",
			"weight" => 1,
			"cities" => array(
				"Kayseri", "Develi", "Yahyalı", "Bünyan", "Pınarbaşı"
			)
		),
		array(
			"regionName" => "Samsun",
			"regionShort" => "Sam",
			"regionSlug" => "samsun",
			"weight" => 1,
			"cities" => array(
				"Samsun", "Bafra", "Çarşamba", "Terme", "Vezirköprü"
			)
		),
		array(
			"regionName" => "Balıkesir",
			"regionShort" => "Bal",
			"regionSlug" => "balikesir",
			"weight" => 1,
			"cities" => array(
				"Balıkesir", "Bandırma", "Edremit", "Gönen", "Burhaniye"
			)
		),
		array(
			"regionName" => "Kahramanmaraş",
			"regionShort" => "Kah",
			"regionSlug" => "kahramanmaras",
			"weight" => 1,
			"cities" => array(
				"Kahramanmaraş", "Elbistan", "Afşin", "Pazarcık", "Göksun"
			)
		),
		array(
			"regionName" => "Van",
			"regionShort" => "Van",
			"regionSlug" => "van",
			"weight" => 1,
			"cities" => array(
				"Van", "Erciş", "Bostaniçi", "Muradiye", "Çaldıran"
			)
		),
		array(
			"regionName" => "Aydın",
			"regionShort" => "Ayd",
			"regionSlug" => "aydin",
			"weight" => 1,
			"cities" => array(
				"Aydın", "Nazilli", "Söke", "Kuşadası", "Didim"
			)
		),
	);

	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
