<?php

/**
 * @package Countries
 */

class Country_Netherlands extends CountryPlugin {
	protected $countryName = "Netherlands";
	protected $countrySlug = "netherlands";
	protected $regionNames = "Netherlands Prov.";
	protected $continent = "europe";

	protected $extendedData = array(
		"zipFormat" => "xxxxLL"
	);

	protected $countryData = array(
		array(
			"regionName" => "Drenthe",
			"regionShort" => "Dr",
			"regionSlug" => "drenthe",
			"weight" => "5",
			"cities" => array(
				"Assen", "Coevorden", "Emmen", "Hoogeveen", "Meppel"
			)
		),
		array(
			"regionName" => "Flevoland",
			"regionShort" => "Fl",
			"regionSlug" => "flevoland",
			"weight" => "1",
			"cities" => array(
				"Almere", "Lelystad"
			)
		),
		array(
			"regionName" => "Friesland",
			"regionShort" => "Fr",
			"regionSlug" => "friesland",
			"weight" => "6",
			"cities" => array(
				"Bolsward", "Dokkum", "Drachten", "Franeker", "Harlingen", "Heerenveen", "Hindeloopen", "IJlst",
				"Leeuwarden", "Sloten", "Sneek", "Stavoren", "Workum"
			)
		),
		array(
			"regionName" => "Gelderland",
			"regionShort" => "Gl",
			"regionSlug" => "gelderland",
			"weight" => "20",
			"cities" => array(
				"Apeldoorn", "Arnhem", "Buren", "Culemborg", "Doetinchem", "Ede", "Groenlo", "Harderwijk", "Hattem",
				"Huissen", "Nijkerk", "Nijmegen", "Tiel", "Wageningen", "Winterswijk", "Zaltbommel", "Zutphen"
			)
		),
		array(
			"regionName" => "Limburg",
			"regionShort" => "L.",
			"regionSlug" => "limburg",
			"weight" => "11",
			"cities" => array(
				"Geleen", "Heerlen", "Kerkrade", "Maastricht", "Roermond", "Sittard", "Thorn", "Valkenburg aan de Geul",
				"Venlo", "Weert", "Hasselt", "Sint-Lambrechts-Herk", "Wimmertingen", "Kermt", "Spalbeek", "Kuringen",
				"Stokrooie", "Stevoort", "Zonhoven", "Helchteren", "Houthalen", "Houthalen-Helchteren", "Berbroek", "Donk",
				"Herk-de-Stad", "Schulen", "Halen", "Loksbergen", "Zelem", "Heusden", "Heusden-Zolder", "Zolder", "Linkhout",
				"Lummen", "Meldert", "Alken", "Beringen", "Beverlo", "Koersel", "Paal", "Diepenbeek", "Genk", "Gellik",
				"Lanaken", "Neerharen", "Veldwezelt", "Rekem", "Eisden", "Leut", "Maasmechelen", "Mechelen-aan-de-Maas",
				"Meeswijk", "Opgrimbie", "Vucht", "Boorsem", "Uikhoven", "Kessenich", "Kinrooi", "Molenbeersel", "Ophoven",
				"Dilsen-Stokkem", "Elen", "Lanklaar", "Rotem", "Stokkem", "Opglabbeek", "As", "Niel-bij-As", "Ellikom",
				"Gruitrode", "Meeuwen", "Meeuwen-Gruitrode", "Neerglabbeek", "Wijshagen", "Maaseik", "Neeroeteren",
				"Opoeteren", "Zutendaal", "Berg", "Diets-Heur", "Haren", "Henis", "Kolmont", "Koninksem", "Lauw", "Mal",
				"Neerrepen", "Nerem", "Overrepen", "Piringen", "Riksingen", "Rutten", "s Herenelderen", "Sluizen", "Tongeren",
				"Vreren", "Widooie", "Herstappe", "Kortessem", "Vliermaalroot"
			)
		),
		array(
			"regionName" => "Noord Brabant",
			"regionShort" => "N.",
			"regionSlug" => "noord_brabant",
			"weight" => "24",
			"cities" => array(
				"Bergen op Zoom", "Breda", "Eindhoven", "Geertruidenberg", "Grave", "Helmond", "Heusden", "Oosterhout",
				"Oss", "Ravenstein", "Roosendaal", "Tilburg", "Waalwijk"
			)
		),
		array(
			"regionName" => "Noord Holland",
			"regionShort" => "N.",
			"regionSlug" => "noord_holland",
			"weight" => "26",
			"cities" => array(
				"Alkmaar", "Amstelveen", "Amsterdam", "Den Helder", "Edam", "Enkhuizen", "Haarlem", "Heerhugowaard", "Hilversum",
				"Hoofddorp", "Hoorn", "Laren", "Purmerend", "Medemblik", "Muiden", "Naarden", "Schagen", "Weesp", "Zaanstad"
			)
		),
		array(
			"regionName" => "Overijssel",
			"regionShort" => "Ov",
			"regionSlug" => "overijssel",
			"weight" => "11",
			"cities" => array(
				"Almelo", "Deventer", "Enschede", "Hengelo", "Oldenzaal", "Zwolle"
			)
		),
		array(
			"regionName" => "Zuid Holland",
			"regionShort" => "Z.",
			"regionSlug" => "zuid_holland",
			"weight" => "12",
			"cities" => array(
				"Alphen aan den Rijn", "Delft", "Dordrecht", "Gorinchem", "Gouda", "Leiden", "Rotterdam", "Spijkenisse",
				"The Hague", "Zoetermeer"
			)
		),
		array(
			"regionName" => "Utrecht",
			"regionShort" => "U.",
			"regionSlug" => "utrecht",
			"weight" => "4",
			"cities" => array(
				"Amersfoort", "Leersum", "Nieuwegein", "Utrecht", "Veenendaal", "Woerden", "Zeist"
			)
		),
		array(
			"regionName" => "Zeeland",
			"regionShort" => "Zl",
			"regionSlug" => "zeeland",
			"weight" => "35",
			"cities" => array(
				"Flushing", "Goes", "Hulst", "Middelburg", "Sluis", "Terneuzen", "Veere", "Zierikzee"
			)
		)
	);


	public function install() {
		return CountryPluginHelper::populateDB($this->countryName, $this->countrySlug, $this->countryData);
	}
}
