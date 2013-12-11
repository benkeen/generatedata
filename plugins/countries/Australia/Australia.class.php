<?php

/**
 * @package Countries
 */

class Country_Australia extends CountryPlugin {
	protected $countryName = "Australia";
	protected $countrySlug = "australia";
	protected $regionNames = "Australian St./Terr.";
	protected $continent = "oceania";

	protected $extendedData = array(
		"zipFormat" => array(
			"format" => "Xxxx",
			"replacements" => array(
				"X" => "123456789",
				"x" => "0123456789"
			)
		),
 		"phoneFormat" => array(
			"displayFormats" => array(
				"xxxx-xxxx",
				"(0x) xxxx xxxx",
				"04xx xxx xxx"
			)
		)
	);

	protected $countryData = array(
		array(
			"regionName" => "Australian Capital Territories",
			"regionShort" => "AC",
			"regionSlug" => "australian_capital_territories",
			"weight" => 3,
			"cities" => array(
				"Canberra"
			)
		),
		array(
			"regionName" => "New South Wales",
			"regionShort" => "NS",
			"regionSlug" => "new_south_wales",
			"weight" => 69,
			"cities" => array(
				"Sydney", "Albury", "Armidale", "Bathurst", "Blue Mountains", "Broken Hill",
				"Campbelltown", "Cessnock", "Dubbo", "Goulburn", "Grafton", "Lithgow",
				"Liverpool", "Newcastle", "Orange", "Parramatta", "Penrith", "Queanbeyan",
				"Tamworth", "Wagga Wagga", "Wollongong"
			)
		),
		array(
			"regionName" => "Northern Territory",
			"regionShort" => "NT",
			"regionSlug" => "northern_territory",
			"weight" => 2,
			"cities" => array(
				"Darwin", "Palmerston"
			)
		),
		array(
			"regionName" => "Queensland",
			"regionShort" => "QL",
			"regionSlug" => "queensland",
			"weight" => 42,
			"cities" => array(
				"Brisbane", "Bundaberg", "Cairns", "Caloundra", "Charters Towers", "Gladstone", "Gold Coast",
				"Hervey Bay", "Ipswich", "Logan City", "Mackay", "Maryborough", "Mount Isa", "Redcliffe",
				"Redlands", "Rockhampton", "Toowoomba", "Townsville"
			)
		),
		array(
			"regionName" => "South Australia",
			"regionShort" => "SA",
			"regionSlug" => "south_australia",
			"weight" => 16,
			"cities" => array(
				"Adelaide", "Mount Gambier", "Murray Bridge", "Port Augusta", "Port Pirie", "Port Lincoln",
				"Victor Harbor", "Whyalla"
			)
		),
		array(
			"regionName" => "Tasmania",
			"regionShort" => "TA",
			"regionSlug" => "tasmania",
			"weight" => 5,
			"cities" => array(
				"Greater Hobart", "Burnie", "Devonport", "Launceston"
			)
		),
		array(
			"regionName" => "Victoria",
			"regionShort" => "VI",
			"regionSlug" => "victoria",
			"weight" => 52,
			"cities" => array(
				"Melbourne", "Ararat", "Bairnsdale", "Benalla", "Ballarat", "Bendigo", "Belgrave",
				"Dandenong", "Frankston", "Geelong", "Hamilton", "Horsham", "Melton", "Moe", "Morwell",
				"Mildura", "Sale", "Shepparton", "Swan Hill", "Traralgon", "Wangaratta", "Warrnambool",
				"Wodonga"
			)
		),
		array(
			"regionName" => "Western Australia",
			"regionShort" => "WA",
			"regionSlug" => "western_australia",
			"weight" => 21,
			"cities" => array(
				"Perth", "Albany", "Armadale", "Bayswater", "Belmont", "Bunbury", "Canning", "Cockburn",
				"Fremantle", "Geraldton-Greenough", "Gosnells", "Joondalup", "Kalgoorlie-Boulder", "Mandurah",
				"Melville", "Nedlands", "Rockingham", "South Perth", "Stirling", "Subiaco", "Swan", "Wanneroo"
			)
		)
	);


	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
