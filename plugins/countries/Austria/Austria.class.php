<?php

/**
 * @package Countries
 */

class Country_Austria extends CountryPlugin {
	protected $countryName = "Austria";
	protected $countrySlug = "austria";
	protected $regionNames = "Austrian states";
	protected $continent = "europe";

	protected $extendedData = array(
		"zipFormat" => "Xxxx"
	);

	protected $countryData = array(
		array(
			"regionName" => "Vienna",
			"regionShort" => "Wien",
			"regionSlug" => "vienna",
			"weight" => 4113,
			"cities" => array(
				"Vienna"
			)
		),
		array(
			"regionName" => "Vorarlberg",
			"regionShort" => "Vbg.",
			"regionSlug" => "voralberg",
			"weight" => 142,
			"cities" => array(
				"Dornbirn", "Feldkirch", "Bregenz", "Lustenau", "Hohenems", "Bludenz", "Hard", "Rankweil",
				"Götzis", "Lauterach", "Wolfurt", "Höchst",	"Altach"
			)
		),
		array(
			"regionName" => "Upper Austria",
			"regionShort" => "OÖ.",
			"regionSlug" => "upper_austria",
			"weight" => 117,
			"cities" => array(
				"Linz", "Wels", "Steyr", "Leonding", "Traun", "Braunau am Inn", "Ansfelden", "Bad Ischl",
				"Gmunden", "Marchtrenk", "Vöcklabruck", "Ried im Innkreis", "Enns", "Altmünster", "Laakirchen",
				"Sierning"
			)
		),
		array(
			"regionName" => "Lower Austria",
			"regionShort" => "NÖ.",
			"regionSlug" => "lower_austria",
			"weight" => 84,
			"cities" => array(
				"St. Pölten", "Wiener Neustadt", "Klosterneuburg", "Baden", "Krems an der Donau",
				"Amstetten", "Mödling", "Traiskirchen", "Schwechat", "Stockerau", "Tulln an der Donau",
				"Ternitz", "Perchtoldsdorf", "Korneuburg", "Neunkirchen", "Hollabrunn", "Waidhofen an der Ybbs",
				"Bad Vöslau", "Brunn am Gebirge", "Zwettl-Niederösterreich"
			)
		),
		array(
			"regionName" => "Salzburg",
			"regionShort" => "Sbg.",
			"regionSlug" => "salzburg",
			"weight" => 74,
			"cities" => array(
				"Salzburg", "Hallein", "Saalfelden am Steinernen Meer", "Wals-Siezenheim", "Sankt Johann im Pongau",
				"Bischofshofen"
			)
		),
		array(
			"regionName" => "Styria",
			"regionShort" => "Stm.",
			"regionSlug" => "styria",
			"weight" => 73,
			"cities" => array(
				"Graz", "Leoben", "Kapfenberg", "Bruck an der Mur", "Knittelfeld", "Köflach", "Voitsberg",
				"Judenburg", "Weiz"
			)
		),
		array(
			"regionName" => "Burgenland",
			"regionShort" => "Bgl.",
			"regionSlug" => "burgenland",
			"weight" => 72,
			"cities" => array(
				"Eisenstadt", "Oberwart", "Neusiedl am See", "Mattersburg", "Pinkafeld", "Neudörfl", "Parndorf",
				"Jennersdorf", "Güssing", "Gols", "Großpetersdorf", "Neufeld an der Leitha", "Deutschkreutz",
				"Rechnitz", "Oberpullendorf", "Siegendorf", "Pöttsching", "Bruckneudorf", "Frauenkirchen",
				"Forchtenstein"
			)
		),
		array(
			"regionName" => "Carinthia",
			"regionShort" => "Ktn.",
			"regionSlug" => "carinthia",
			"weight" => 59,
			"cities" => array(
				"Klagenfurt", "Villach", "Wolfsberg", "Spittal an der Drau", "Feldkirchen in Kärnten", "St. Veit an der Glan",
				"Völkermarkt", "St. Andrä", "Velden am Wörther See", "Finkenstein am Faaker See", "Ebenthal in Kärnten",
				"Ferlach"
			)
		),
		array(
			"regionName" => "Tyrol",
			"regionShort" => "Tirol",
			"regionSlug" => "tyrol",
			"weight" => 56,
			"cities" => array(
				"Innsbruck", "Kufstein", "Telfs", "Schwaz", "Hall in Tirol", "Wörgl", "Lienz", "Imst", "Rum", "St. Johann in Tirol",
				"Kitzbühel", "Zirl", "Landeck"
			)
		),
	);

	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
