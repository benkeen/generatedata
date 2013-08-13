<?php

/**
 * @package Countries
 */

class Country_Germany extends CountryPlugin {
	protected $countryName = "Germany";
	protected $countrySlug = "germany";
	protected $regionNames = "German States";
	protected $continent = "europe";

	protected $extendedData = array(
		"zipFormat" => "xxxxx"
	);

	protected $countryData = array(
		array(
			"regionName" => "Baden",
			"regionShort" => "BW",
			"regionSlug" => "baden",
			"weight" => 301,
			"cities" => array(
				"Stuttgart", "Mannheim", "Karlsruhe", "Freiburg", "Heidelberg", "Heilbronn", "Ulm", "Pforzheim", "Reutlingen",
				"Esslingen", "T�bingen", "Ludwigsburg", "Konstanz", "Villingen-Schwennin", "Aalen", "Sindelfingen", "Schw�bisch Gm�nd",
				"Friedrichshafen", "Offenburg", "G�ppingen", "Baden-Baden", "Waiblingen", "Ravensburg", "L�rrach", "Heidenheim",
				"Rastatt", "B�blingen"
			)
		),
		array(
			"regionName" => "Bavaria",
			"regionShort" => "BY",
			"regionSlug" => "bavaria",
			"weight" => 178,
			"cities" => array(
				"Munich", "Nuremberg", "Augsburg", "Regensburg", "W�rzburg", "Ingolstadt", "F�rth", "Erlangen",
				"Bayreuth", "Bamberg", "Aschaffenburg", "Landshut", "Kempten", "Rosenheim", "Neu-Ulm", "Schweinfurt",
				"Passau", "Hof", "Freising", "Straubing"
			)
		),
		array(
			"regionName" => "Berlin",
			"regionShort" => "BE",
			"regionSlug" => "berlin",
			"weight" => 3890,
			"cities" => array(
				"Berlin"
			)
		),
		array(
			"regionName" => "Brandenburg",
			"regionShort" => "BB",
			"regionSlug" => "brandenburg",
			"weight" => 85,
			"cities" => array(
				"Potsdam", "Cottbus", "Brandenburg", "Frankfurt", "Oranienburg", "Falkensee", "Eberswalde-Finow",
				"Bernau", "K�nigs Wusterhausen", "Schwedt", "F�rstenwalde", "Neuruppin", "Eisenh�ttenstadt", "Senftenberg",
				"Strausberg", "Hennigsdorf", "Blankenfelde-Mahlow", "Rathenow", "Hohen Neuendorf", "Ludwigsfelde", "Spremberg",
				"Werder", "Teltow", "Wandlitz", "Luckenwalde", "Forst", "Kleinmachnow", "Prenzlau", "Panketal", "Guben"
			)
		),
		array(
			"regionName" => "Bremen",
			"regionShort" => "HB",
			"regionSlug" => "bremen",
			"weight" => 1577,
			"cities" => array(
				"Bremen", "Bremerhaven"
			)
		),
		array(
			"regionName" => "Hamburg",
			"regionShort" => "HH",
			"regionSlug" => "hamburg",
			"weight" => 2368,
			"cities" => array(
				"Hamburg"
			)
		),
		array(
			"regionName" => "Hesse",
			"regionShort" => "HE",
			"regionSlug" => "hesse",
			"weight" => 287,
			"cities" => array(
				"Frankfurt am Main", "Wiesbaden", "Kassel", "Darmstadt", "Offenbach am Main", "Hanau", "Marburg", "Gie�en", "Fulda",
				"R�sselsheim", "Wetzlar", "Bad Homburg v. d. H�he", "Rodgau", "Oberursel", "Dreieich", "Maintal", "Bensheim",
				"Hofheim am Taunus", "Neu-Isenburg", "Langen", "Limburg a.d. Lahn", "Dietzenbach", "Lampertheim", "M�rfelden-Walldorf",
				"Viernheim", "Bad Hersfeld", "Bad Nauheim", "Taunusstein", "Baunatal", "Kelkheim", "Bad Vilbel", "Friedberg",
				"M�hlheim am Main", "R�dermark", "Heppenheim", "Dillenburg", "Pfungstadt", "Hattersheim am Main", "Butzbach",
				"Friedrichsdorf", "Obertshausen", "Korbach", "Griesheim", "Gro�-Gerau", "Weiterstadt", "Eschwege"
			)
		),
		array(
			"regionName" => "Lower Saxony",
			"regionShort" => "NI",
			"regionSlug" => "lower_saxony",
			"weight" => 166,
			"cities" => array(
				"Hannover", "Braunschweig", "Osnabr�ck", "Oldenburg", "Wolfsburg", "G�ttingen", "Hildesheim", "Salzgitter", "Wilhelmshaven",
				"Delmenhorst", "L�neburg", "Celle", "Garbsen", "Hameln", "Wolfenb�ttel", "Nordhorn", "Langenhagen", "Emden", "Lingen",
				"Cuxhaven", "Peine", "Stade", "Melle", "Neustadt am R�benberge", "Lehrte", "Seevetal", "Gifhorn", "Wunstorf", "Goslar"
			)
		),
		array(
			"regionName" => "Mecklenburg-Vorpommern",
			"regionShort" => "MV",
			"regionSlug" => "meckleburg",
			"weight" => 71,
			"cities" => array(
				"Anklam", "Bergen", "Greifswald", "G�strow", "Neubrandenburg", "Neustrelitz", "Parchim	City", "Ribnitz-Damgarten",
				"Rostock", "Schwerin", "Stralsund", "Waren", "Wismar"
			)
		),
		array(
			"regionName" => "North Rhine-Westphalia",
			"regionShort" => "NW",
			"regionSlug" => "westphalia",
			"weight" => 523,
			"cities" => array(
				"K�ln", "D�sseldorf", "Dortmund", "Essen", "Duisburg", "Bochum", "Wuppertal", "Bonn", "Bielefeld", "M�nster", "Aachen",
				"M�nchengladbach", "Gelsenkirchen", "Krefeld", "Oberhausen", "Hagen", "Hamm", "M�lheim", "Herne", "Leverkusen", "Solingen",
				"Neuss", "Paderborn", "Recklinghausen", "Bottrop", "Remscheid", "Bergisch Gladbach"
			)
		),
		array(
			"regionName" => "Rhineland-Palatinate",
			"regionShort" => "RP",
			"regionSlug" => "rhineland",
			"weight" => 202,
			"cities" => array(
				"Mainz", "Ludwigshafen", "Koblenz", "Trier", "Kaiserslauter", "Worms", "Neuwied", "Neustadt", "Speyer", "Frankenthal",
				"Bad Kreuznach", "Landau", "Pirmasens", "Zweibr�cken", "Idar-Oberstei", "Andernach", "Bad Neuenahr-Ahrweiler",
				"Bingen", "Ingelheim", "Germersheim", "Ha�loch", "Schifferstadt", "Bad D�rkheim"
			)
		),
		array(
			"regionName" => "Saarland",
			"regionShort" => "SL",
			"regionSlug" => "saarland",
			"weight" => 400,
			"cities" => array(
				"Saarbr�cken", "Neunkirchen", "Homburg", "V�lklingen", "Sankt Ingbert", "Saarlouis", "Merzig", "Sankt Wendel",
				"Blieskastel", "Dillingen", "Lebach", "P�ttlingen", "Heusweiler", "Wadgassen", "Bexbach", "Schwalbach", "Sulzbach"
			)
		),
		array(
			"regionName" => "Saxony",
			"regionShort" => "SN",
			"regionSlug" => "saxony",
			"weight" => 227,
			"cities" => array(
				"Leipzig", "Dresden", "Chemnitz", "Zwickau", "Plauen", "G�rlitz", "Freiberg", "Bautzen", "Freital", "Pirna",
				"Hoyerswerda", "Radebeul", "Riesa", "Grimma", "Zittau", "Mei�en", "Delitzsch", "Limbach-Oberfrohna", "Markkleeberg", "Glauchau"
			)
		),
		array(
			"regionName" => "Saxony-Anhalt",
			"regionShort" => "ST",
			"regionSlug" => "saxony_anhalt",
			"weight" => 116,
			"cities" => array(
				"Halle", "Magdeburg", "Dessau", "Wittenberg", "Bitterfeld-Wolfen", "Stendal", "Halberstadt", "Wei�enfels", "Bernburg",
				"Merseburg", "Wernigerode", "Naumburg", "Sch�nebeck", "Zeitz", "Sangerhausen", "Aschersleben", "Quedlinburg", "Sta�furt",
				"K�then", "Eisleben", "Salzwedel", "Burg"
			)
		),
		array(
			"regionName" => "Schleswig-Holstein",
			"regionShort" => "SH",
			"regionSlug" => "saarland",
			"weight" => 179,
			"cities" => array(
				"Kiel", "L�beck", "Flensburg", "Neum�nster", "Norderstedt", "Elmshorn", "Pinneberg", "Itzehoe", "Wedel", "Ahrensburg",
				"Geesthacht", "Rendsburg", "Henstedt-Ulzburg", "Reinbek", "Bad Oldesloe", "Schleswig", "Eckernf�rde", "Husum", "Heide",
				"Quickborn"
			)
		)
	);


	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}