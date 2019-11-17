<?php

/**
 * @package Countries
 *
 * @author Fareez Ahamed <fareez.ahamed@gmail.com>
 */

class Country_Pakistan extends CountryPlugin {
	protected $countryName = "Pakistan";
	protected $countrySlug = "pakistan";
	protected $regionNames = "South Asia"; //Union Territories
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
				"+92 xxxxxxxxx",
				"0xx-xxxxxxx",
				"0xxx-xxxxxxx",
			)
		)
	);

	protected $countryData = array(
		array(
			"regionName" => "Punjab",
			"regionShort" => "PU",
			"regionSlug" => "sindh",
			"weight" => 30,
			"cities" => array(
				"Attock","Bahawalnagar","Bahawalpur","Bhakkar","Chakwal","Chiniot","Dera Ghazi Khan","Faisalabad","Gujranwala","Hafizabad","Jhang","Jhelum","Kasur","Khanewal","Khushab","Lahore","Lodhran","Mandi Bahauddin","Mianwali","Multan","Murree","Muzaffargarh","Nankana Sahib","Narowal","Okara","Pakpatan","Rahimyar Khan","Rajanpur","Rawalpindi","Sahiwal","Sargodha","Sheikhupura","Sialkot","Toba Tek Singh","Vehari"
			)
		),
		array(
			"regionName" => "Sindh",
			"regionShort" => "SI",
			"regionSlug" => "sindh",
			"weight" => 25,
			"cities" => array(
				"Badin","Dadu","Ghotki","Hyderabad","Jacobabad","Jamshoro","Karachi","Kashmore","Khairpur","Larkana","Matiari","Naushahro Firoze","Qambar Shahdadkot","Sanghar","Shaheed Benazirabad","Shikarpur","Sujawal","Sukkur","Tando Allahyar","Tando Muhammad Khan","Tharparkar","Thatta","Umerkot"
			)
		),
		array(
			"regionName" => "Balochistan",
			"regionShort" => "BL",
			"regionSlug" => "balochistan",
			"weight" => 20,
			"cities" => array(
				"Awaran","Barkhan","Chagai","Dera Bugti","Gwadar","Harnai","Jafarabad","Kacchi","Kalat","Kech","Kharan","Khuzdar","Killa Abdullah","Killa Saifullah","Kohlu","Lasbela","Lehri","Loralai","Mastung","Musakhel","Nasirabad","Nushki","Panjgur","Pishin Valley","Quetta","Sherani","Sibi","Sohbatpur","Washuk","Zhob","Ziarat",
			)
		),
		array(
			"regionName" => "Khyber Pakhtoonkhwa",
			"regionShort" => "KPK",
			"regionSlug" => "khyber_pakhtoonkhwa",
			"weight" => 20,
			"cities" => array(
				"Abbottabad","Bannu","Battagram","Buner","Charsadda","Chitral","Dera Ismail Khan","Dir","Hangu","Haripur","Karak","Kohat","Kohistan","Lakki Marwat","Malakand","Mansehra","Mardan","Nowshera","Peshawar","Shangla","Swabi","Swat","Tank","Torghar"
			)
		),
		array(
			"regionName" => "Gilgit Baltistan",
			"regionShort" => "GB",
			"regionSlug" => "gilgit_baltistan",
			"weight" => 15,
			"cities" => array(
				"Astore","Diamer","Ghanche","Ghizer","Gilgit","Gojal Upper Hunza","Kharmang","Nagar","Shigar","Skardu"
			)
		),
		array(
			"regionName" => "Azad Kashmir",
			"regionShort" => "AK",
			"regionSlug" => "azad_kashmir",
			"weight" => 10,
			"cities" => array(
				"Bagh","Bhimber","Hattian Bala","Haveli","Kotli","Mirpur","Muzzafarabad","Neelum Valley","Rawalakot","Sudhanoti"
			)
		),
		array(
			"regionName" => "FATA",
			"regionShort" => "FA",
			"regionSlug" => "fata",
			"weight" => 5,
			"cities" => array(
				"Bajaur Agency","Khyber Agency","Kurram Agency","Mohmand Agency","North Waziristan"
			)
		)
	);


	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
