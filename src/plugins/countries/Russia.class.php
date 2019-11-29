<?php

/**
 * @package Countries
 */

// https://en.wikipedia.org/wiki/Category:Cities_and_towns_in_Russia_by_federal_subject
class Country_Russia extends CountryPlugin
{
	protected $continent = "europe";
	protected $countryName = "Russian Federation";
	protected $countrySlug = "RU";
	protected $regionNames = "Federal Subjects";

	// Federal Cities (3) = Moscow, Saint Petersburg, Sevastopol
	// Oblast (46)= Province or Region
	// Krai = Territory (Same as Oblast, but designation is historic)
	// Republic = Home to specific Ethinic Minorities

	protected $extendedData = array(
		// the general zip format for the country. This may be optionally overridden for each region if a more
		// specific format is desired. To prevent duplicate code, the replacements listed here cover ALL zip formats
		// for each province
		"zipFormat" => array(
			"format" => "%*****",
			"replacements" => array(
				"%" => "123456789",
				"*" => "0123456789",

				// used in individual federal subjects
				"-" => "01",	// (Kurgan, Ryazan, Tula) Oblast
				"&" => "012",   // Moscow City, (Pskov, Tver, Vologda, Orenburg, Penza, Vladimir, Yaroslavl) Oblast
				"+" => "0123",	// (Kirov, Novosibirsk, Saratov) Oblast
				"U" => "01234",	// (Kemerovo, Moscow, Sverdlovsk, Volgograd) Oblast
				"X" => "012345", // Moscow City
				"P" => "123",	// Bryansk Oblast
				"Z" => "23",	// (Oryol, Tambov, Ulyanovsk) Oblast
				")" => "34",	// (Sakhalin, Murmansk) Oblast
				"T" => "345",	// (Ivanovo, Novgorod) Oblast
				"^" => "3456",	// (Arkhangelsk, Samara) Oblast
				"Y" => "34567", // Nizhny Novgorod Oblast
				"S" => "456",	// (Astrakhan, Smolensk, Omsk, Tomsk) Oblast
				"R" => "4567",	// (Chelyabinsk, Rostov, Voronezh) Oblast
				"#" => "4569",	// Irkutsk Oblast
				"(" => "56",	// (Amur, Magadan) Oblast
				"Q" => "567",	// (Kursk, Tyumen) Oblast
				"V" => "67",	// Kostroma Oblast
				"?" => "678",	// Kalingrad Oblast
				"W" => "78",	// Leningrad Oblast
				"@" => "89",	// (Belgorod, Kaluga, Lipetsk) Oblast
			)
		),

		// the general phone format and area codes for the country
		// https://en.wikipedia.org/wiki/Telephone_numbers_in_Russia
		// https://www.itu.int/oth/T02020000AD/en
		"phoneFormat" => array(
			"areaCodes" => array(
				301, 		// Republic of Buryatia (Ulan – Ude)
				302, 		// Zabaykalsky Krai, Chita region together with the Agin-Buryat autonomous region (Chita)		
				336,		// Baikonur
				341, 		// Republic of Udmurtia (Izhevsk)
				342, 		// Perm Krai (Perm)
				343, 		// Sverdlovsk Oblast (Ekaterinburg)
				345, 		// Tyumen Oblast (Tyumen)
				346, 		// Khanty–Mansi Autonomous Okrug – Yugra (Surgut)
				347, 		// Republic of Bashkortostan (Ufa)
				349, 		// Yamalo-Nenets Autonomous Okrug (Salekhard)
				351, 		// Chelyabinsk Oblast (Chelyabinsk)
				352, 		// Kurgan Oblast (Kurgan)
				353, 		// Orenburg Oblast (Orenburg)
				365,		// Republic of Crimea* (Simferopol)
				381, 		// Omsk Oblast (Omsk)
				382, 		// Tomsk Oblast (Tomsk)
				383, 		// Novosibirsk Oblast (Novosibirsk)
				384, 		// Kemerovo Oblast (Kemerovo)
				385,		// Altai Krai (Barnaul)
				387, 		// Altai Krai
				388, 		// Altai Krai (Gorno-Altaisk)
				390, 		// Republic of Khakassia (Abakan)
				391, 		// Krasnoyarsk Krai in conjunction with the Evenk Oblast and Taimyr (Dolgan-Nenets) Oblast (Krasnoyarsk)
				394, 		// Republic of Tyva (Kyzyl)
				395, 		// Irkutsk Oblast (Irkutsk)
				401, 		// Kaliningrad Oblast (Kaliningrad)
				411, 		// Sakha Republic (Yakutia) (Yakutsk)
				413, 		// Magadan Oblast (Magadan)
				415, 		// Kamchatka Krai and Koryak autonomous region (Petropavlovsk-Kamchatsky)
				416, 		// Amur Oblast (Blagoveshchensk)
				421, 		// Khabarovsk Krai (Khabarovsk)
				423, 		// Primorsky Krai (Vladivostok)
				424, 		// Sakhalin Oblast (Yuzhno-Sakhalinsk)
				426, 		// Jewish Autonomous Oblast (Birobidzhan)
				427, 		// Chukotka Autonomous Okrug (Anadyr)
				471, 		// Kursk Oblast (Kursk)
				472, 		// Belgorod Oblast (Belgorod)
				473, 		// Voronezh Oblast (Voronezh)
				474, 		// Lipetsk Oblast (Lipetsk)
				475, 		// Tambov Oblast (Tambov)
				481, 		// Smolensk Oblast (Smolensk)
				482, 		// Tver Oblast (Tver)
				483, 		// Bryansk Oblast (Bryansk)
			 	484, 		// Kaluga Oblast
				485, 		// Yaroslavl Oblast (Yaroslavl)
				486, 		// Oryol Oblast (Orel)
				487, 		// Tula Oblast (Tula)
				491, 		// Ryazan Oblast (Ryazan)
				492, 		// Vladimir Oblast (Vladimir)
				493, 		// Ivanovo Oblast (Ivanovo)
				494, 		// Kostroma Oblast (Kostroma)
				495, 499, 	// Moscow City
				496, 498, 	// Moscow Oblast
				811, 		// Pskov Oblast (Pskov)
				812, 		// Saint Petersburg
				813, 820,	// Volgograd Oblast
				813, 		// Leningrad Oblast
				814, 		// Republic of Karelia (Petrozavodsk)
				815, 		// Murmansk Oblast (Murmansk)
				816, 		// Novgorod Oblast (Velikiy Novgorod)
				817,		// Vologda Oblast (Vologda)
				818, 		// Arkhangelsk Oblast (Arkhangelsk)
				821, 		// Komi Republic (Syktyvkar)
				831, 		// Nizhny Novgorod Oblast (Nizhny Novgorod)
				833, 		// Kirov Oblast (Kirov)
				834, 		// Republic of Mordovia (Saransk)
				835, 		// Republic of Chuvashia (Cheboksary)
				836, 		// Republic of Mari El (Yoshkar-Ola)
				841, 		// Penza Oblast (Penza)
				842, 		// Ulyanovsk Oblast (Ulyanovsk)
				843,		// Republic of Tatarstan (Kazan)
				844, 		// Volgograd Oblast (Volgograd)
				845, 		// Saratov Oblast (Saratov)
				846,	 	// Samara Oblast (Samara)
				847, 		// Republic of Kalmykia (Elista)
				848,		// Samara Oblast (Tolyatti)
				851, 		// Astrakhan Oblast (Astrakhan)
				855,		// Republic of Tatarstan (Naberezhnye Chelny)
				861,		// Krasnodar Krai (Krasnodar)
				862,		// Krasnodar Krai (Sochi)
				863, 		// Rostov Oblast (Rostov-on Don)
				865,		// Stavropol Krai (Stavropol)
				866, 		// Republic of Kabardino-Balkaria (Nalchik)
				867, 		// Republic of North Ossetia–Alania (Vladikavkaz)
				869,		// Sevastopol City
				871, 		// Republic of Chechnya (Grozny)
				872, 		// Republic of Dagestan (Makhachkala)
				873, 		// Republic of Ingushetia (Nazran)
				877,		// Republic of Adygea (Maikop)
				878, 		// Republic of Karachayevo-Cherkessia (Cherkessk)
				879,		// Stavropol Krai (Mineralnye Vody)
				900, 901, 902, 903, 904, 905, 906, 907, 908, 909,	// Mobile networks
				910, 911, 912, 913, 914, 915, 916, 917, 918, 919,	// Mobile networks
				920, 921, 922, 923, 924, 925, 926, 927, 928, 929,	// Mobile networks
				930, 931, 932, 933, 934, 935, 936, 937, 938, 939,	// Mobile networks
				940, 941, 942, 943, 944, 945, 946, 947, 948, 949,	// Mobile networks
				950, 951, 952, 953,      955, 956, 957, 958, 959,	// Mobile networks
				960, 961, 962, 963, 964, 965, 966, 967, 968, 969,	// Mobile networks
				          972, 973, 974, 975, 976, 977, 978, 979,	// Mobile networks
				980, 981, 982, 983, 984, 985, 986, 987, 988, 989,	// Mobile networks
				990, 991, 992, 993, 994, 995, 996, 997, 998, 999,	// Mobile networks
			),
			"displayFormats" => array(
				"(AAA) Xxx-xx-xx",
				"+7 AAAXxxxxxx",
				"+7 (AAA) Xxx-xx-xx", // Outside Russia use 7 as Country Calling Code
				"+7-AAA-Xxx-xx-xx"
			)
		)
	);

	// our country-wide data, with info separated into regions
	protected $countryData = array(
    /*
    array(
			"regionName" => "North Caucasian",
			"regionShort" => "NC",
			"regionSlug" => "north_caucasian",
			"weight" => 1,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Volga",
			"regionShort" => "VO",
			"regionSlug" => "volga",
			"weight" => 1,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Central",
			"regionShort" => "CE",
			"regionSlug" => "central",
			"weight" => 1,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Siberian",
			"regionShort" => "SI",
			"regionSlug" => "siberian",
			"weight" => 1,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Northwestern",
			"regionShort" => "NW",
			"regionSlug" => "northwestern",
			"weight" => 1,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Southern",
			"regionShort" => "SO",
			"regionSlug" => "southern",
			"weight" => 1,
			"cities" => array(

			)
		),
		array(
			"regionName" => "Ural",
			"regionShort" => "CE",
			"regionSlug" => "ural",
			"weight" => 1,
			"cities" => array(
				"Canberra"
			)
		)
    */
    
		// Federal Cities
		array(
			"regionName" => "Moscow City",
			"regionShort" => "Moscow",
			"regionSlug" => "moscow-city",
			"weight" => 11,
			"cities" => array(
				"Mosocw"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "1+X***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(495, 499)
				)
			)
		),
		array(
			"regionName" => "Saint Petersburg City",
			"regionShort" => "Saint Petersburg", // ISO 3166 code
			"regionSlug" => "saint_petersburg-city",
			"weight" => 11,
			"cities" => array(
				"Saint Petersburg"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "19****"
				),
				"phoneFormat" => array(
					"areaCodes" => array(812)
				)
			)
		),
		// TODO: Need zipFormat for Sevastopol City
		array(
			"regionName" => "Sevastopol City",
			"regionShort" => "Sevastopol", // ISO 3166 code
			"regionSlug" => "sevastopol-city",
			"weight" => 11,
			"cities" => array(
				"Sevastopol"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "%*****"
				),
				"phoneFormat" => array(
					"areaCodes" => array(869)
				)
			)
		),

		// Oblasts
		array(
			"regionName" => "Amur Oblast",
			"regionShort" => "AMU", // "RU-AMU", // ISO 3166 code
			"regionSlug" => "amur-oblast",
			"weight" => 50,
			"cities" => array(
				"Belogorsk", "Blagoveshchensk", "Raychikhinsk", "Shimanovsk", "Skovorodino", "Svobodny", "Tynda", "Zavitinsk",
				"Zeya"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "67(***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(416)
				)
			)
		),
		array(
			"regionName" => "Arkhangelsk Oblast",
			"regionShort" => "ARK", // "RU-ARK", // ISO 3166 code
			"regionSlug" => "arkhangelsk-oblast",
			"weight" => 50,
			"cities" => array(
				"Arkhangelsk", "Brin-Navolok", "Kargopol", "Koryazhma", "Kotlas", "Mezen", "Mirny", "Novodvinsk",
				"Nyandoma", "Onega", "Severodvinsk", "Shenkursk", "Solvychegodsk", "Velsk"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "16^***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(818)
				)
			)
		),
		array(
			"regionName" => "Astrakhan Oblast",
			"regionShort" => "AST", // "RU-AST", // ISO 3166 code
			"regionSlug" => "astrakhan-oblast",
			"weight" => 50,
			"cities" => array(
				"Astrakhan", "Akhtubinsk", "Kamyzyak", "Kharabali", "Narimanov", "Znamensk"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "41S***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(851)
				)
			)
		),
		array(
			"regionName" => "Belgorod Oblast",
			"regionShort" => "BEL", // "RU-BEL", // ISO 3166 code
			"regionSlug" => "belgorod-oblast",
			"weight" => 50,
			"cities" => array(
				"Alexeyevka", "Belgorod", "Biryuch", "Borisovka", "Grayvoron", "Gubkin", "Korocha", "Krasnaya Yaruga",
				"Novy Oskol", "Rakitnoye", "Shebekino", "Stary Oskol", "Stroitel", "Valuyki", "Volokonovka"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "30@***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(472)
				)
			)
		),
		array(
			"regionName" => "Bryansk Oblast",
			"regionShort" => "BRY", // "RU-BRY", // ISO 3166 code
			"regionSlug" => "bryansk-oblast",
			"weight" => 50,
			"cities" => array(
				"Bryansk", "Dyatkovo", "Fokino", "Karachev", "Klintsy", "Mglin", "Novozybkov", "Pochep",
				"Seltso", "Sevsk", "Starodub", "Surazh", "Trubchevsk", "Unecha", "Vialky", "Zhukovka",
				"Zlynka"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "24P***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(483)
				)
			)
		),
		array(
			"regionName" => "Chelyabinsk Oblast",
			"regionShort" => "CHE", // "RU-CHE", // ISO 3166 code
			"regionSlug" => "chelyabinsk-oblast",
			"weight" => 50,
			"cities" => array(
				"Asha", "Bakal", "Chelyabinsk", "Karabash", "Kartaly", "Kasli", "Katav-Ivanovsk", "Kopeysk",
				"Korkino", "Kusa", "Kyshtym", "Magnitogorsk", "Miass", "Minyar", "Nyazepetrovsk", "Ozyorsk",
				"Plast", "Satka", "Sim", "Snezhinsk", "Troitsk", "Tryokhgorny", "Ust-Katav", "Verkhneuralsk",
				"Verkhny Ufaley", "Yemanzhelinsk", "Yuryuzan", "Yurzhnouralsk", "Zlatoust"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "45R***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(351)
				)
			)
		),
		// TODO: Continue adding cities from here
		array(
			"regionName" => "Irkutsk Oblast",
			"regionShort" => "IRK", // "RU-IRK", // ISO 3166 code
			"regionSlug" => "irkutsk-oblast",
			"weight" => 50,
			"cities" => array("Irkutsk"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "66#***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(395)
				)
			)
		),
		array(
			"regionName" => "Ivanovo Oblast",
			"regionShort" => "IVA", // "RU-IVA", // ISO 3166 code
			"regionSlug" => "ivanovo-oblast",
			"weight" => 50,
			"cities" => array("Ivanovo"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "15T***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(493)
				)
			)
		),
		array(
			"regionName" => "Kaliningrad Oblast",
			"regionShort" => "KGD", // "RU-KGD", // ISO 3166 code
			"regionSlug" => "kaliningrad-oblast",
			"weight" => 50,
			"cities" => array("Kaliningrad"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "23?***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(401)
				)
			)
		),
		array(
			"regionName" => "Kaluga Oblast",
			"regionShort" => "KLU", // "RU-KLU", // ISO 3166 code
			"regionSlug" => "kaluga-oblast",
			"weight" => 50,
			"cities" => array("Kaluga"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "24@***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(484)
				)
			)
		),
		array(
			"regionName" => "Kemerovo Oblast",
			"regionShort" => "KEM", // "RU-KEM", // ISO 3166 code
			"regionSlug" => "kemerovo-oblast",
			"weight" => 50,
			"cities" => array("Kemerovo"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "65U***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(384)
				)
			)
		),
		array(
			"regionName" => "Kirov Oblast",
			"regionShort" => "KIR", // "RU-KIR", // ISO 3166 code
			"regionSlug" => "kirov-oblast",
			"weight" => 50,
			"cities" => array("Kirov"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "61+***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(833)
				)
			)
		),
		array(
			"regionName" => "Kostroma Oblast",
			"regionShort" => "KOS", // "RU-KOS", // ISO 3166 code
			"regionSlug" => "kostroma-oblast",
			"weight" => 50,
			"cities" => array("Kostroma"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "15V***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(494)
				)
			)
		),
		array(
			"regionName" => "Kurgan Oblast",
			"regionShort" => "KGN", // "RU-KGN", // ISO 3166 code
			"regionSlug" => "kurgan-oblast",
			"weight" => 50,
			"cities" => array("Kurgan"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "64-***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(352)
				)
			)
		),
		array(
			"regionName" => "Kursk Oblast",
			"regionShort" => "KRS", // "RU-KRS", // ISO 3166 code
			"regionSlug" => "kursk-oblast",
			"weight" => 50,
			"cities" => array("Kursk"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "30Q***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(471)
				)
			)
		),
		array(
			"regionName" => "Leningrad Oblast",
			"regionShort" => "LEN", // "RU-LEN", // ISO 3166 code
			"regionSlug" => "leningrad-oblast",
			"weight" => 50,
			"cities" => array("Gatchina", "Ivangorod"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "18W***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(813)
				)
			)
		),
		array(
			"regionName" => "Lipetsk Oblast",
			"regionShort" => "LIP", // "RU-LIP", // ISO 3166 code
			"regionSlug" => "lipetsk-oblast",
			"weight" => 50,
			"cities" => array("Lipetsk"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "39@***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(474)
				)
			)
		),
		array(
			"regionName" => "Magadan Oblast",
			"regionShort" => "MAG", // "RU-MAG", // ISO 3166 code
			"regionSlug" => "magadan-oblast",
			"weight" => 50,
			"cities" => array("Magadan"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "68(***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(413)
				)
			)
		),
		array(
			"regionName" => "Moscow Oblast",
			"regionShort" => "MOS", // "RU-MOS", // ISO 3166 code
			"regionSlug" => "moscow-oblast",
			"weight" => 11,

			// https://en.wikipedia.org/wiki/Category:Cities_and_towns_in_Moscow_Oblast
			"cities" => array(
				"Aprelevka", "Balashikha", "Bolshevo", "Bronnitsy", "Chekhov", "Chernogolovka", "Dedovsk", "Dmitrov",
				"Dolgoprudny", "Domodedovo", "Drezna", "Dubna", "Dzerzhinsky", "Elektrogorsk", "Elektrostal", "Elektrougli",
				"Fryazino", "Golitsyno", "Istra", "Ivanteyevka", "Kalininets", "Kashira", "Khimki", "Khotkovo",
				"Klimovsk", "Klin", "Kolomna", "Korolyov", "Kotelniki", "Krasnoarmeysk", "Krasnogorsk", "Krasnozavodsk",
				"Krasnoznamensk", "Kubinka", "Kurovskoye", "Likino-Dulyovo", "Lobnya", "Losino-Petrovsky", "Lukhovitsy", "Lytkarino",
				"Lyubertsy", "Mozhaysk", "Mytishchi", "Naro-Fominsk", "Noginsk", "Odintsovo", "Orekhovo-Zuyevo", "Ozherelye",
				"Ozyory", "Pavlovsky Posad", "Peresvet", "Podolsk", "Protvino", "Pushchino", "Pushkino", "Ramenskoye",
				"Reutov", "Roshal", "Ruza", "Sergiyev Posad", "Serpukhov", "Shatura", "Shchyolkovo", "Solnechnogorsk",
				"Staraya Kupavna", "Stupino", "Svitino", "Taldom", "Vereya", "Vidnoye", "Volokolamsk", "Voskresensk",
				"Vysokovsk", "Yakhroma", "Yegoryevsk", "Zaraysk", "Zhukovsky", "Zvenigorod"
			),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "14U***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(496, 498)
				)
			)
		),
		array(
			"regionName" => "Murmansk Oblast",
			"regionShort" => "MUR", // "RU-MUR", // ISO 3166 code
			"regionSlug" => "murmansk-oblast",
			"weight" => 50,
			"cities" => array("Murmansk"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "18)***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(815)
				)
			)
		),
		array(
			"regionName" => "Nizhny Novgorod Oblast",
			"regionShort" => "NIZ", // "RU-NIZ", // ISO 3166 code
			"regionSlug" => "nizhny_novgorod-oblast",
			"weight" => 50,
			"cities" => array("Nizhny"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "60Y***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(831)
				)
			)
		),
		array(
			"regionName" => "Novgorod Oblast",
			"regionShort" => "NGR", // "RU-NGR", // ISO 3166 code
			"regionSlug" => "novgorod-oblast",
			"weight" => 50,
			"cities" => array("Novgorod"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "17T***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(816)
				)
			)
		),
		array(
			"regionName" => "Novosibirsk Oblast",
			"regionShort" => "NVS", // "RU-NVS", // ISO 3166 code
			"regionSlug" => "novosibirsk-oblast",
			"weight" => 50,
			"cities" => array("Novosibirsk"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "63+***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(383)
				)
			)
		),
		array(
			"regionName" => "Omsk Oblast",
			"regionShort" => "OMS", // "RU-OMS", // ISO 3166 code
			"regionSlug" => "omsk-oblast",
			"weight" => 50,
			"cities" => array("Omsk"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "64S***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(381)
				)
			)
		),
		array(
			"regionName" => "Orenburg Oblast",
			"regionShort" => "ORE", // "RU-ORE", // ISO 3166 code
			"regionSlug" => "orenburg-oblast",
			"weight" => 50,
			"cities" => array("Orenburg"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "46&***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(353)
				)
			)
		),
		array(
			"regionName" => "Oryol Oblast",
			"regionShort" => "ORL", // "RU-ORL", // ISO 3166 code
			"regionSlug" => "oryol-oblast",
			"weight" => 50,
			"cities" => array("Oryol"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "30Z***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(486)
				)
			)
		),
		array(
			"regionName" => "Penza Oblast",
			"regionShort" => "PNZ", // "RU-PNZ", // ISO 3166 code
			"regionSlug" => "penza-oblast",
			"weight" => 50,
			"cities" => array("Penza"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "44&***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(841)
				)
			)
		),
		array(
			"regionName" => "Pskov Oblast",
			"regionShort" => "PSK", // "RU-PSK", // ISO 3166 code
			"regionSlug" => "pskov-oblast",
			"weight" => 50,
			"cities" => array("Pskov"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "18&***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(811)
				)
			)
		),
		array(
			"regionName" => "Rostov Oblast",
			"regionShort" => "ROS", // "RU-ROS", // ISO 3166 code
			"regionSlug" => "rostov-oblast",
			"weight" => 50,
			"cities" => array("Rostov"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "34R***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(863)
				)
			)
		),
		array(
			"regionName" => "Ryazan Oblast",
			"regionShort" => "RYA", // "RU-RYA", // ISO 3166 code
			"regionSlug" => "ryazan-oblast",
			"weight" => 50,
			"cities" => array("Ryazan"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "39-***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(491)
				)
			)
		),
		array(
			"regionName" => "Sakhalin Oblast",
			"regionShort" => "SAK", // "RU-SAK", // ISO 3166 code
			"regionSlug" => "sakhalin-oblast",
			"weight" => 50,
			"cities" => array("Sakhalin"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "69)***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(424)
				)
			)
		),
		array(
			"regionName" => "Samara Oblast",
			"regionShort" => "SAM", // "RU-SAM", // ISO 3166 code
			"regionSlug" => "samara-oblast",
			"weight" => 50,
			"cities" => array("Samara", "Tolyatti"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "44^***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(846, 848)
				)
			)
		),
		array(
			"regionName" => "Saratov Oblast",
			"regionShort" => "SAR", // "RU-SAR", // ISO 3166 code
			"regionSlug" => "saratov-oblast",
			"weight" => 50,
			"cities" => array("Saratov"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "41+***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(845)
				)
			)
		),
		array(
			"regionName" => "Smolensk Oblast",
			"regionShort" => "SMO", // "RU-SMO", // ISO 3166 code
			"regionSlug" => "smolensk-oblast",
			"weight" => 50,
			"cities" => array("Smolensk"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "21S***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(481)
				)
			)
		),
		array(
			"regionName" => "Sverdlovsk Oblast",
			"regionShort" => "SVE", // "RU-SVE", // ISO 3166 code
			"regionSlug" => "sverdlovsk-oblast",
			"weight" => 50,
			"cities" => array("Yekaterinburg"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "62U***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(343)
				)
			)
		),
		array(
			"regionName" => "Tambov Oblast",
			"regionShort" => "TAM", // "RU-TAM", // ISO 3166 code
			"regionSlug" => "tambov-oblast",
			"weight" => 50,
			"cities" => array("Tambov"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "39Z***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(475)
				)
			)
		),
		array(
			"regionName" => "Tomsk Oblast",
			"regionShort" => "TOM", // "RU-TOM", // ISO 3166 code
			"regionSlug" => "tomsk-oblast",
			"weight" => 50,
			"cities" => array("Tomsk"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "63S***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(382)
				)
			)
		),
		array(
			"regionName" => "Tver Oblast",
			"regionShort" => "TVE", // "RU-TVE", // ISO 3166 code
			"regionSlug" => "tver-oblast",
			"weight" => 50,
			"cities" => array("Tver"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "17&***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(482)
				)
			)
		),
		array(
			"regionName" => "Tula Oblast",
			"regionShort" => "TUL", // "RU-TUL", // ISO 3166 code
			"regionSlug" => "tula-oblast",
			"weight" => 50,
			"cities" => array("Tula"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "30-***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(487)
				)
			)
		),
		array(
			"regionName" => "Tyumen Oblast",
			"regionShort" => "TYU", // "RU-TYU", // ISO 3166 code
			"regionSlug" => "tyumen-oblast",
			"weight" => 50,
			"cities" => array("Tyumen"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "62Q***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(345)
				)
			)
		),
		array(
			"regionName" => "Ulyanovsk Oblast",
			"regionShort" => "ULY", // "RU-ULY", // ISO 3166 code
			"regionSlug" => "ulyanovsk-oblast",
			"weight" => 50,
			"cities" => array("Ulyanovsk"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "43Z***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(842)
				)
			)
		),
		array(
			"regionName" => "Vladimir Oblast",
			"regionShort" => "VLA", // "RU-VLA", // ISO 3166 code
			"regionSlug" => "vladimir-oblast",
			"weight" => 50,
			"cities" => array("Vladimir"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "60&***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(492)
				)
			)
		),
		array(
			"regionName" => "Volgograd Oblast",
			"regionShort" => "VGG", // "RU-VGG", // ISO 3166 code
			"regionSlug" => "volgograd-oblast",
			"weight" => 50,
			"cities" => array("Volgograd"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "40U***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(844)
				)
			)
		),
		array(
			"regionName" => "Vologda Oblast",
			"regionShort" => "VLG", // "RU-VLG", // ISO 3166 code
			"regionSlug" => "vologda-oblast",
			"weight" => 50,
			"cities" => array("Cherepovets", "Vologda"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "16&***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(817, 820)
				)
			)
		),
		array(
			"regionName" => "Voronezh Oblast",
			"regionShort" => "VOR", // "RU-VOR", // ISO 3166 code
			"regionSlug" => "voronezh-oblast",
			"weight" => 50,
			"cities" => array("Voronezh"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "39R****"
				),
				"phoneFormat" => array(
					"areaCodes" => array(473)
				)
			)
		),
		array(
			"regionName" => "Yaroslavl Oblast",
			"regionShort" => "YAR", // "RU-YAR", // ISO 3166 code
			"regionSlug" => "yaroslavl-oblast",
			"weight" => 50,
			"cities" => array("Yaroslavl"),
			"extendedData" => array(
				"zipFormat" => array(
					"format" => "15&***"
				),
				"phoneFormat" => array(
					"areaCodes" => array(485)
				)
			)
		),

		// TODO: Add Krais

		// TODO: Add republics
		
		// TODO: Add Autonomous Okrugs

		// TODO: Add Autonomous Oblast
	);

	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
