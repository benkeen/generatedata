<?php

/**
 * @package Countries
 */

class Country_SouthKorea extends CountryPlugin {
	protected $countryName = "South Korea";
	protected $countrySlug = "southkorea";
	protected $regionNames = "South Korea provinces";
	protected $continent = "asia";

	protected $extendedData = array(
		"zipFormat" => array(
			"format" => "Xxxxx",
			"replacements" => array(
				"X" => "012",
				"x" => "0123456789"
			)
		),
		"phoneFormat" => array(
			"areaCodes" => array(
				"031", "032", "033", "041", "042", "043", "044", "049", "051", "052", "053", "054", "055", "061",
				"062", "063", "064"
			),
			"displayFormats" => array(
				"AAA-xxx-xxxx"
			)
		)
	);

	protected $countryData = array(
		array(
			"regionName" => "North Chungcheong",
			"regionShort" => "Chungbuk",
			"regionSlug" => "chungbuk",
			"weight" => 16,
			"cities" => array(
				"Chungju", "Jecheon"
			)
		),
		array(
			"regionName" => "South Chungcheong",
			"regionShort" => "Chungnam",
			"regionSlug" => "chungnam",
			"weight" => 20,
			"cities" => array(
				"Daejeon", "Asan", "Dangjin", "Nonsan", "Gongju", "Boryeong"
			)
		),
		array(
			"regionName" => "Gangwon",
			"regionShort" => "Gangwon",
			"regionSlug" => "gangwon",
			"weight" => 15,
			"cities" => array(
				"Wonju", "Chuncheon", "Gangneung"
			)
		),
		array(
			"regionName" => "Gyeonggi",
			"regionShort" => "Gyeonggi",
			"regionSlug" => "gyeonggi",
			"weight" => 122,
			"cities" => array(
				"Seoul", "Incheon", "Gwangju", "Suwon", "Goyang", "Yongin", "Seongnam", "Bucheon", "Ansan", "Namyangju",
				"Hwaseong", "Anyang", "Pyeongtaek", "Siheung", "Uijeongbu", "Paju", "Gimpo", "Gwangmyeong", "Gwangju",
				"Gunpo", "Osan", "Icheon", "Yangju", "Anseong", "Guri", "Pocheon", "Uiwang", "Hanam", "Yeoju", "Dongducheon"
			)
		),
		array(
			"regionName" => "North Gyeongsang",
			"regionShort" => "Gyeongbuk",
			"regionSlug" => "gyeongbuk",
			"weight" => 27,
			"cities" => array(
				"Cheongju", "Pohang", "Gumi", "Gyeongsan", "Gyeongju", "Andong", "Gimcheon", "Yeongju", "Sangju",
				"Yeongcheon"
			)
		),
		array(
			"regionName" => "South Gyeongsang",
			"regionShort" => "Gyeongnam",
			"regionSlug" => "gyeongnam",
			"weight" => 34,
			"cities" => array(
				"Busan", "Daegu", "Ulsan", "Changwon", "Cheonan", "Gimhae", "Jinju", "Yangsan", "Geoje", "Seosan",
				"Tongyeong", "Sacheon", "Miryang"
			)
		),
		array(
			"regionName" => "North Jeolla",
			"regionShort" => "Jeonbuk",
			"regionSlug" => "jeonbuk",
			"weight" => 34,
			"cities" => array(
				"Jeonju", "Iksan", "Gunsan", "Jeongeup"
			)
		),
		array(
			"regionName" => "South Jeolla",
			"regionShort" => "Jeonnam",
			"regionSlug" => "jeonnam",
			"weight" => 19,
			"cities" => array(
				"Yeosu", "Suncheon", "Mokpo", "Gwangyang"
			)
		),
		array(
			"regionName" => "Jeju",
			"regionShort" => "Jeju",
			"regionSlug" => "jeju",
			"weight" => 5,
			"cities" => array(
				"Jeju", "Seogwipo"
			)
		)
	);

	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
