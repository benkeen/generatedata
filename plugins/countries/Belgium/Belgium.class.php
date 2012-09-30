<?php

class Country_Belgium extends CountryPlugin {
	protected $countryName = "Belgium";
	protected $countrySlug = "belgium";
	protected $regionNames = "Belgium Prov.";
	protected $zipFormat = "Xxxx";

	public function install() {
		$prefix = Core::getDbTablePrefix();

		$countrySlug = "belgium"; // again, because can't seem to access var above...!!!

		$rollbackQueries = array();
		$rollbackQueries[] = "DELETE FROM {$prefix}countries WHERE country_slug = '$countrySlug'";
		$rollbackQueries[] = "DELETE FROM {$prefix}regions WHERE country_slug = '$countrySlug'";
		$rollbackQueries[] = "DELETE FROM {$prefix}cities WHERE country_slug = '$countrySlug'";
		Core::$db->query($rollbackQueries);

		$data = array(
			array(
				"regionName" => "Antwerpen",
				"regionShort" => "AN",
				"regionSlug" => "antwerpen",
				"weight" => "1",
				"cities" => array(
					"Antwerpen", "Burcht", "Zwijndrecht", "Deurne", "Wijnegem", "Borgerhout", "Borsbeek", "Wommelgem", "Merksem",
					"Ekeren", "Herentals", "Morkhoven", "Noorderwijk", "Hallaar", "Heist-op-den-Berg", "Booischot", "Itegem",
					"Wiekevorst", "Schriek", "Herselt", "Ramsel", "Houtvenne", "Hulshout", "Westmeerbeek", "Massenhoven", "Viersel",
					"Zandhoven", "Pulderbos", "Pulle", "Olen", "Oevel", "Tongerlo", "Westerlo", "Zoerle-Parwijs", "Herenthout",
					"Gierle", "Lille", "Poederlee", "Wechelderzande", "Grobbendonk", "Bouwel", "Vorselaar", "Turnhout", "Rijkevorsel",
					"Hoogstraten", "Meer", "Minderhout", "Wortel", "Meerle", "Merksplas", "Beerse", "Vlimmeren", "Vosselaar",
					"Oud-Turnhout", "Arendonk", "Ravels", "Weelde", "Poppel", "Baarle-Hertog", "Malle", "Oostmalle", "Westmalle",
					"Mol", "Eindhout", "Laakdal", "Vorst", "Varendonk", "Veerle", "Geel", "Meerhout", "Kasterlee", "Lichtaart",
					"Tielen", "Retie", "Dessel", "Balen", "Olmen", "Koningshooikt", "Lier", "Broechem", "Emblem", "Oelegem", "Ranst",
					"Boechout", "Vremde", "Hove", "Lint", "Kontich", "Waarloos", "Bevel", "Kessel", "Nijlen", "Duffel", "Beerzel"
				)
			),
			array(
				"regionName" => "Brussels Hoofdstedelijk Gewest",
				"regionShort" => "BU",
				"regionSlug" => "brussels_hoofdstedelijk_gewest",
				"weight" => "1",
				"cities" => array(
					"Brussel", "Laken", "Schaarbeek", "Etterbeek", "Elsene", "Sint-Gillis", "Anderlecht", "Sint-Jans-Molenbeek",
					"Koekelberg", "Sint-Agatha-Berchem", "Ganshoren", "Jette", "Neder-Over-Heembeek", "Haren", "Evere",
					"Sint-Pieters-Woluwe", "Oudergem", "Watermaal-Bosvoorde", "Ukkel", "Vorst", "Sint-Lambrechts-Woluwe",
					"Sint-Joost-ten-Node"
				)
			),
			array(
				"regionName" => "Waals-Brabant",
				"regionShort" => "WB",
				"regionSlug" => "waals_brabant",
				"weight" => "1",
				"cities" => array(
					"Limal", "Waver", "Bierges", "La Hulpe", "Glimes", "Incourt", "Opprebais", "Pitrebais", "Roux-Miroir",
					"Beauvechain", "Hamme-Mille", "l'Ecluse", "Nodebais", "Tourinnes-la-Grosse", "Bonlez", "Chaumont-Gistoux",
					"Corroy-le-Grand", "Dion-Valmont", "Longueville", "Rixensart", "Rosires", "Genval", "Ottignies",
					"Ottignies-Louvain-la-Neuve", "Croux-Mousty", "Limelette", "Louvain-la-Neuve", "Enines", "Folx-les-Caves",
					"Jandrain-Jandrenouille", "Jauche", "Marilles", "Noduwez", "Orp-Jauche", "Orp-le-Grand", "Hlcine",
					"Linsmeau", "Neerheylissem", "Opheylissem", "Malves-Sainte-Marie-Wastines", "Orbais", "Perwez",
					"Thorembais-les-Bguines", "Thorembais-Saint-Trond", "Autre-Eglise", "Bomal", "Geest-Grompont-Petit-Rosire",
					"Grompont", "Grand-Rosire-Hottomont", "Huppaye", "Mont-Saint-Andr", "Ramillies", "Dongelberg", "Jauchelette",
					"Jodoigne", "Jodoigne-Souveraine", "Lathuy", "Mlin", "Pitrain", "Saint-Jean-Geest", "Saint-Remy-Geest",
					"Ztrud-Lumay", "Couture-Saint-Germain", "Lasne", "Lasne-Chapelle-Saint-Lambert", "Maransart", "Ohain",
					"Plancenoit", "Archennes", "Graven Grez-Doiceau", "Biez", "Bossut-Gottechain", "Nethen", "Monstreux",
					"Nivelles", "Baulers", "Thines", "Bornival", "Waterloo", "Promo-Control", "Eigenbrakel",
					"Ophain-Bois-Seigneur-Isaac", "Lillois-Witterze", "Bierk Bierghes", "Roosbeek", "Quenast", "Rebecq",
					"Corbais", "Hvillers", "Mont-Saint-Guibert", "Kasteelbrakel", "Woutersbrakel", "Chastre",
					"Chastre-Villeroux-Blanmont", "Cortil-Noirmont", "Gentinnes", "Saint-Gry", "Nil-Saint-Vincent-Saint-Martin",
					"Tourinnes-Saint-Lambert", "Walhain", "Walhain-Saint-Paul", "Itter", "Virginal-Samme", "Haut-Ittre", "Genappe",
					"Baisy-Thy", "Bousval", "Loupoigne", "Vieux-Genappe", "Glabais", "Ways", "Houtain-le-Val", "Klabbeek",
					"Oostkerk", "Sint-Renelde Saintes", "Tubeke Tubize", "Court-Saint-Etienne", "Marbais", "Mellery",
					"Sart-Dames-Avelines", "Tilly", "Villers-la-Ville"
				)
			),
			array(
				"regionName" => "Vlaams-Brabant",
				"regionShort" => "VB",
				"regionSlug" => "vlaams_brabant",
				"weight" => "1",
				"cities" => array(
					"Halle", "Buizingen", "Lembeek", "Herfelingen", "Herne", "Sint-Pieters-Kapelle", "Bever Bievene", "Hoeilaart",
					"Galmaarden", "Tollembeek", "Vollezele", "Oudenaken", "Sint-Laureins-Berchem", "Sint-Pieters-Leeuw", "Ruisbroek",
					"Vlezenbeek", "Drogenbos", "Linkebeek", "Sint-Genesius-Rode", "Beersel", "Lot", "Alsemberg", "Dworp", "Huizingen",
					"Bogaarden", "Heikruis", "Pepingen", "Elingen", "Beert", "Bellingen", "Dilbeek", "Sint-Martens-Bodegem",
					"Sint-Ulriks-Kapelle", "Itterbeek", "Groot-Bijgaarden", "Schepdaal", "Asse", "Bekkerzeel", "Kobbegem", "Mollem",
					"Relegem", "Zellik", "Ternat", "Wambeek", "Sint-Katherina-Lombeek", "Mazenzele", "Opwijk", "Gaasbeek", "Lennik",
					"Sint-Kwintens-Lennik", "Sint-Martens-Lennik", "Gooik", "Kester", "Leerbeek", "Oetingen", "Onze-Lieve-Vrouw-Lombeek",
					"Pamel", "Roosdaal", "Strijtem", "Borchtlombeek", "Liedekerke", "Wemmel", "Brussegem", "Hamme", "Merchtem", "Affligem",
					"Essene", "Hekelgem", "Teralfene", "Peutie", "Vilvoorde", "Cargovil", "VTM", "Melsbroek", "Perk", "Steenokkerzeel",
					"Machelen", "Diegem", "Londerzeel", "Malderen", "Steenhuffel", "Grimbergen", "Humbeek", "Beigem", "Strombeek-Bever",
					"Meise", "Wolvertem", "Kapelle-op-den-Bos", "Nieuwenrode", "Ramsdonk", "Berg", "Buken", "Kampenhout", "Nederokkerzeel",
					"Nossegem", "Zaventem", "Brucargo", "Sint-Stevens-Woluwe", "Sterrebeek", "Brussel X-Luchthaven Remailing"
				)
			),
			array(
				"regionName" => "Luik",
				"regionShort" => "LU",
				"regionSlug" => "luik",
				"weight" => "1",
				"cities" => array(
					"Glain", "Luik", "Rocourt", "Bressoux", "Jupille-sur-Meuse", "Lige", "Wandre", "Grivegne", "Lige", "Angleur",
					"Herstal", "Milmort", "Vottem", "Liers", "Chaudfontaine", "Vaux-sous-Chvremont", "Beaufays", "Embourg", "B.S.D.",
					"Boncelles", "Seraing", "Jemeppe-sur-Meuse", "Ougre", "Ehein", "Neupr", "Rotheux-Rimire", "Neuville-en-Condroz",
					"Plainevaux", "Esneux", "Tilff", "Dolembreux", "Gomz-Andoumont", "Rouvreux", "Sprimont", "Louveign", "Anthisnes",
					"Villers-aux-Tours", "Hody", "Tavier", "Comblain-au-Pont", "Poulseur", "Comblain-Fairon", "Comblain-la-Tour", "Hamoir",
					"Filot", "Ferrires", "My", "Vieuxville", "Werbomont", "Xhoris", "Burdinne", "Hannche", "Lamontze", "Marneffe",
					"Oteppe", "Hron", "Lavoir", "Waret-l'Evque", "Couthuin", "Acosse", "Ambresin", "Meeffe", "Wasseiges", "Bo‘lhe",
					"Geer", "Hollogne-sur-Geer", "Lens-Saint-Servais", "Omal", "Darion", "Ligney", "Berloz", "Corswarem", "Rosoux-Crenwick",
					"Avennes", "Braives", "Ciplet", "Fallais", "Fumal", "Ville-en-Hesbaye", "Latinne", "Tourinne", "Abolens",
					"Avernas-le-Bauduin", "Avin", "Bertre", "Blehen", "Cras-Avernas", "Crehen", "Grand-Hallet", "Hannut", "Lens-Saint-Remy",
					"Merdorp", "Moxhe", "Petit-Hallet", "Poucet", "Thisnes", "Trogne", "Villers-le-Peuplier", "Wansin"
				)
			),
			array(
				"regionName" => "Namen",
				"regionShort" => "NA",
				"regionSlug" => "namen",
				"weight" => "1",
				"cities" => array(
					"Beez", "Namen", "Belgrade", "Saint-Servais", "Saint-Marc", "Bouge", "Champion", "Daussoulx", "Flawinne",
					"Malonne", "Suarlee", "Temploux", "Vedrin", "Boninne", "Cognelee", "Gelbressee", "Marche-les-Dames", "Beuzet",
					"Ernage", "Gembloux", "Grand-Manil", "Lonzee", "Sauvenire", "Grand-Leez", "Bossire", "Bothey", "Corroy-le-Ch‰teau",
					"Isnes", "Mazy", "Arsimont", "Auvelais", "Falisolle", "Keumiee", "Moignelee", "Sambreville", "Tamines",
					"Velaine-sur-Sambre", "Aisemont", "Fosses-la-Ville", "Sart-Eustache", "Vitrival", "Emines", "Rhisnes",
					"Villers-lez-Heest", "Warisoulx", "Bovesse", "Meux", "Saint-Denis-Bovesse", "Dave", "Jambes", "Naninne", "Wepion",
					"Wierde", "Erpe", "Lives-sur-Meuse", "Loy", "Boignee", "Ligny", "Sombreffe", "Tongrinne", "Floreffe", "Floriffoux",
					"Soye", "Arbre", "Bois-de-Villers", "Lesve", "Lustin", "Profondeville", "Rivire", "Bal‰tre", "Ham-sur-Sambre",
					"Jemeppe-sur-Sambre", "Mornimont", "Moustier-sur-Sambre", "Onoz", "Saint-Martin", "Spy", "Andenne", "Bonneville",
					"Coutisse", "Landenne", "Maizeret", "Sclayn", "Seilles", "Thon", "Vezin", "Bolinne", "Boneffe", "Branchon", "Dhuy",
					"Eghezee", "Hanret", "Leuze", "Liernu"
				)
			),
			array(
				"regionName" => "Henegouwen",
				"regionShort" => "HE",
				"regionSlug" => "henegouwen",
				"weight" => "1",
				"cities" => array(
					"Charleroi", "Marcinelle", "Couillet", "Dampremy", "Goutroux", "Marchienne-au-Pont", "Monceau-sur-Sambre",
					"Mont-sur-Marchienne", "Jumet", "Gosselies", "Lodelinsart", "Ransart", "Roux", "Gilly", "Montignies-sur-Sambre",
					"Montigny-le-Tilleul", "Landelies", "Cour-sur-Heure", "Ham-sur-Heure", "Ham-sur-Heure-Nalinnes", "Jamioulx",
					"Marbaix", "Nalinnes", "Fontaine-l'Evque", "Forchies-la-Marche", "Leernes", "Anderlues", "Courcelles",
					"Gouy-lez-Piton", "Souvret", "Trazegnies", "Bouffioulx", "Ch‰telet", "Ch‰telineau", "Frasnes-lez-Gosselies",
					"Les Bons Villers", "Rves", "Villers-Perwin", "Wayaux", "Mellet", "Fleurus", "Heppignies", "Lambusart", "Brye",
					"Wagnele", "Wanferce-Baulet", "Buzet", "Obaix", "Pont-ˆ-Celles", "Thimon", "Viesville", "Liberchies", "Luttre",
					"Farciennes", "Pironchamps", "Aiseau", "Aiseau-Presles", "Pont-de-Loup", "Presles", "Roselies", "Acoz", "Gerpinnes",
					"Gougnies", "Joncret", "Loverval", "Villers-Poterie", "Boussu-lez-Walcourt", "Fourbechies", "Froidchapelle",
					"Vergnies", "Erpion", "Bailivre", "Chimay", "Robechies", "Saint-Remy", "Salles", "Villers-la-Tour", "Virelles",
					"Vaulx-lez-Chimay", "Lompret", "Baileux", "Bourlers", "Forges", "l'Escaillre", "Rizes", "Grandrieu", "Montbliart",
					"Rance", "Sautin", "Sivry", "Sivry-Rance", "Beaumont", "Leugnies", "Leval-Chaudeville", "Renlies", "Solre-Saint-Gry",
					"Thirimont", "Stre", "Leers-et-Fosteau", "Thuin", "Biesme-sous-Thuin", "Ragnies", "Bierce", "Goze", "Donstiennes",
					"Thuillies", "Lobbes", "Mont-Sainte-Genevive", "Sars-la-Buissire", "Bienne-lez-Happart", "Bersillies-l'Abbaye",
					"Erquelinnes", "Grand-Reng", "Hantes-Wihries", "Montignies-Saint-Christophe", "Solre-sur-Sambre", "Fontaine-Valmont",
					"Labuissire", "Merbes-le-Ch‰teau", "Merbes-Sainte-Marie", "Momignies", "Macon", "Monceau-Imbrechies", "Macquenoise",
					"Beauwelz", "Forge-Philippe", "Seloignes", "Bergen Mons", "Ghlin", "Flnu", "Jemappes", "Maisires", "Nimy", "Havr"
				)
			),
			array(
				"regionName" => "Luxemburg",
				"regionShort" => "LX",
				"regionSlug" => "luxemburg",
				"weight" => "1",
				"cities" => array(
					"Bastogne", "Longvilly", "Noville", "Villers-la-Bonne-Eau", "Wardin", "Martelange", "Fauvillers", "Hollange",
					"Tintange", "Hompr", "Morhet", "Nives", "Sibret", "Vaux-lez-Rosieres", "Vaux-sur-Sure", "Juseret", "Houffalize",
					"Nadrin", "Mont", "Tailles", "Tavigny", "Mabompr", "Wibrin", "Gouvy", "Limerl", "Bovigny", "Beho", "Cherain",
					"Montleban", "Amberloup", "Sainte-Ode", "Tillet", "Lavacherie", "Flamierge", "Bertogne", "Longchamps", "Bihain",
					"Vielsalm", "Petit-Thier", "Grand-Halleux", "Arlon", "Bonnert", "Heinsch", "Toernich", "Guirsch", "Autelbas",
					"Attert", "Nobressart", "Nothomb", "Thiaumont", "Tontelange", "Habay", "Habay-la-Neuve", "Hachy", "Anlier",
					"Habay-la-Vieille", "Houdemont", "Rulles", "Bellefontaine", "Rossignol", "Saint-Vincent", "Tintigny", "Etalle",
					"Sainte-Marie-sur-Semois", "Villers-sur-Semois", "Vance", "Chantemelle", "Buzenol", "Ch‰tillon", "Meix-le-Tige",
					"Saint-Lger", "Musson", "Mussy-la-Ville", "Signeulx", "Bleid", "Ethe", "Ruette", "Virton", "Latour", "Saint-Mard",
					"Dampicourt", "Harnoncourt", "Lamorteau", "Rouvroy", "Torgny", "Grouville", "Meix-Devant-Virton", "Robelmont",
					"Sommethonne", "Villers-la-Loue", "Hondelange", "Messancy", "Wolkrange", "Slange", "Habergy", "Aubange",
					"Athus", "Halanzy", "Rachecourt", "Bras", "Freux", "Libramont-Chevigny", "Moircy", "Recogne", "Remagne",
					"Sainte-Marie-Chevigny", "Saint-Pierre", "Chiny", "Izel", "Jamoigne", "Les Bulles", "Suxy", "Termes",
					"Florenville", "Fontenoille", "Muno"
				)
			),
			array(
				"regionName" => "West-Vlaanderen",
				"regionShort" => "WV",
				"regionSlug" => "west_vlaanderen",
				"weight" => "1",
				"cities" => array(
					"Brugge Bruges", "Koolkerke", "Hertsberge", "Oostkamp", "Ruddervoorde", "Waardamme", "Sint-Andries",
					"Sint-Michiels", "Loppem", "Veldegem", "Zedelgem", "Aartrijke", "Knokke", "Knokke-Heist", "Westkapelle",
					"Heist-aan-Zee", "Ramskapelle", "Assebroek", "Sint-Kruis", "Damme", "Hoeke", "Lapscheure", "Moerkerke",
					"Oostkerke", "Sijsele", "Blankenberge", "Uitkerke", "Houtave", "Meetkerke", "Nieuwmunster", "Zuienkerke",
					"Dudzele", "Lissewege", "Zeebrugge", "Oostende", "Stene", "Zandvoorde", "De Haan", "Klemskerke", "Wenduine",
					"Vlissegem", "Middelkerke", "Wilskerke", "Leffinge", "Mannekensvere", "Schore", "Sint-Pieters-Kapelle",
					"Slijpe", "Spermalie", "Lombardsijde", "Westende", "Bredene", "Ettelgem", "Oudenburg", "Roksem", "Westkerke",
					"Gistel", "Moere", "Snaaskerke", "Zevekote", "Bekegem", "Eernegem", "Ichtegem", "Jabbeke", "Snellegem",
					"Stalhille", "Varsenare", "Zerkegem", "Kortrijk", "Bissegem", "Heule", "Bellegem", "Kooigem", "Marke",
					"Rollegem", "Aalbeke", "Kuurne", "Harelbeke", "Bavikhove", "Hulste", "Deerlijk", "Zwevegem", "Heestert", "Moen",
					"Otegem", "Sint-Denijs", "Gullegem", "Moorsele", "Wevelgem", "Anzegem", "Gijzelbrechtegem", "Ingooigem", "Vichte",
					"Kaster", "Tiegem", "Avelgem", "Kerkhove", "Waarmaarde", "Outrijve", "Bossuit", "Helkijn", "Spiere",
					"Spiere-Helkijn", "Beerst", "Diksmuide", "Driekapellen", "Esen", "Kaaskerke", "Keiem", "Lampernisse", "Leke",
					"Nieuwkapelle", "Oostkerke", "Oudekapelle"
				)
			),
			array(
				"regionName" => "Oost-Vlaanderen",
				"regionShort" => "OV",
				"regionSlug" => "oost_vlaanderen",
				"weight" => "1",
				"cities" => array(
					"Gent", "Mariakerke", "Drongen", "Wondelgem", "Sint-Amandsberg", "Oostakker", "Desteldonk", "Mendonk", "Sint-Kruis-Winkel",
					"Gentbrugge", "Ledeberg", "Afsnee", "Sint-Denijs-Westrem", "Zwijnaarde", "Zelzate", "Destelbergen", "Heusden",
					"Beervelde", "Lochristi", "Zaffelare", "Zeveneken", "Gontrode", "Melle", "Nieuwkerken-Waas", "Sint-Niklaas",
					"Belsele", "Sinaai-Waas", "Beveren", "Haasdonk", "Kallo", "Melsele", "Vrasene", "Doel", "Kallo", "Kieldrecht",
					"Verrebroek", "Elversele", "Steendorp", "Temse", "Tielrode", "Bazel", "Kruibeke", "Rupelmonde", "Daknam", "Eksaarde",
					"Lokeren", "De Klinge", "Meerdonk", "Sint-Gillis-Waas", "Sint-Pauwels", "Moerbeke", "Wachtebeke", "Kemzeke", "Stekene",
					"Appels", "Baasrode", "Dendermonde", "Grembergen", "Mespelare", "Oudegem", "Schoonaarde", "Sint-Gillis-bij-Dendermonde",
					"Hamme", "Moerzeke", "Massemen", "Westrem", "Wetteren", "Zele", "Waasmunster", "Buggenhout", "Opdorp", "Schellebelle",
					"Serskamp", "Wichelen", "Kalken", "Laarne", "Denderbelle", "Lebbeke", "Wieze", "Berlare", "Overmere", "Uitbergen",
					"Aalst", "Gijzegem", "Hofstade", "Baardegem", "Herdersem", "Meldert", "Moorsel", "Erembodegem", "Nieuwerkerken", "Impe",
					"Lede", "Oordegem", "Smetlede", "Wanzele", "Appelterre-Eichem", "Denderwindeke", "Lieferinge", "Nederhasselt"
				)
			)
		);

		// now insert the data
		$queries = array();
		$queries[] = "INSERT INTO {$prefix}countries (country, country_slug) VALUES ('Belgium', '$countrySlug')";

		foreach ($data as $regionInfo) {
			$currRegionName = $regionInfo["regionName"];
			$currRegionSlug = $regionInfo["regionSlug"];
			$queries[] = "
				INSERT INTO {$prefix}regions (country_slug, region, region_slug, region_short, weight)
				VALUES ('$countrySlug', '$currRegionName', '$currRegionSlug', '{$regionInfo["regionShort"]}', '{$regionInfo["weight"]}')
			";

			$rows = array();
			foreach ($regionInfo["cities"] as $cityName) {
				$cityName = addslashes($cityName);
				$rows[] = "('$countrySlug', '$currRegionSlug', '$cityName')";
			}
			$rowsStr = implode(",", $rows);
			$queries[] = "
				INSERT INTO {$prefix}cities (country_slug, region_slug, city)
				VALUES $rowsStr
			";
		}

		$response = Core::$db->query($queries, $rollbackQueries);

		if ($response["success"]) {
			return array(true, "");
		} else {
			return array(false, $response["errorMessage"]);
		}

		return array(true, "");
	}
}
