<?php

/**
 * @package DataTypes
 *
 * This Data Type provides some more fine-tuning of names (first + last) so that they're mapped to whatever
 * country the row happens to contain. If the $regionalNames private var doesn't contain names for the
 * current country, it defaults to loading ANY name pulled from the database - just like with the Names plugin.
 */

class DataType_NamesRegional extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "Names, Regional";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 15;
	protected $jsModules = array("NamesRegional.js");

	private $letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	private $regionalNames = array(
		"Italy" => array(
			"first_name_female" => array(
				"Alessandra", "Alessia", "Alice", "Angela", "Anna", "Arianna", "Aurora", "Beatrice", "Camilla",
				"Caterina", "Chiara", "Claudia", "Cristina", "Debora", "Elena", "Eleonora", "Elisa", "Emma", "Erica",
				"Erika", "Federica", "Francesca", "Gaia", "Giada", "Ginevra", "Giorgia", "Giulia", "Giulietta", "Greta",
				"Ilaria", "Irene", "Jessica", "Lara", "Laura", "Lisa", "Lucia", "Manuela", "Margherita", "Maria",
				"Marta", "Martina", "Matilde", "Michela", "Monica", "Nicole", "Nicoletta", "Noemi", "Paola", "Rebecca",
				"Roberta", "Sara", "Serena", "Silvia", "Simona", "Sofia", "Stefania", "Valentina", "Valeria", "Vanessa",
				"Veronica", "Viola", "Vittoria"
			),
			"first_name_male" => array(
				"Alberto", "Alessandro", "Alessio", "Alex", "Andrea", "Angelo", "Antonio", "Armando", "Augusto",
				"Christian", "Claudio", "Cristian", "Cristiano", "Daniele", "Dario", "Davide", "Diego", "Domenico",
				"Edoardo", "Emanuele", "Enrico", "Fabio", "Federico", "Filippo", "Francesco", "Gabriele", "Giacomo",
				"Gianluca", "Gianni", "Gianpaolo", "Gianpiero", "Giorgio", "Giovanni", "Giulio", "Giuseppe", "Jacopo",
				"Leonardo", "Lorenzo", "Luca", "Lucio", "Luigi", "Manuel", "Marco", "Mario", "Marcello", "Matteo",
				"Mattia", "Michele", "Mirko", "Nicola", "Nicolò", "Paolo", "Pietro", "Riccardo", "Roberto", "Salvatore",
				"Samuel", "Samuele", "Simone", "Stefano", "Tommaso", "Valerio", "Vincenzo"
			),
			"surname" => array(
				"Agostini", "Aiello", "Albanese", "Amato", "Antonelli", "Arena", "Baldi", "Barbieri", "Barone", "Basile",
				"Battaglia", "Bellini", "Benedetti", "Bernardi", "Bianchi", "Bianco", "Brambilla", "Bruni", "Bruno",
				"Calabrese", "Caputo", "Carbone", "Caruso", "Castelli", "Catalano", "Cattaneo", "Cavallo", "Ceccarelli",
				"Cirillo", "Colombo", "Conte", "Conti", "Coppola", "Costa", "Costantini", "De Angelis", "De Luca",
				"De Rosa", "De Santis", "De Simone", "Di Stefano", "Donati", "Esposito", "Fabbri", "Farina", "Ferrante",
				"Ferrara", "Ferrari", "Ferraro", "Ferrero", "Ferretti", "Ferri", "Ferro", "Fiore", "Fontana", "Franco",
				"Fumagalli", "Fusco", "Galli", "Gallo", "Gargiulo", "Garofalo", "Gatti", "Gentile", "Giordano", "Giorgi",
				"Giuliani", "Grassi", "Grasso", "Greco", "Grimaldi", "Guerra", "Guidi", "Leone", "Lombardi", "Lombardo",
				"Longo", "Lorusso", "Mancini", "Marchetti", "Marchi", "Mariani", "Marini", "Marino", "Marra", "Martinelli",
				"Martini", "Martino", "Mazza", "Mele", "Meloni", "Messina", "Milani", "Monaco", "Montanari", "Monti",
				"Morelli", "Moretti", "Moro", "Napolitano", "Neri", "Olivieri", "Orlando", "Pace", "Pagano", "Palmieri",
				"Palumbo", "Parisi", "Pastore", "Pellegrini", "Pellegrino", "Pepe", "Perrone", "Piazza", "Piccolo",
				"Pinna", "Piras", "Poli", "Pozzi", "Proietti", "Ricci", "Ricciardi", "Rinaldi", "Riva", "Rizzi", "Rizzo",
				"Romano", "Romeo", "Rossetti", "Rossi", "Ruggeri", "Ruggiero", "Russo", "Sala", "Sanna", "Santini",
				"Santoro", "Sartori", "Serra", "Silvestri", "Sorrentino", "Testa", "Valente", "Valentini", "Villa",
				"Villani", "Vitale", "Vitali", "Volpe", "Zanetti"
			)
		),
		"France" => array(
			"first_name_female" => array(
				"Agathe", "Alexandra", "Alexia", "Alice", "Alicia", "Amandine", "Ambre", "Amélie", "Anaël", "Anaëlle",
				"Anaïs", "Angelina", "Anna", "Bienvenue", "Candice", "Capucine", "Carla", "Catherine", "Charlotte",
				"Chaïma", "Chloé", "Clara", "Clotilde", "Cloé", "Clémence", "Célia", "Edwige", "Elsa", "Emma", "Eva",
				"Fanny", "Françoise", "Guillemette", "Inès", "Jade", "Jasmine", "Jeanne", "Julia", "Julie", "Juliette",
				"Justine", "Katell", "Kimberley", "Lamia", "Lana", "Laura", "Lauriane", "Lena", "Lilou", "Lily", "Lina",
				"Lisa", "Loane", "Lola", "Lou", "Louise", "Louna", "Lucie", "Luna", "Lutécia", "Léa", "Léane", "Léonie",
				"Maelys", "Manon", "Margaux", "Margot", "Marie", "Marine", "Marion", "Maryam", "Mathilde", "Maéva",
				"Maëlle", "Maïlé", "Maïwenn", "Mélanie", "Mélissa", "Nina", "Noémie", "Océane", "Pauline", "Romane",
				"Rosalie", "Rose", "Salomé", "Sara", "Sarah", "Solene", "Syrine", "Tatiana", "Valentine", "Yasmine",
				"Yüna", "Zoé", "Élisa", "Élise", "Éloïse", "Éléna", "Émilie"
			),
			"first_name_male" => array(
				"Aaron", "Adam", "Adrian", "Adrien", "Alexandre", "Alexis", "Amine", "Anthony", "Antoine", "Antonin",
				"Arthur", "Baptiste", "Bastien", "Benjamin", "Bruno", "Clément", "Colin", "Constant", "Corentin",
				"Cédric", "Davy", "Diego", "Dimitri", "Dorian", "Dylan", "Enzo", "Erwan", "Esteban", "Ethan", "Evan",
				"Florentin", "Florian", "Félix", "Gabin", "Gabriel", "Gaspard", "Gilbert", "Grégory", "Guillaume",
				"Hugo", "Jordan", "Jules", "Julien", "Jérémy", "Kevin", "Kilian", "Killian", "Kylian", "Kyllian",
				"Lilian", "Loevan", "Lorenzo", "Louis", "Lucas", "Léo", "Léon", "Léonard", "Macéo", "Malik", "Malo",
				"Martin", "Marwane", "Mathieu", "Mathis", "Mathéo", "Mattéo", "Maxence", "Maxime", "Mehdi", "Mohamed",
				"Nathan", "Nicolas", "Noah", "Nolan", "Noë", "Paul", "Pierre", "Quentin", "Renaud", "Robin", "Romain",
				"Roméo", "Rémi", "Samuel", "Simon", "Thibault", "Thomas", "Théo", "Timothée", "Timéo", "Titouan",
				"Tom", "Tristan", "Valentin", "Victor", "Yanis", "Yohan", "Zacharis", "Élouan", "Émile"
			),
			"surname" => array(
				"Adam", "Albert", "Andre", "Arnaud", "Aubert", "Aubry", "Bailly", "Barbier", "Baron", "Barre", "Benoit",
				"Berger", "Bernard", "Bertrand", "Blanc", "Blanchard", "Bonnet", "Boucher", "Boulanger", "Bourgeois",
				"Bouvier", "Boyer", "Breton", "Brun", "Brunet", "Caron", "Carpentier", "Carre", "Charles", "Charpentier",
				"Chevalier", "Chevallier", "Clement", "Colin", "Collet", "Collin", "Cordier", "Cousin", "Daniel",
				"David", "Denis", "Deschamps", "Dubois", "Dufour", "Dumas", "Dumont", "Dupont", "Dupuis", "Dupuy",
				"Durand", "Duval", "Etienne", "Evrard", "Fabre", "Faure", "Fernandez", "Fleury", "Fontaine", "Fournier",
				"Francois", "Gaillard", "Garcia", "Garnier", "Gauthier", "Gautier", "Gay", "Gerard", "Germain", "Gillet",
				"Girard", "Giraud", "Gomez", "Gonzalez", "Guerin", "Guillaume", "Guillot", "Guyot", "Henry", "Herve",
				"Hubert", "Huet", "Humbert", "Jacob", "Jacquet", "Jean", "Joly", "Julien", "Klein", "Lacroix", "Laine",
				"Lambert", "Laurent", "Le gall", "Le goff", "Le roux", "Lebrun", "Leclerc", "Leclercq", "Lecomte",
				"Lefebvre", "Lefevre", "Legrand", "Lemaire", "Lemoine", "Leroux", "Leroy", "Leveque", "Lopez", "Louis",
				"Lucas", "Maillard", "Mallet", "Marchal", "Marchand", "Marechal", "Marie", "Martin", "Martinez",
				"Marty", "Masson", "Mathieu", "Menard", "Mercier", "Meunier", "Meyer", "Michel", "Millet", "Moreau",
				"Morel", "Morin", "Moulin", "Muller", "Nguyen", "Nicolas", "Noel", "Olivier", "Paris", "Pasquier",
				"Paul", "Pereira", "Perez", "Perrin", "Perrot", "Petit", "Philippe", "Picard", "Pierre", "Poirier",
				"Pons", "Poulain", "Prevost", "Remy", "Renard", "Renaud", "Renault", "Rey", "Richard", "Riviere",
				"Robert", "Robin", "Roche", "Rodriguez", "Roger", "Rolland", "Rousseau", "Roussel", "Roux", "Roy",
				"Royer", "Sanchez", "Schmitt", "Schneider", "Simon", "Thomas", "Vasseur", "Vidal", "Vincent", "Weber"
			)
		)
	);


	public function generate($generator, $generationContextData) {
		$placeholderStr = $generationContextData["generationOptions"];


		while (preg_match("/MaleName/", $placeholderStr)) {
			$placeholderStr = preg_replace("/MaleName/", $this->getRandomFirstName($this->maleNames), $placeholderStr, 1);
		}
		while (preg_match("/FemaleName/", $placeholderStr)) {
			$placeholderStr = preg_replace("/FemaleName/", $this->getRandomFirstName($this->femaleNames), $placeholderStr, 1);
		}
		while (preg_match("/Name/", $placeholderStr)) {
			$placeholderStr = preg_replace("/Name/", $this->getRandomFirstName($this->firstNames), $placeholderStr, 1);
		}
		while (preg_match("/Surname/", $placeholderStr)) {
			$placeholderStr = preg_replace("/Surname/", $this->lastNames[rand(0, count($this->lastNames)-1)], $placeholderStr, 1);
		}
		while (preg_match("/Initial/", $placeholderStr)) {
			$placeholderStr = preg_replace("/Initial/", $this->letters[rand(0, strlen($this->letters)-1)], $placeholderStr, 1);
		}

		// in case the user entered multiple | separated formats, pick one
		$formats = explode("|", $placeholderStr);
		$chosenFormat = $formats[0];
		if (count($formats) > 1) {
			$chosenFormat = $formats[rand(0, count($formats)-1)];
		}

		return array(
			"display" => trim($chosenFormat)
		);
	}


	public function getRowGenerationOptions($generator, $post, $colNum, $numCols) {
		if (!isset($post["dtOption_$colNum"]) || empty($post["dtOption_$colNum"])) {
			return false;
		}
		return $post["dtOption_$colNum"];
	}


	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(255) default NULL",
			"SQLField_Oracle" => "varchar2(255) default NULL",
			"SQLField_MSSQL" => "VARCHAR(255) NULL"
		);
	}

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();

		$html =<<< END
	<select name="dtExample_%ROW%" id="dtExample_%ROW%">
		<option value="">{$L["please_select"]}</option>
		<option value="MaleName">{$this->L["example_MaleName"]}</option>
		<option value="FemaleName">{$this->L["example_FemaleName"]}</option>
		<option value="Name">{$this->L["example_Name"]}</option>
		<option value="MaleName Surname">{$this->L["example_MaleName_Surname"]}</option>
		<option value="FemaleName Surname">{$this->L["example_FemaleName_Surname"]}</option>
		<option value="Name Surname">{$this->L["example_Name_Surname"]}</option>
		<option value="Name Initial. Surname">{$this->L["example_Name_Initial_Surname"]}</option>
		<option value="Surname">{$this->L["example_surname"]}</option>
		<option value="Surname, Name Initial.">{$this->L["example_Surname_Name_Initial"]}</option>
		<option value="Name, Name, Name, Name">{$this->L["example_Name4"]}</option>
		<option value="Name Surname|Name Initial. Surname">{$this->L["example_fullnames"]}</option>
	</select>
END;
		return $html;
	}

	public function getOptionsColumnHTML() {
		return '<input type="text" name="dtOption_%ROW%" id="dtOption_%ROW%" style="width: 267px" />';
	}

	public function getNames() {
		return $this->firstNames;
	}

	public function getFirstNames() {
		return $this->firstNames;
	}

	public function getLastNames() {
		return $this->lastNames;
	}


	private function getRandomFirstName($nameArray) {
		return $nameArray[rand(0, count($nameArray)-1)];
	}


	public function getHelpHTML() {
		$L = Core::$language->getCurrentLanguageStrings();

		$content =<<<EOF
	<p>
		{$this->L["help_intro"]}
	</p>

	<table cellpadding="0" cellspacing="1">
	<tr>
		<td width="100"><h4>Name</h4></td>
		<td>{$this->L["type_Name"]}</td>
	</tr>
	<tr>
		<td><h4>MaleName</h4></td>
		<td>{$this->L["type_MaleName"]}</td>
	</tr>
	<tr>
		<td><h4>FemaleName</h4></td>
		<td>{$this->L["type_FemaleName"]}</td>
	</tr>
	<tr>
		<td><h4>Initial</h4></td>
		<td>{$this->L["type_Initial"]}</td>
	</tr>
	<tr>
		<td><h4>Surname</h4></td>
		<td>{$this->L["type_Surname"]}</td>
	</tr>
	</table>
EOF;

		return $content;
	}
}
