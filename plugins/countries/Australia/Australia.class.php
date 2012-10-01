<?php

class Country_Australia extends CountryPlugin {
	protected $countryName = "Australia";
	protected $countrySlug = "australia";
	protected $regionNames = "Australian St./Terr.";
	protected $zipFormat = "Xxxx";

	public function install() {
		$prefix = Core::getDbTablePrefix();

		$data = array(
			"australian_capital_territories" => array(
				"Canberra"
			),
			"new_south_wales" => array(
				"Sydney", "Albury", "Armidale", "Bathurst", "Blue Mountains", "Broken Hill",
		 		"Campbelltown", "Cessnock", "Dubbo", "Goulburn", "Grafton", "Lithgow",
				"Liverpool", "Newcastle", "Orange", "Parramatta", "Penrith", "Queanbeyan",
				"Tamworth", "Wagga Wagga", "Wollongong"
			),
			"northern_territory" => array(
				"Darwin", "Palmerston"
			),
			"queensland" => array(
			 	"Brisbane", "Bundaberg", "Cairns", "Caloundra", "Charters Towers", "Gladstone", "Gold Coast",
				"Hervey Bay", "Ipswich", "Logan City", "Mackay", "Maryborough", "Mount Isa", "Redcliffe",
				"Redlands", "Rockhampton", "Toowoomba", "Townsville"
			),
			"south_australia" => array(
				"Adelaide", "Mount Gambier", "Murray Bridge", "Port Augusta", "Port Pirie", "Port Lincoln",
				"Victor Harbor", "Whyalla",
			),
			"tasmania" => array(
				"Greater Hobart", "Burnie", "Devonport", "Launceston"
			),
			"victoria" => array(
				"Melbourne", "Ararat", "Bairnsdale", "Benalla", "Ballarat", "Bendigo", "Belgrave",
				"Dandenong", "Frankston", "Geelong", "Hamilton", "Horsham", "Melton", "Moe", "Morwell",
				"Mildura", "Sale", "Shepparton", "Swan Hill", "Traralgon", "Wangaratta", "Warrnambool",
				"Wodonga"
			),
			"western_australia" => array(
				"Perth", "Albany", "Armadale", "Bayswater", "Belmont", "Bunbury", "Canning", "Cockburn",
				"Fremantle", "Geraldton-Greenough", "Gosnells", "Joondalup", "Kalgoorlie-Boulder", "Mandurah",
				"Melville", "Nedlands", "Rockingham", "South Perth", "Stirling", "Subiaco", "Swan", "Wanneroo"
			)
		);

		$queries = array();
		$queries[] = "
			INSERT INTO {$prefix}countries (country, country_slug)
			VALUES ('Australia', '{$this->countrySlug}')
		";
		$queries[] = "
			INSERT INTO {$prefix}regions (country_slug, region, region_slug, region_short, weight)
			VALUES
			('{$this->countrySlug}', 'Australian Capital Territories', 'australian_capital_territories', 'AC', '3'),
			('{$this->countrySlug}', 'New South Wales', 'new_south_wales', 'NS', '69'),
			('{$this->countrySlug}', 'Northern Territory', 'northern_territory', 'NT', '2'),
			('{$this->countrySlug}', 'Queensland', 'queensland', 'QL', '42'),
			('{$this->countrySlug}', 'South Australia', 'south_australia', 'SA', '16'),
			('{$this->countrySlug}', 'Tasmania', 'tasmania', 'TA', '5'),
			('{$this->countrySlug}', 'Victoria', 'victoria', 'VI', '52'),
			('{$this->countrySlug}', 'Western Australia', 'western_australia', 'WA', '21')
		";

		while (list($regionSlug, $cities) = each($data)) {
			$rows = array();
			foreach ($cities as $cityName) {
				$rows[] = "('{$this->countrySlug}', '$regionSlug', '$cityName')";
			}
			$rows_str = implode(",", $rows);
			$queries[] = "
				INSERT INTO {$prefix}cities (country_slug, region_slug, city)
				VALUES $rows_str
			";
		}

		$response = Core::$db->query($queries);

		if ($response["success"]) {
			return array(true, "");
		} else {
			$this->uninstall();
			return array(false, $response["errorMessage"]);
		}
	}
}
