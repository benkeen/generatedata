<?php

/**
 * @package Countries
 */

class Country_NewZealand extends CountryPlugin {
	protected $countryName = "New Zealand";
	protected $countrySlug = "newzealand";
	protected $regionNames = "NZ Regions";
	protected $continent = "oceania";

	protected $extendedData = array(
		"zipFormat" => "xxxx"
	);

	protected $countryData = array(
		array(
			"regionName" => "North Island",
			"regionShort" => "NI",
			"regionSlug" => "north_island",
			"weight" => 3,
			"cities" => array(
				"Auckland", "Manukau", "North Shore", "Waitakere", "Wellington", "Hamilton", "Tauranga",
				"Lower Hutt", "Palmerston North", "Hastings", "Napier", "Rotorua", "New Plymouth", "Whangarei",
				"Porirua", "Wanganui", "Kapiti", "Upper Hutt", "Gisborne", "Pukekohe", "Taupo", "Masterton",
				"Levin", "Whakatane", "Cambridge", "Te Awamutu", "Feilding", "Tokoroa", "Hawera", "Waiuku",
				"Waiheke Island", "Te Puke", "Kawerau", "Huntly", "Thames", "Morrinsville", "Matamata", "Waitara",
				"Kerikeri", "Dannevirke"
			)
		),
		array(
			"regionName" => "South Island",
			"regionShort" => "SI",
			"regionSlug" => "south_island",
			"weight" => 1,
			"cities" => array(
				"Christchurch", "Dunedin", "Nelson", "Invercargill", "Blenheim", "Timaru", "Ashburton",
				"Oamaru", "Rangiora", "Queenstown", "Greymouth", "Gore", "Motueka", "Wanaka", "Alexandra",
				"Picton", "Balclutha", "Temuka", "Westport"
			)
		)
	);

	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
