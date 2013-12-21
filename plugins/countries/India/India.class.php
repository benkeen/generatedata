<?php

/**
 * @package Countries
 *
 * @author Fareez Ahamed <fareez.ahamed@gmail.com>
 */

class Country_India extends CountryPlugin {
	protected $countryName = "India";
	protected $countrySlug = "india";
	protected $regionNames = "Indian States / Union Territories";
	protected $continent = "asia";

	protected $extendedData = array(
		"zipFormat" => array(
			"format" => "Xxxxxx",
			"replacements" => array(
				"X" => "123456789",
				"x" => "0123456789"
			)
		),
 		"phoneFormat" => array(
			"displayFormats" => array(
				"0xxxxxxxxxx",
				"+91 ",
				"04xx xxx xxx"
			)
		)
	);

	protected $countryData = array(
		array(
			"regionName" => "Andhra Pradesh",
			"regionShort" => "AP",
			"regionSlug" => "andhra_pradesh",
			"weight" => 1,
			"cities" => array(
				"Adoni","Anantapur","Bhimavaram","Chittoor","Cuddapah","Eluru","Gudivada",
				"Guntakal","Guntur","Hindupur","Hyderabad","Kakinada","Karimnagar","Khammam",
				"Kukatpalle","Kurnool","Lalbahadur Nagar","Machilipatnam",
				"Mahbubnagar","Malkajgiri","Nandyal","Nellore","Nizamabad","Ongole",
				"Proddatur","Qutubullapur","Rajahmundry","Ramagundam","Secunderabad",
				"Tenali","Tirupati","Vijayawada","Vishakhapatnam","Vizianagaram","Warangal"
			)
		),
		array(
			"regionName" => "Arunachal Pradesh",
			"regionShort" => "AR",
			"regionSlug" => "arunachal_pradesh",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Assam",
			"regionShort" => "AS",
			"regionSlug" => "assam",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Bihar",
			"regionShort" => "BR",
			"regionSlug" => "bihar",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Chhattisgarh",
			"regionShort" => "CT",
			"regionSlug" => "chhattisgarh",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Goa",
			"regionShort" => "GA",
			"regionSlug" => "goa",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Gujarat",
			"regionShort" => "GJ",
			"regionSlug" => "gujarat",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Haryana",
			"regionShort" => "HR",
			"regionSlug" => "haryana",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Himachal Pradesh",
			"regionShort" => "HP",
			"regionSlug" => "himachal_pradesh",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Jammu and Kashmir",
			"regionShort" => "JK",
			"regionSlug" => "jammu_and_kashmir",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Jharkhand",
			"regionShort" => "JH",
			"regionSlug" => "jharkhand",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Karnataka",
			"regionShort" => "KA",
			"regionSlug" => "karnataka",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Kerala",
			"regionShort" => "KL",
			"regionSlug" => "kerala",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Madhya Pradesh",
			"regionShort" => "MP",
			"regionSlug" => "madhya_pradesh",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Maharastra",
			"regionShort" => "MH",
			"regionSlug" => "maharastra",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Manipur",
			"regionShort" => "MN",
			"regionSlug" => "manipur",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Meghalaya",
			"regionShort" => "ML",
			"regionSlug" => "meghalaya",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Mizoram",
			"regionShort" => "MZ",
			"regionSlug" => "mizoram",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Nagaland",
			"regionShort" => "NL",
			"regionSlug" => "nagaland",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Odisha",
			"regionShort" => "OR",
			"regionSlug" => "odisha",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Punjab",
			"regionShort" => "PB",
			"regionSlug" => "punjab",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Rajasthan",
			"regionShort" => "RJ",
			"regionSlug" => "rajasthan",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Sikkim",
			"regionShort" => "SK",
			"regionSlug" => "sikkim",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Tamil Nadu",
			"regionShort" => "TN",
			"regionSlug" => "Tamil Nadu",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Tripura",
			"regionShort" => "TR",
			"regionSlug" => "tripura",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Uttar Pradesh",
			"regionShort" => "UP",
			"regionSlug" => "uttar_pradesh",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Uttarakhand",
			"regionShort" => "UT",
			"regionSlug" => "uttarakhand",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "West Bengal",
			"regionShort" => "WB",
			"regionSlug" => "west_bengal",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		//Union Territories
		array(
			"regionName" => "Andaman and Nicobar Islands",
			"regionShort" => "AN",
			"regionSlug" => "andaman_and_nicobar_islands",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Chandigarh",
			"regionShort" => "CH",
			"regionSlug" => "Chandigarh",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Dadra and Nagar Haveli",
			"regionShort" => "DN",
			"regionSlug" => "dadra_and_nagar_haveli",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Daman and Diu",
			"regionShort" => "DD",
			"regionSlug" => "Daman and Diu",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Lakshadweep",
			"regionShort" => "LD",
			"regionSlug" => "lakshadweep",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Delhi",
			"regionShort" => "DL",
			"regionSlug" => "delhi",
			"weight" => 1,
			"cities" => array(
				
			)
		),
		array(
			"regionName" => "Pondicherry",
			"regionShort" => "PY",
			"regionSlug" => "pondicherry",
			"weight" => 1,
			"cities" => array(
				
			)
		)
	);


	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
