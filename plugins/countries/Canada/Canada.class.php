<?php

/**
 * @package Countries
 */

class Country_Canada extends CountryPlugin {
	protected $countryName = "Canada";
	protected $countrySlug = "canada";
	protected $regionNames = "Provinces";
	protected $zipFormat = array(
		"format" => "AXC XDX",
		"replacements" => array(
			"A" => "ABCEGHJKLMNPRSTVXY",
			"X" => "123456789",
			"C" => "ABCEGHJKLMNPRSTVWXYZ",
			"D" => "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		)
	);
	protected $zipFormatAdvanced = true;

	protected $continent = "north_america";

	public function install() {
		$data = array(
			array(
				"regionName" => "Alberta",
				"regionShort" => "AB",
				"regionSlug" => "alberta",
				"weight" => "11",
				"cities" => array(
					"Airdrie", "Alix", "Banff", "Barrhead", "Bearberry", "Beaumont", "Bon Accord", "Bonnyville",
					"Bonnyville Municipal District", "Bowden", "Breton", "Bruderheim", "Calgary", "Calmar", "Camrose",
					"Canmore", "Carstairs", "Castor", "Chestermere", "Clearwater Municipal District", "Coaldale", "Coalhurst",
					"Cochrane", "Crowsnest Pass", "Crystal Springs", "Devon", "Drayton Valley", "Drumheller", "Eckville",
					"Edmonton", "Fahler", "Fort Saskatchewan", "Gibbons", "Glendon", "Grande Prairie", "Grande Cache",
					"High Level", "Hines Creek", "Innisfail", "Irricana", "Jasper", "Kitscoty", "Lac La Biche County",
					"Lac Ste. Anne", "Lacombe", "Lacombe County", "Lakeland County", "Lamont", "Leduc", "Legal", "Lloydminster",
					"Lethbridge", "Mayerthorpe", "Medicine Hat", "Millet", "Morinville", "Mundare", "Nanton", "New Sarepta",
					"Okotoks", "Oyen", "Provost", "Parkland County", "Penhold", "Picture Butte", "Pincher Creek", "Ponoka",
					"Raymond", "Red Deer", "Redwater", "Rimbey", "Rocky Mountain House", "Rocky View", "Rycroft", "St. Albert",
					"St. Paul", "Sedgewick", "Smoky Lake", "Spruce Grove", "Stirling", "Strathcona County", "Stony Plain", "Sundrie",
					"Sunset Point", "Swan Hills", "Sylvan Lake", "Taber", "Tofield", "Trochu", "Valleyview", "Vegreville", "Vilna",
					"Wabamun", "Warburg", "Warspite", "Westlock", "Wetaskiwin", "Wood Buffalo", "Woodlands County", "Yellowhead County"
				)
			),
			array(
				"regionName" => "British Columbia",
				"regionShort" => "BC",
				"regionSlug" => "british_columbia",
				"weight" => "13",
				"cities" => array(
					"100 Mile House", "Abbotsford", "Alert Bay", "Armstrong", "Belcarra", "Burnaby", "Burns Lake", "Cache Creek",
					"Cariboo Regional District", "Castlegar", "Chetwynd", "Chilliwack", "Coldstream", "Colwood", "Comox", "Coquitlam",
					"Cranbrook", "Dawson Creek", "Delta", "Fernie", "Duncan", "Fort St. John", "Fraser Lake", "Fraser-Fort George",
					"Gibsons", "Harrison Hot Springs", "Hope", "Houston", "Hudson's Hope", "Kelowna", "Kent", "Kimberly", "Kitimat",
					"Lake Cowichan", "Langford", "Langley", "Lions Bay", "Mission", "Maple Ridge", "Merritt", "Midway", "Nanaimo",
					"Nakusp", "Nelson", "New Westminster", "North Cowichan", "North Saanich", "North Vancouver", "Oliver",
					"Pemberton", "Penticton", "Pitt Meadows", "Port Alice", "Port Coquitlam", "Port Moody", "Prince George",
					"Qualicum Beach", "Richmond", "Salt Spring Island", "Silverton", "Smithers", "Sooke", "Sparwood", "Stewart",
					"Sunshine Coast Regional District", "Surrey", "Terrance", "Tumbler Ridge", "Ucluelet", "Vancouver", "Vanderhoof",
					"Victoria", "West Vancouver", "White Rock", "Williams Lake"
				)
			),
			array(
				"regionName" => "Manitoba",
				"regionShort" => "MB",
				"regionSlug" => "manitoba",
				"weight" => "4",
				"cities" => array(
					'Winnipeg', 'Stonewall', 'Minitonas', 'Lourdes', 'Flin Flon', 'Daly', 'Brandon', 'Beausejour'
				)
			),
			array(
				"regionName" => "New Brunswick",
				"regionShort" => "NB",
				"regionSlug" => "new_brunswick",
				"weight" => "2",
				"cities" => array(
					'Tracadie-Shelia', 'Sh�diac', 'Shippagan', 'Saint-L�onard', 'Saint John', 'Saint Andr�', 'Rothesay', 'Rexton',
					'Quispamsis', 'Oromocto', 'New Maryland', 'Moncton', 'Miramichi', 'Grand Falls', 'Fredericton', 'Edmundston',
					'Dieppe', 'Clare', 'Carlton'
				)
			),
			array(
				"regionName" => "Newfoundland and Labrador",
				"regionShort" => "NL",
				"regionSlug" => "newfoundland_and_labrador",
				"weight" => "2",
				"cities" => array(
					'St. John\'s', 'Springdale', 'Spaniard\'s Bay', 'Rigolet', 'Paradise', 'Mount Pearl', 'McCallum', 'Marystown',
					'Harbour Grace', 'Glovertown', 'Gander', 'Fogo', 'Fortune', 'Carbonear', 'Burin', 'Bonavista', 'Bay Roberts'
				)
			),
			array(
				"regionName" => "Northwest Territories",
				"regionShort" => "NT",
				"regionSlug" => "northwest_territories",
				"weight" => "1",
				"cities" => array(
					"Yellowknife", "Wrigley", "Wha Ti", "Wekweti", "Tulita", "Tuktoyaktuk", "Tsiigehtchic", "Sachs Harbour",
					"Rae Lakes", "Rae-Edzo", "Paulatuk", "Norman Wells", "Lutsel K'e", "Kakisa", "Inuvik", "Holman", "Hay River",
					"Fort Smith", "Fort Simpson", "Fort Resolution", "Fort Providence", "Fort McPherson", "Fort Laird",
					"Fort Good Hope", "Enterprise", "Deline", "Coleville Lake", "Aklavik"
				)
			),
			array(
				"regionName" => "Nova Scotia",
				"regionShort" => "NS",
				"regionSlug" => "nova_scotia",
				"weight" => "1",
				"cities" => array(
					'Municipal District', 'Town of Yarmouth', 'Wolfville', 'Pugwash', 'Pictou', 'New Glasgow',
					'Halifax', 'Guysborough', 'Cumberland County', 'Cape Breton Island', 'Berwick', 'Baddeck', 'Argyle',
					'Annapolis Royal', 'Annapolis County'
				)
			),
			array(
				"regionName" => "Nunavut",
				"regionShort" => "NU",
				"regionSlug" => "nunavut",
				"weight" => "1",
				"cities" => array(
					"Arviat", "Cambridge Bay", "Gjoa Haven", "Pangnirtung", "Iqaluit"
				)
			),
			array(
				"regionName" => "Ontario",
				"regionShort" => "ON",
				"regionSlug" => "ontario",
				"weight" => "39",
				"cities" => array(
					"Ajax", "Aurora", "Ancaster Town", "Barrie", "Bath", "Blind River", "Burlington", "Caledon", "Cobourg",
					"Cornwall", "Cumberland", "East Gwillimbury", "Essex", "Etobicoke", "Gloucester", "Goderich", "Grey County",
					"Guelph", "Hamilton", "Hearst", "Kapuskasing", "Kawartha Lakes", "Kearny", "King Township", "Kingston",
					"Kitchener", "Lakeshore", "Lanark County", "LaSalle", "Leamington", "Malahide", "Markham",
					"Merrickville-Wolford", "Midlands", "Township of Minden Hills", "Minto", "Newbury", "Newmarket",
					"Norfolk County", "North Bay", "Northumberland", "Orangeville", "Orilla", "Osgoode", "Ottawa",
					"Ottawa-Carleton", "Owen Sound", "Oxford County", "Pickering", "Port Hope", "Quinte West", "Ramara",
					"Renfrew", "Richmond Hill", "Russell", "Scarborough", "St. Catharines", "St. Thomas", "Greater Sudbury",
					"Tay", "Thorold", "Thunder Bay", "Toronto", "Valley East", "Vanier", "Vaughan", "Warwick", "Welland",
					"Whitby", "Whitchurch-Stouffville", "Whitewater Region Township", "Wilmont", "Windsor", "Woodstock"
				)
			),
			array(
				"regionName" => "Prince Edward Island",
				"regionShort" => "PE",
				"regionSlug" => "prince_edward_island",
				"weight" => "1",
				"cities" => array(
					"Charlottetown", "Montague", "Stratford"
				)
			),
			array(
				"regionName" => "Quebec",
				"regionShort" => "QC",
				"regionSlug" => "quebec",
				"weight" => "23",
				"cities" => array(
					"Amqui", "Cabano", "D�gelis", "La Matap�dia", "Price", "Rimouski", "Rivi�re-du-Loup", "Saint-Eug�ne-de-Ladri�re",
					"Sainte-Flavie", "Alma", "Chambord", "Chicoutimi", "Jonqui�re", "La Baie", "Labrecque", "Saguenay", "Saint-Honor�",
					"Saint-Prime", "Shipshaw", "Baie-Saint-Paul", "Beauport", "Cap-Rouge", "Deschambault", "Isle-aux-Coudres", "Lac-Serent",
					"Malbaie", "Neuville", "Pointe-au-Pic", "Qu�bec City", "Saint-Hilarion", "Saint-Urbain", "Batiscan",
					"Cap-de-la-Madeleine", "Champlain", "H�rouxville", "Pointe-du-Lac", "Saint-Georges", "Shawinigan", "Trois-Rivi�res",
					"Asbestos", "Richmond", "Sherbrooke", "Valcourt", "Anjou", "Baie-d'Urf�", "Beaconsfield", "C�te-Saint-Luc",
					"Dollard-des-Ormeaux", "Dorval", "Hampstead", "Kirkland", "Lachine", "LaSalle", "Montreal", "Outremont", "Pierrefonds",
					"Pointe-aux-Trembles", "Pointe-Claire", "Roxboro", "Saint-Laurent", "Saint-L�onard", "Saint-Pierre", "Senneville",
					"Verdun", "Westmount", "Aylmer", "Buckingham", "Cantley", "Chelsea", "Collines-de-l'Outaouais", "Gatineau", "Hull",
					"Ville de Maniwaki", "Mansfield-et-Pontefract", "Montebello", "Montpellier", "Namur", "Notre-Dame-de-la-Salette",
					"Shawville", "Thurso", "Dubuisson", "Malartic", "Notre-Dame-du-Nord", "Rouyn-Noranda", "Saint-Eug�ne-de-Guigues",
					"Baie-Comeau", "Fermont", "Kawawachikamach", "Matagami", "Caplan", "Carleton", "Gasp�", "Gespeg", "Maria",
					"Murdochville", "Cap-Saint-Ignace", "Charny", "L�vis"
				)
			),
			array(
				"regionName" => "Saskatchewan",
				"regionShort" => "SK",
				"regionSlug" => "saskatchewan",
				"weight" => "4",
				"cities" => array(
					"Assiniboia", "Calder", "Canora", "Estevan", "Gravelbourg", "Hudson Bay", "Lang", "Langenburg", "Lloydminster",
					"Macklin", "Maple Creek", "Milestone", "Moose Jaw", "North Battleford", "Prince Albert", "Regina", "Saskatoon",
					"Weyburn", "Yorkton"
				)
			),
			array(
				"regionName" => "Yukon",
				"regionShort" => "YK",
				"regionSlug" => "yukon",
				"weight" => "1",
				"cities" => array(
					"Whitehorse", "Watson Lake"
				)
			)
		);

		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $data);
	}
}
