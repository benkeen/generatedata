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
				"+91 xxxxxxxxxx"
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
				"Itanagar"
			)
		),
		array(
			"regionName" => "Assam",
			"regionShort" => "AS",
			"regionSlug" => "assam",
			"weight" => 1,
			"cities" => array(
				"Guwahati","Dibrugarh","Silchar","Nagaon",
			)
		),
		array(
			"regionName" => "Bihar",
			"regionShort" => "BR",
			"regionSlug" => "bihar",
			"weight" => 1,
			"cities" => array(
				"Patna","Gaya","Bhagalpur","Muzaffarpur","Darbhanga","Bihar Sharif",
				"Arrah","Katihar","Munger","Chapra","Sasaram","Dehri","Bettiah"
			)
		),
		array(
			"regionName" => "Chhattisgarh",
			"regionShort" => "CT",
			"regionSlug" => "chhattisgarh",
			"weight" => 1,
			"cities" => array(
				"name","Raipur","Bhilai","Bilaspur","Durg","Raj Nandgaon","Korba","Raigarh"
			)
		),
		array(
			"regionName" => "Goa",
			"regionShort" => "GA",
			"regionSlug" => "goa",
			"weight" => 1,
			"cities" => array(
				"Panjim"
			)
		),
		array(
			"regionName" => "Gujarat",
			"regionShort" => "GJ",
			"regionSlug" => "gujarat",
			"weight" => 1,
			"cities" => array(
				"Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar","Nadiad",
				"Bharuch","Junagadh","Navsari","Gandhinagar","Veraval","Porbandar","Anand",
				"Surendranagar","Gandhidham","Bhuj","Godhra","Patan","Morvi","Vejalpur"
			)
		),
		array(
			"regionName" => "Haryana",
			"regionShort" => "HR",
			"regionSlug" => "haryana",
			"weight" => 1,
			"cities" => array(
				"Ambala","Ambala Sadar","Bhiwani","Faridabad","Gurgaon","Hisar","Karnal",
				"Panipat","Rohtak","Sirsa","Sonipat","Yamuna Nagar"
			)
		),
		array(
			"regionName" => "Himachal Pradesh",
			"regionShort" => "HP",
			"regionSlug" => "himachal_pradesh",
			"weight" => 1,
			"cities" => array(
				"Shimla"
			)
		),
		array(
			"regionName" => "Jammu and Kashmir",
			"regionShort" => "JK",
			"regionSlug" => "jammu_and_kashmir",
			"weight" => 1,
			"cities" => array(
				"Jammu", "Srinagar"
			)
		),
		array(
			"regionName" => "Jharkhand",
			"regionShort" => "JH",
			"regionSlug" => "jharkhand",
			"weight" => 1,
			"cities" => array(
				"Bokaro Steel City","Dhanbad","Hazaribag","Jamshedpur","Mango","Purnea",
				"Purulia","Ranchi"
			)
		),
		array(
			"regionName" => "Karnataka",
			"regionShort" => "KA",
			"regionSlug" => "karnataka",
			"weight" => 1,
			"cities" => array(
				"Bangalore","Belgaum","Bellary","Bidar","Bijapur","Davangere","Gadag Betigeri",
				"Gulbarga","Hassan","Hospet","Hubli","Mandya","Mangalore","Mysore","Raichur",
				"Shimoga","Timkur"
			)
		),
		array(
			"regionName" => "Kerala",
			"regionShort" => "KL",
			"regionSlug" => "kerala",
			"weight" => 1,
			"cities" => array(
				"Allappuzha","Kozhikode","Cochin","Kollam","Palakkad","Thalassery","Trivandrum"
			)
		),
		array(
			"regionName" => "Madhya Pradesh",
			"regionShort" => "MP",
			"regionSlug" => "madhya_pradesh",
			"weight" => 1,
			"cities" => array(
				"Bhind","Bhopal","Burhanpur","Chhindwara","Damoh","Dewas","Guna","Gwalior",
				"Indore","Jabalpur","Khandwa","Mandasor","Morena","Murwara","Ratlam","Rewa",
				"Sagar","Satna","Shivapuri","Ujjain","Vidisha"
			)
		),
		array(
			"regionName" => "Maharastra",
			"regionShort" => "MH",
			"regionSlug" => "maharastra",
			"weight" => 1,
			"cities" => array(
				"Achalpur","Ahmadnagar","Akola","Amravati","Bhir","Bhiwandi","Bhusawal",
				"Chandrapur","Dhule","Gondiya","Ichalkaranji","Jalgaon","Jalna","Kalyan",
				"Kolhapur","Latur","Malegaon","Mira Bhayandar","Miraj","Mumbai","Nagpur",
				"Nanded","Nashik","New Bombay","Parbhani","Pimpri-Chinchwad","Pune","Sangli",
				"Satara","Aurangabad","Solapur","Thane","Ulhasnagar","Wardha","Yeotmal"
			)
		),
		array(
			"regionName" => "Manipur",
			"regionShort" => "MN",
			"regionSlug" => "manipur",
			"weight" => 1,
			"cities" => array(
				"Imphal"
			)
		),
		array(
			"regionName" => "Meghalaya",
			"regionShort" => "ML",
			"regionSlug" => "meghalaya",
			"weight" => 1,
			"cities" => array(
				"Shillong"
			)
		),
		array(
			"regionName" => "Mizoram",
			"regionShort" => "MZ",
			"regionSlug" => "mizoram",
			"weight" => 1,
			"cities" => array(
				"Aizwal"
			)
		),
		array(
			"regionName" => "Nagaland",
			"regionShort" => "NL",
			"regionSlug" => "nagaland",
			"weight" => 1,
			"cities" => array(
				"Kohima"
			)
		),
		array(
			"regionName" => "Odisha",
			"regionShort" => "OR",
			"regionSlug" => "odisha",
			"weight" => 1,
			"cities" => array(
				"Bhubaneswar","Brahmapur","Cuttack","Puri","Raurkela","Raurkela Civil Township","Sambalpur"
			)
		),
		array(
			"regionName" => "Punjab",
			"regionShort" => "PB",
			"regionSlug" => "punjab",
			"weight" => 1,
			"cities" => array(
				"Abohar","Ahmadpur East","Amritsar","Bahawalnagar","Bahawalpur","Bhatinda","Chiniot",
				"Chishtian Mandi","Daska","Dera Ghazi Khan","Faisalabad","Gojra","Gujranwala","Gujrat",
				"Hafizabad","Hoshiarpur","Jalandhar (Jullundur)","Jaranwala","Jhang","Jhelum","Kamalia",
				"Kamoke","Kasur","Khanewal","Khanpur","Lahore","Ludhiana","Mandi Bahauddin","Mandi Burewala",
				"Moga","Multan","Muridke","Muzaffargarh","Okara","Pak Pattan","Pathankot","Patiala",
				"Rahim Yar Khan","Rawalpindi","Sadiqabad","Sahiwal","Sargodha","Sheikhupura","Sialkot",
				"Vihari","Wah","Wazirabad"
			)
		),
		array(
			"regionName" => "Rajasthan",
			"regionShort" => "RJ",
			"regionSlug" => "rajasthan",
			"weight" => 1,
			"cities" => array(
				"Ajmer","Alwar","Beawar","Bharatpur","Bhilwara","Bikaner","Ganganagar",
				"Jaipur","Jodhpur","Kota","Pali","Sikar","Tonk","Udaipur"	
			)
		),
		array(
			"regionName" => "Sikkim",
			"regionShort" => "SK",
			"regionSlug" => "sikkim",
			"weight" => 1,
			"cities" => array(
				"Gangtok"
			)
		),
		array(
			"regionName" => "Tamil Nadu",
			"regionShort" => "TN",
			"regionSlug" => "Tamil Nadu",
			"weight" => 1,
			"cities" => array(
				"Alandur","Ambattur","Avadi","Chennai","Coimbatore","Cuddalore","Dindigul","Erode",
				"Kanchipuram","Kumbakonam","Madurai","Nagarcoil","Neyveli","Palayankottai","Pallavaram",
				"Pudukkottai","Rajapalaiyam","Salem","Tambaram","Thanjavur","Tiruchirapalli",
				"Tirunelveli","Tiruppur","Tiruvannamalai","Tiruvarur","Tiruvottiyur","Tuticorin",
				"Valparai","Vellore"
			)
		),
		array(
			"regionName" => "Tripura",
			"regionShort" => "TR",
			"regionSlug" => "tripura",
			"weight" => 1,
			"cities" => array(
				"Agartala"	
			)
		),
		array(
			"regionName" => "Uttar Pradesh",
			"regionShort" => "UP",
			"regionSlug" => "uttar_pradesh",
			"weight" => 1,
			"cities" => array(
				"Agra","Aligarh","Allahabad","Amroha","Bahraich","Banda","Bareilly","Budaun",
				"Bulandshahr","Etawah","Faizabad","Farrukhabad-cum-Fatehgarh","Fatehpur","Firozabad",
				"Ghaziabad","Gonda","Gorakhpur","Hapur","Hathras","Jaunpur","Jhansi","Kanpur",
				"Kanpur Cantonment","Lucknow","Mathura","Maunath Bhanjan","Meerut",
				"Meerut Cantonment","Mirzapur-cum-Vindhyachal","Modinagar","Moradabad",
				"Muzaffarnagar","Noida","Orai","Pilibhit","Rae Bareli","Rampur","Saharanpur",
				"Sambhal","Shahjahanpur","Sitapur","Unnao","Varanasi"
			)
		),
		array(
			"regionName" => "Uttarakhand",
			"regionShort" => "UT",
			"regionSlug" => "uttarakhand",
			"weight" => 1,
			"cities" => array(
				"Dehradun", "Haridwar"
			)
		),
		array(
			"regionName" => "West Bengal",
			"regionShort" => "WB",
			"regionSlug" => "west_bengal",
			"weight" => 1,
			"cities" => array(
				"Asansol","Ashoknagar-Kalyangarh","Baidyabati","Bally","Balurghat","Bankura",
				"Bansberia","Barahanagar","Barasat","Barddhaman","Barrackpur","Basirhat",
				"Berhampore","Bhatpara","Burnpur","Kolkata","Champdani","Chandannagar","Dabgram",
				"Durgapur","Habra","Haldia","Halisahar","Howrah","Hugli-Chinsurah","Ingraj Bazar",
				"Kamarhati","Kanchrapara","Kharagpur","Krishnanagar","Kulti-Barakar","Midnapore",
				"Naihati","Navadwip","North Barrackpur","North Dum Dum","Panihati","Raiganj",
				"Rishra","Santipur","Serampore","Siliguri","South Dum Dum","Titagarh","Uluberia",
				"Uttarpara-Kotrung"
			)
		),
		//Union Territories
		array(
			"regionName" => "Andaman and Nicobar Islands",
			"regionShort" => "AN",
			"regionSlug" => "andaman_and_nicobar_islands",
			"weight" => 1,
			"cities" => array(
				"Port Blair"
			)
		),
		array(
			"regionName" => "Chandigarh",
			"regionShort" => "CH",
			"regionSlug" => "Chandigarh",
			"weight" => 1,
			"cities" => array(
				"Chandigarh"
			)
		),
		array(
			"regionName" => "Dadra and Nagar Haveli",
			"regionShort" => "DN",
			"regionSlug" => "dadra_and_nagar_haveli",
			"weight" => 1,
			"cities" => array(
				"Silvassa"
			)
		),
		array(
			"regionName" => "Daman and Diu",
			"regionShort" => "DD",
			"regionSlug" => "Daman and Diu",
			"weight" => 1,
			"cities" => array(
				"Daman"
			)
		),
		array(
			"regionName" => "Lakshadweep",
			"regionShort" => "LD",
			"regionSlug" => "lakshadweep",
			"weight" => 1,
			"cities" => array(
				"Kavaratti"
			)
		),
		array(
			"regionName" => "Delhi",
			"regionShort" => "DL",
			"regionSlug" => "delhi",
			"weight" => 1,
			"cities" => array(
				"Delhi"
			)
		),
		array(
			"regionName" => "Pondicherry",
			"regionShort" => "PY",
			"regionSlug" => "pondicherry",
			"weight" => 1,
			"cities" => array(
				"Pondicherry"
			)
		)
	);


	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
