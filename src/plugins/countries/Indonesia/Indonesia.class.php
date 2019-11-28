<?php

/**
 * Sources:
 * 		https://en.wikipedia.org/wiki/Provinces_of_Indonesia
 * 		https://en.wikipedia.org/wiki/List_of_Indonesian_cities_by_population
 *
 * @package Countries
 */
class Country_Indonesia extends CountryPlugin {
	protected $countryName = "Indonesia";
	protected $countrySlug = "indonesia";
	protected $regionNames = "Indonesian provinces";
	protected $continent = "asia";

	protected $extendedData = array(
		"zipFormat" => array(
			"format" => "*%%%%",
			"replacements" => array(
				"*" => "123456789",
				"%" => "0123456789"
			)
		),
		"phoneFormat" => array(
			"displayFormats" => array(
				"62 Xx xxx xxxx"
			)
		)
	);

	protected $countryData = array(
		array(
			"regionName" => "Aceh",
			"regionShort" => "AC",
			"regionSlug" => "aceh",
			"weight" => 50,
			"cities" => array(
				"Banda Aceh"
			)
		),
		array(
			"regionName" => "Bali",
			"regionShort" => "BA",
			"regionSlug" => "bali",
			"weight" => 41,
			"cities" => array(
				"Denpasar"
			)
		),
		array(
			"regionName" => "Bangka Belitung Islands",
			"regionShort" => "BB",
			"regionSlug" => "babel",
			"weight" => 14,
			"cities" => array(
				"Pangkalpinang"
			)
		),
		array(
			"regionName" => "Banten",
			"regionShort" => "BT",
			"regionSlug" => "banten",
			"weight" => 119,
			"cities" => array(
				"Serang"
			)
		),
		array(
			"regionName" => "Bengkulu",
			"regionShort" => "BE",
			"regionSlug" => "bengkulu",
			"weight" => 19,
			"cities" => array(
				"Bengkulu"
			)
		),
		array(
			"regionName" => "Central Java",
			"regionShort" => "JT",
			"regionSlug" => "central_java",
			"weight" => 338,
			"cities" => array(
				"Semarang"
			)
		),
		array(
			"regionName" => "Central Kalimantan",
			"regionShort" => "KT",
			"regionSlug" => "central_kalimantan",
			"weight" => 25,
			"cities" => array(
				"Palangka Raya"
			)
		),
		array(
			"regionName" => "Central Sulawesi",
			"regionShort" => "ST",
			"regionSlug" => "central_sulawesi",
			"weight" => 29,
			"cities" => array(
				"Palu"
			)
		),
		array(
			"regionName" => "East Java",
			"regionShort" => "JI",
			"regionSlug" => "east_java",
			"weight" => 388,
			"cities" => array(
				"Surabaya", "Malang", "Kediri", "Probolinggo", "Pasuruan", "Madiun", "Batu", "Blitar", "Mojokerto"
			)
		),
		array(
			"regionName" => "East Kalimantan",
			"regionShort" => "KI",
			"regionSlug" => "east_kalimantan",
			"weight" => 34,
			"cities" => array(
				"Samarinda", "Balikpapan", "Bontang"
			)
		),
		array(
			"regionName" => "East Nusa Tenggara",
			"regionShort" => "NT",
			"regionSlug" => "east_nusa_tenggara",
			"weight" => 51,
			"cities" => array(
				"Kupang"
			)
		),
		array(
			"regionName" => "Gorontalo",
			"regionShort" => "GO",
			"regionSlug" => "gorontalo",
			"weight" => 11,
			"cities" => array(
				"Gorontalo"
			)
		),
		array(
			"regionName" => "Special Capital Region of Jakarta",
			"regionShort" => "JK",
			"regionSlug" => "jakarta_region",
			"weight" => 102,
			"cities" => array(
				"Jakarta", "East Jakarta", "West Jakarta", "South Jakarta", "North Jakarta", "Central Jakarta"
			)
		),
		array(
			"regionName" => "Jambi",
			"regionShort" => "JA",
			"regionSlug" => "jambi",
			"weight" => 34,
			"cities" => array(
				"Jambi", "Sungai Penuh"
			)
		),
		array(
			"regionName" => "Lampung",
			"regionShort" => "LA",
			"regionSlug" => "lampung",
			"weight" => 81,
			"cities" => array(
				"Bandar Lampung", "Metro"
			)
		),
		array(
			"regionName" => "Maluku",
			"regionShort" => "MA",
			"regionSlug" => "maluku",
			"weight" => 17,
			"cities" => array(
				"Ambon", "Tual"
			)
		),
		array(
			"regionName" => "North Kalimantan",
			"regionShort" => "KU",
			"regionSlug" => "north_kalimantan",
			"weight" => 6,
			"cities" => array(
				"Tarakan"
			)
		),
		array(
			"regionName" => "North Maluku",
			"regionShort" => "MU",
			"regionSlug" => "north_maluku",
			"weight" => 12,
			"cities" => array(
				"Ternate", "Tidore"
			)
		),
		array(
			"regionName" => "North Sulawesi",
			"regionShort" => "SA",
			"regionSlug" => "north_sulawesi",
			"weight" => 24,
			"cities" => array(
				"Manado", "Bitung", "Kotamobagu", "Tomohon"
			)
		),
		array(
			"regionName" => "North Sumatra",
			"regionShort" => "SU",
			"regionSlug" => "north_sumatra",
			"weight" => 139,
			"cities" => array(
				"Medan", "Pematangsiantar", "Binjai", "Padang Sidempuan", "Tebing Tinggi", "Tanjungbalai",
				"Gunungsitoli", "Sibolga"
			)
		),
		array(
			"regionName" => "Papua",
			"regionShort" => "PA",
			"regionSlug" => "papua",
			"weight" => 31,
			"cities" => array(
				"Jayapura"
			)
		),
		array(
			"regionName" => "Riau",
			"regionShort" => "RI",
			"regionSlug" => "riau",
			"weight" => 63,
			"cities" => array(
				"Pekanbaru", "Dumai"
			)
		),
		array(
			"regionName" => "Riau Islands",
			"regionShort" => "KR",
			"regionSlug" => "riau_islands",
			"weight" => 20,
			"cities" => array(
				"Tanjung Pinang"
			)
		),
		array(
			"regionName" => "Southeast Sulawesi",
			"regionShort" => "SG",
			"regionSlug" => "southeast_sulawesi",
			"weight" => 25,
			"cities" => array(
				"Kendari", "Baubau"
			)
		),
		array(
			"regionName" => "South Kalimantan",
			"regionShort" => "KS",
			"regionSlug" => "south_kalimantan",
			"weight" => 40,
			"cities" => array(
				"Banjarmasin", "Banjarbaru"
			)
		),
		array(
			"regionName" => "South Sulawesi",
			"regionShort" => "SN",
			"regionSlug" => "south_sulawesi",
			"weight" => 85,
			"cities" => array(
				"Makassar", "Palopo", "Parepare"
			)
		),
		array(
			"regionName" => "South Sumatra",
			"regionShort" => "SS",
			"regionSlug" => "south_sumatra",
			"weight" => 80,
			"cities" => array(
				"Palembang"
			)
		),
		array(
			"regionName" => "West Java",
			"regionShort" => "JB",
			"regionSlug" => "west_java",
			"weight" => 467,
			"cities" => array(
				"Bandung", "Bekasi", "Depok", "Bogor", "Tasikmalaya", "Cimahi", "Sukabumi", "Cirebon", "Banjar"
			)
		),
		array(
			"regionName" => "West Kalimantan",
			"regionShort" => "KB",
			"regionSlug" => "west_kalimantan",
			"weight" => 48,
			"cities" => array(
				"Pontianak", "Singkawang"
			)
		),
		array(
			"regionName" => "West Nusa Tenggara",
			"regionShort" => "NB",
			"regionSlug" => "west_nusa_tenggara",
			"weight" => 48,
			"cities" => array(
				"Mataram", "Bima"
			)
		),
		array(
			"regionName" => "West Papua",
			"regionShort" => "PB",
			"regionSlug" => "west_papua",
			"weight" => 9,
			"cities" => array(
				"Manokwari"
			)
		),
		array(
			"regionName" => "West Sulawesi",
			"regionShort" => "SR",
			"regionSlug" => "west_sulawesi",
			"weight" => 13,
			"cities" => array(
				"Mamuju"
			)
		),
		array(
			"regionName" => "West Sumatra",
			"regionShort" => "SB",
			"regionSlug" => "west_sumatra",
			"weight" => 52,
			"cities" => array(
				"Padang", "Payakumbuh", "Bukittinggi", "Pariaman", "Solok", "Sawahlunto", "Padang Panjang"
			)
		),
		array(
			"regionName" => "Special Region of Yogyakarta",
			"regionShort" => "YO",
			"regionSlug" => "yogyakarta",
			"weight" => 37,
			"cities" => array(
				"Yogyakarta"
			)
		)
	);

	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}