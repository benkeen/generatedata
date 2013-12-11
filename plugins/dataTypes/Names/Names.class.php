<?php

/**
 * @package DataTypes
 */

class DataType_Names extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "Names";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 10;
	protected $jsModules = array("Names.js");

	// custom member vars for this Data Type
	private $maleNames    = array();
	private $femaleNames  = array();
	private $firstNames   = array();
	private $lastNames    = array();
	private $letters      = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


	/**
	 * @param string $runtimeContext "generation" or "ui"
	 */
	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			self::initFirstNames();
			self::initLastNames();
		}
	}


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
			$placeholderStr = preg_replace("/Surname/", $this->lastNames[mt_rand(0, count($this->lastNames)-1)], $placeholderStr, 1);
		}
		while (preg_match("/Initial/", $placeholderStr)) {
			$placeholderStr = preg_replace("/Initial/", $this->letters[mt_rand(0, strlen($this->letters)-1)], $placeholderStr, 1);
		}

		// in case the user entered multiple | separated formats, pick one
		$formats = explode("|", $placeholderStr);
		$chosenFormat = $formats[0];
		if (count($formats) > 1) {
			$chosenFormat = $formats[mt_rand(0, count($formats)-1)];
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


	// -------- private member functions ---------

	/**
	 * Called when instantiating the plugin during data generation. Set the firstNames, maleNames and
	 * femaleNames.
	 */
	private function initFirstNames() {
		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			SELECT *
			FROM   {$prefix}first_names
		");

		if ($response["success"]) {
			$names = array();
			$maleNames = array();
			$femaleNames = array();
			while ($row = mysqli_fetch_assoc($response["results"])) {
				$gender = $row["gender"];
				$name   = $row["first_name"];

				$names[] = $name;
				if ($gender == "male") {
					$maleNames[] = $name;
				} else {
					$femaleNames[] = $name;
				}
			}

			$this->firstNames  = $names;
			$this->maleNames   = $maleNames;
			$this->femaleNames = $femaleNames;
		}
	}


	private function initLastNames() {
		$prefix = Core::getDbTablePrefix();
		$response = Core::$db->query("
			SELECT *
			FROM   {$prefix}last_names
		");

		if ($response["success"]) {
			$lastNames = array();
			while ($row = mysqli_fetch_assoc($response["results"])) {
				$lastNames[] = $row["last_name"];
			}
			$this->lastNames = $lastNames;
		}
	}


	private function getRandomFirstName($nameArray) {
		return $nameArray[mt_rand(0, count($nameArray)-1)];
	}


	/**
	 * Called during installation. This creates and populates the first_names and last_names DB tables.
	 *
	 * @return array [0] success / error (boolean)
	 *               [1] the error message, if there was an error
	 */
	public static function install() {
		$prefix = Core::getDbTablePrefix();

		// always clear out the previous tables, just in case
		$rollbackQueries = array();
		$rollbackQueries[] = "DROP TABLE {$prefix}first_names";
		$rollbackQueries[] = "DROP TABLE {$prefix}last_names";
		Core::$db->query($rollbackQueries);

		$queries = array();
		$queries[] = "
			CREATE TABLE {$prefix}first_names (
				id mediumint(9) NOT NULL auto_increment,
				first_name varchar(50) NOT NULL default '',
				gender enum('male','female','both') NOT NULL default 'male',
				PRIMARY KEY (id)
			)
		";
		$queries[] = "
			INSERT INTO {$prefix}first_names (first_name, gender)
			VALUES ('Aaron','male'),('Abbot','male'),('Abdul','male'),('Abel','male'),('Abigail','female'),('Abra','female'),('Abraham','male'),('Acton','male'),('Adam','male'),('Adara','female'),('Addison','male'),('Adele','female'),('Adena','female'),('Adria','female'),('Adrian','male'),('Adrienne','female'),('Ahmed','male'),('Aidan','male'),('Aiko','female'),('Aileen','female'),('Aimee','female'),('Ainsley','female'),('Akeem','male'),('Aladdin','male'),('Alan','male'),('Alana','female'),('Alden','male'),('Alea','female'),('Alec','male'),('Alexa','female'),('Alexander','male'),('Alexandra','female'),('Alexis','female'),('Alfonso','male'),('Alfreda','female'),('Ali','male'),('Alice','female'),('Alika','female'),('Aline','female'),('Alisa','female'),('Allegra','female'),('Allen','male'),('Allistair','male'),('Alma','female'),('Althea','female'),('Alvin','male'),('Alyssa','female'),('Amal','male'),('Amanda','female'),('Amaya','female'),('Amber','female'),('Amela','female'),('Amelia','female'),('Amena','female'),('Amery','male'),('Amethyst','female'),('Amir','male'),('Amity','female'),('Amos','male'),('Amy','female'),('Anastasia','female'),('Andrew','male'),	('Angela','female'),('Angelica','female'),('Anika','female'),('Anjolie','female'),('Ann','female'),('Anne','female'),('Anthony','male'),('Aphrodite','female'),('April','female'),('Aquila','male'),('Arden','male'),('Aretha','female'),('Ariana','female'),('Ariel','female'),('Aristotle','male'),('Armand','male'),('Armando','male'),('Arsenio','male'),('Arthur','male'),('Ashely','female'),('Asher','male'),('Ashton','male'),('Aspen','female'),('Astra','female'),('Athena','female'),('Aubrey','both'),('Audra','female'),('Audrey','female'),('August','male'),('Aurelia','female'),('Aurora','female'),('Austin','male'),('Autumn','female'),('Ava','female'),('Avram','male'),('Avye','female'),('Axel','male'),('Ayanna','female'),('Azalia','female'),('Baker','male'),('Barbara','female'),('Barclay','male'),('Barrett','male'),('Barry','male'),('Basia','female'),('Basil','male'),('Baxter','male'),('Beatrice','female'),('Beau','male'),('Beck','male'),('Bell','female'),('Belle','female'),('Benedict','male'),('Benjamin','male'),('Berk','male'),('Bernard','male'),('Bert','male'),('Bertha','female'),('Bethany','female'),('Beverly','female'),('Bevis','male'),('Bianca','female'),('Blaine','both'),('Blair','both'),('Blake','male'),('Blaze','male'),('Blossom','female'),('Blythe','female'),('Bo','female'),('Boris','male'),('Bradley','male'),('Brady','male'),('Branden','male'),('Brandon','male'),('Breanna','female'),('Bree','female'),('Brenda','female'),('Brendan','male'),('Brenden','male'),('Brenna','female'),('Brennan','male'),('Brent','male'),('Brett','male'),('Brian','male'),('Brianna','female'),('Briar','female'),('Brielle','female'),('Britanney','female'),('Britanni','female'),('Brittany','female'),('Brock','male'),('Brody','male'),('Brooke','female'),('Bruce','male'),('Bruno','male'),('Bryar','female'),('Brynn','female'),('Brynne','female'),('Buckminster','male'),('Buffy','female'),('Burke','male'),('Burton','male'),('Byron','male'),('Cade','male'),('Cadman','male'),('Caesar','male'),('Cailin','female'),('Cain','male'),('Cairo','male'),('Caldwell','male'),('Caleb','male'),('Calista','female'),('Callie','female'),('Callum','male'),('Cally','female'),('Calvin','male'),('Camden','male'),('Cameran','female'),('Cameron','female'),('Cameron','male'),('Camilla','female'),('Camille','female'),('Candace','female'),('Candice','female'),('Cara','female'),('Carissa','female'),('Carl','male'),('Carla','female'),('Carlos','male'),('Carly','female'),('Carol','female'),('Carolyn','female'),('Carson','male'),('Carter','male'),('Caryn','female'),('Casey','both'),('Cassady','female'),('Cassandra','female'),('Cassidy','female'),('Castor','male'),('Catherine','female'),('Cathleen','female'),('Cecilia','female'),('Cedric','male'),('Celeste','female'),('Chadwick','male'),('Chaim','male'),('Chancellor','male'),('Chanda','female'),('Chandler','male'),('Chaney','male'),('Channing','male'),('Chantale','female'),('Charde','female'),('Charissa','female'),('Charity','female'),('Charles','male'),('Charlotte','female'),('Chase','male'),('Chastity','female'),('Chava','female'),('Chelsea','female'),('Cherokee','female'),('Cheryl','female'),('Chester','male'),('Cheyenne','female'),('Chiquita','female'),('Chloe','female'),('Christen','female'),('Christian','male'),('Christine','female'),('Christopher','male'),('Ciara','female'),('Ciaran','male'),('Claire','female'),('Clare','female'),('Clark','male'),('Clarke','male'),('Claudia','female'),('Clayton','male'),('Clementine','female'),('Cleo','female'),('Clinton','male'),('Clio','female'),('Coby','male'),('Cody','male'),('Colby','male'),('Cole','male'),('Colette','female'),('Colin','male'),('Colleen','female'),('Colorado','male'),('Colt','male'),('Colton','male'),('Conan','male'),('Connor','male'),('Constance','female'),('Cooper','male'),('Cora','female'),('Courtney','female'),('Craig','male'),('Cruz','male'),('Cullen','male'),('Curran','male'),('Cynthia','female'),('Cyrus','male'),('Dacey','female'),('Dahlia','female'),('Dai','female'),('Dakota','both'),('Dale','male'),('Dalton','male'),('Damian','male'),('Damon','male'),('Dana','female'),('Dane','male'),('Daniel','male'),('Danielle','female'),('Dante','male'),('Daphne','female'),('Daquan','male'),('Dara','female'),('Daria','female'),('Darius','male'),('Darrel','female'),('Darryl','female'),('Daryl','female'),('David','male'),('Davis','male'),('Dawn','female'),('Deacon','male'),('Dean','male'),('Deanna','female'),('Deborah','female'),('Debra','female'),('Declan','male'),('Deirdre','female'),('Delilah','female'),('Demetria','female'),('Demetrius','male'),('Denise','female'),('Dennis','male'),('Denton','male'),('Derek','male'),('Desirae','female'),('Desiree','female'),('Destiny','female'),('Devin','male'),('Dexter','male'),('Diana','female'),('Dieter','male'),('Dillon','male'),('Dolan','male'),('Dominic','male'),('Dominique','female'),('Donna','female'),('Donovan','male'),('Dora','female'),('Dorian','male'),('Doris','female'),('Dorothy','female'),('Drake','male'),('Drew','male'),('Driscoll','male'),('Duncan','male'),('Dustin','male'),('Dylan','male'),('Eagan','male'),('Eaton','male'),('Ebony','female'),('Echo','female'),('Edan','male'),('Eden','both'),('Edward','male'),('Elaine','female'),('Eleanor','female'),('Eliana','female'),('Elijah','male'),('Elizabeth','female'),('Ella','female'),('Elliott','male'),('Elmo','male'),('Elton','male'),('Elvis','male'),('Emerald','female'),('Emerson','male'),('Emery','male'),('Emi','female'),('Emily','female'),('Emma','female'),('Emmanuel','male'),('Erasmus','male'),('Eric','male'),('Erica','female'),('Erich','male'),('Erin','female'),('Ethan','male'),('Eugenia','female'),('Evan','male'),('Evangeline','female'),('Eve','female'),('Evelyn','female'),('Ezekiel','male'),('Ezra','male'),('Faith','female'),('Fallon','female'),('Farrah','female'),('Fatima','female'),('Fay','female'),('Felicia','female'),('Felix','male'),('Ferdinand','male'),('Ferris','male'),('Finn','male'),('Fiona','female'),('Fitzgerald','male'),('Flavia','female'),('Fletcher','male'),('Fleur','female'),('Florence','female'),('Flynn','male'),('Forrest','male'),('Frances','female'),('Francesca','female'),('Francis','male'),('Fredericka','female'),('Freya','female'),('Fritz','male'),('Fuller','male'),('Fulton','male'),('Gabriel','male'),('Gage','male'),('Gail','female'),('Galena','female'),('Galvin','male'),('Gannon','male'),('Gareth','male'),('Garrett','male'),('Garrison','male'),('Garth','male'),('Gary','male'),('Gavin','male'),('Gay','female'),('Gemma','female'),('Genevieve','female'),('Geoffrey','male'),('George','male'),('Georgia','female'),('Geraldine','female'),('Germaine','female'),('Germane','female'),('Giacomo','male'),('Gil','male'),('Gillian','female'),('Ginger','female'),('Gisela','female'),('Giselle','female'),('Glenna','female'),('Gloria','female'),('Grace','female'),('Grady','male'),('Graham','male'),('Graiden','male'),('Grant','male'),('Gray','male'),('Gregory','male'),('Gretchen','female'),('Griffin','male'),('Griffith','male'),('Guinevere','female'),('Guy','male'),('Gwendolyn','female'),('Hadassah','female'),('Hadley','female'),('Hakeem','male'),('Halee','female'),('Haley','female'),('Hall','male'),('Halla','female'),('Hamilton','male'),('Hamish','male'),('Hammett','male'),('Hanae','female'),('Hanna','female'),('Hannah','female'),('Harding','male'),('Harlan','male'),('Harper','male'),('Harriet','female'),('Harrison','male'),('Hasad','male'),('Hashim','male'),('Haviva','female'),('Hayden','male'),('Hayes','male'),('Hayfa','female'),('Hayley','female'),('Heather','female'),('Hector','male'),('Hedda','female'),('Hedley','male'),('Hedwig','female'),('Hedy','female'),('Heidi','female'),('Helen','female'),('Henry','male'),('Herman','male'),('Hermione','female'),('Herrod','male'),('Hilary','female'),('Hilda','female'),('Hilel','male'),('Hillary','female'),('Hiram','male'),('Hiroko','female'),('Hollee','female'),('Holly','female'),('Holmes','male'),('Honorato','male'),('Hop','male'),('Hope','female'),('Howard','male'),('Hoyt','male'),('Hu','male'),('Hunter','male'),('Hyacinth','female'),('Hyatt','male'),('Ian','male'),('Idola','female'),('Idona','female'),('Ifeoma','female'),('Ignacia','female'),('Ignatius','male'),('Igor','male'),('Ila','female'),('Iliana','female'),('Illana','female'),('Illiana','female'),('Ima','female'),('Imani','female'),('Imelda','female'),('Imogene','female'),('Ina','female'),('India','female'),('Indigo','female'),('Indira','female'),('Inez','female'),('Inga','female'),('Ingrid','female'),('Iola','female'),('Iona','female'),('Ira','male'),('Irene','female'),('Iris','female'),('Irma','female'),('Isaac','male'),('Isabella','female'),('Isabelle','female'),('Isadora','female'),('Isaiah','male'),('Ishmael','male'),('Ivan','male'),('Ivana','female'),('Ivor','male'),('Ivory','female'),('Ivy','female'),('Jack','male'),('Jackson','male'),('Jacob','male'),('Jada','female'),('Jade','female'),('Jaden','female'),('Jael','female'),('Jaime','female'),('Jakeem','male'),('Jamal','male'),('Jamalia','female'),('James','male'),('Jameson','male'),('Jana','female'),('Jane','female'),('Janna','female'),('Jaquelyn','female'),('Jared','male'),('Jarrod','male'),('Jasmine','female'),('Jason','male'),('Jasper','male'),('Jayme','female'),('Jeanette','female'),('Jelani','male'),('Jemima','female'),('Jena','female'),('Jenette','female'),('Jenna','female'),('Jennifer','female'),('Jeremy','male'),('Jermaine','male'),('Jerome','male'),('Jerry','male'),('Jescie','female'),('Jessamine','female'),('Jesse','male'),('Jessica','female'),('Jillian','female'),('Jin','male'),('Joan','female'),('Jocelyn','female'),('Joel','male'),('Joelle','female'),('John','male'),('Jolene','female'),('Jolie','female'),('Jonah','male'),('Jonas','male'),('Jordan','female'),('Jordan','male'),('Jorden','female'),('Joseph','male'),('Josephine','female'),('Joshua','male'),('Josiah','male'),('Joy','female'),('Judah','male'),('Judith','female'),('Julian','male'),('Julie','female'),('Juliet','female'),('Justin','male'),('Justina','female'),('Justine','female'),('Kadeem','male'),('Kaden','both'),('Kai','female'),('Kaitlin','female'),('Kalia','female'),('Kamal','male'),('Kameko','female'),('Kane','male'),('Kareem','male'),('Karen','female'),('Karina','female'),('Karleigh','female'),('Karly','female'),('Karyn','female'),('Kaseem','male'),('Kasimir','male'),('Kasper','male'),('Katell','female'),('Katelyn','female'),('Kathleen','female'),('Kato','male'),('Kay','female'),('Kaye','female'),('Keane','male'),('Keaton','male'),('Keefe','male'),('Keegan','male'),('Keelie','female'),('Keely','female'),('Keiko','female'),('Keith','male'),('Kellie','female'),('Kelly','female'),('Kelly','male'),('Kelsey','female'),('Kelsie','female'),('Kendall','both'),('Kennan','male'),('Kennedy','male'),('Kenneth','male'),('Kenyon','male'),('Kermit','male'),('Kerry','female'),('Kessie','female'),('Kevin','male'),('Kevyn','female'),('Kiara','female'),('Kiayada','female'),('Kibo','male'),('Kieran','male'),('Kim','female'),('Kimberley','female'),('Kimberly','female'),('Kiona','female'),('Kirby','female'),('Kirestin','female'),('Kirk','male'),('Kirsten','female'),('Kitra','female'),('Knox','male'),('Kristen','female'),('Kuame','male'),('Kyla','female'),('Kylan','female'),('Kyle','male'),('Kylee','female'),('Kylie','female'),('Kylynn','female'),('Kyra','female'),('Lacey','female'),('Lacota','female'),('Lacy','female'),('Lael','female'),('Laith','male'),('Lamar','male'),('Lana','female'),('Lance','male'),('Lane','male'),('Lani','female'),('Lara','female'),('Lareina','female'),('Larissa','female'),('Lars','male'),('Latifah','female'),('Laura','female'),('Laurel','female'),('Lavinia','female'),('Lawrence','male'),('Leah','female'),('Leandra','female'),('Lee','female'),('Lee','male'),('Leigh','female'),('Leila','female'),('Leilani','female'),('Len','male'),('Lenore','female'),('Leo','male'),('Leonard','male'),('Leroy','male'),('Lesley','female'),('Leslie','female'),('Lester','male'),('Lev','male'),('Levi','male'),('Lewis','male'),('Libby','female'),('Liberty','female'),('Lila','female'),('Lilah','female'),('Lillian','female'),('Lillith','female'),('Linda','female'),('Linus','male'),('Lionel','male'),('Lisandra','female'),('Logan','male'),('Lois','female'),('Louis','male'),('Lucas','male'),('Lucian','male'),('Lucius','male'),('Lucy','female'),('Luke','male'),('Lunea','female'),('Lydia','female'),('Lyle','male'),('Lynn','female'),('Lysandra','female'),('MacKensie','female'),('MacKenzie','female'),('Macaulay','male'),('Macey','female'),('Macon','male'),('Macy','female'),('Madaline','female'),('Madeline','female'),('Madeson','female'),('Madison','female'),('Madonna','female'),('Magee','male'),('Maggie','female'),('Maggy','female'),('Maia','female'),('Maile','female'),('Maisie','female'),('Maite','female'),('Malachi','male'),('Malcolm','male'),('Malik','male'),('Mallory','female'),('Mannix','male'),('Mara','female'),('Marah','female'),('Marcia','female'),('Margaret','female'),('Mari','female'),('Mariam','female'),('Mariko','female'),('Maris','female'),('Mark','male'),('Marny','female'),('Marsden','male'),('Marshall','male'),('Martena','female'),('Martha','female'),('Martin','male'),('Martina','female'),('Marvin','male'),('Mary','female'),('Maryam','female'),('Mason','male'),('Matthew','male'),('Maxine','female'),('Maxwell','male'),('May','female'),('Maya','female'),('McKenzie','female'),('Mechelle','female'),('Medge','female'),('Megan','female'),('Meghan','female'),('Melanie','female'),('Melinda','female'),('Melissa','female'),('Melodie','female'),('Melvin','male'),('Melyssa','female'),('Mercedes','female'),('Meredith','female'),('Merrill','male'),('Merritt','male'),('Mia','female'),('Micah','male'),('Michael','male'),('Michelle','female'),('Mikayla','female'),('Minerva','female'),('Mira','female'),('Miranda','female'),('Miriam','female'),('Moana','female'),('Mohammad','male'),('Mollie','female'),('Molly','female'),('Mona','female'),('Montana','female'),('Morgan','female'),('Moses','male'),('Mufutau','male'),('Murphy','male'),('Myles','male'),('Myra','female'),('Nadine','female'),('Naida','female'),('Naomi','female'),('Nash','male'),('Nasim','male'),('Natalie','female'),('Nathan','male'),('Nathaniel','male'),('Nayda','female'),('Nehru','male'),('Neil','male'),('Nell','female'),('Nelle','female'),('Nerea','female'),('Nero','male'),('Nevada','female'),('Neve','female'),('Neville','male'),('Nicholas','male'),('Nichole','female'),('Nicole','female'),('Nigel','male'),('Nina','female'),('Nissim','male'),('Nita','female'),('Noah','male'),('Noble','male'),('Noel','female'),('Noelani','female'),('Noelle','female'),('Nola','female'),('Nolan','male'),('Nomlanga','female'),('Nora','female'),('Norman','male'),('Nyssa','female'),('Ocean','female'),('Octavia','female'),('Octavius','male'),('Odessa','female'),('Odette','female'),('Odysseus','male'),('Oleg','male'),('Olga','female'),('Oliver','male'),('Olivia','female'),('Olympia','female'),('Omar','male'),('Oprah','female'),('Ora','female'),('Oren','male'),('Ori','female'),('Orla','female'),('Orlando','male'),('Orli','female'),('Orson','male'),('Oscar','male'),('Otto','male'),('Owen','male'),('Paki','male'),('Palmer','male'),('Paloma','female'),('Pamela','female'),('Pandora','female'),('Pascale','female'),('Patience','female'),('Patricia','female'),('Patrick','male'),('Paul','male'),('Paula','female'),('Pearl','female'),('Penelope','female'),('Perry','male'),('Peter','male'),('Petra','female'),('Phelan','male'),('Philip','male'),('Phillip','male'),('Phoebe','female'),('Phyllis','female'),('Piper','female'),('Plato','male'),('Porter','male'),('Portia','female'),('Prescott','male'),('Preston','male'),('Price','male'),('Priscilla','female'),('Quail','female'),('Quamar','male'),('Quemby','female'),('Quentin','male'),('Quin','female'),('Quincy','both'),('Quinlan','male'),('Quinn','female'),('Quinn','male'),('Quintessa','female'),('Quon','female'),('Quyn','female'),('Quynn','female'),('Rachel','female'),('Rae','female'),('Rafael','male'),('Rahim','male'),('Raja','male'),('Rajah','male'),('Ralph','male'),('Rama','female'),('Ramona','female'),('Rana','female'),('Randall','male'),('Raphael','male'),('Rashad','male'),('Raven','female'),('Ray','male'),('Raya','female'),('Raymond','male'),('Reagan','female'),('Rebecca','female'),('Rebekah','female'),('Reece','male'),('Reed','male'),('Reese','male'),('Regan','female'),('Regina','female'),('Remedios','female'),('Renee','female'),('Reuben','male'),('Rhea','female'),('Rhiannon','female'),('Rhoda','female'),('Rhona','female'),('Rhonda','female'),('Ria','female'),('Richard','male'),('Rigel','male'),('Riley','female'),('Rina','female'),('Rinah','female'),('Risa','female'),('Roanna','female'),('Roary','female'),('Robert','male'),('Robin','female'),('Rogan','male'),('Ronan','male'),('Rooney','male'),('Rosalyn','female'),('Rose','female'),('Ross','male'),('Roth','male'),('Rowan','female'),('Ruby','female'),('Rudyard','male'),('Russell','male'),('Ruth','female'),('Ryan','male'),('Ryder','male'),('Rylee','female'),('Sacha','female'),('Sade','female'),('Sage','female'),('Salvador','male'),('Samantha','female'),('Samson','male'),('Samuel','male'),('Sandra','female'),('Sara','female'),('Sarah','female'),('Sasha','female'),('Savannah','female'),('Sawyer','male'),('Scarlet','female'),('Scarlett','female'),('Scott','male'),('Sean','male'),('Sebastian','male'),('Selma','female'),('September','female'),('Serena','female'),('Serina','female'),('Seth','male'),('Shad','male'),('Shaeleigh','female'),('Shafira','female'),('Shaine','female'),('Shana','female'),('Shannon','female'),('Sharon','female'),('Shay','female'),('Shea','female'),('Sheila','female'),('Shelby','female'),('Shelley','female'),('Shellie','female'),('Shelly','female'),('Shoshana','female'),('Sierra','female'),('Signe','female'),('Sigourney','female'),('Silas','male'),('Simon','male'),('Simone','female'),('Skyler','female'),('Slade','male'),('Sloane','both'),('Solomon','male'),('Sonia','female'),('Sonya','female'),('Sophia','female'),('Sopoline','female'),('Stacey','female'),('Stacy','female'),('Steel','male'),('Stella','female'),('Stephanie','female'),('Stephen','male'),('Steven','male'),('Stewart','male'),('Stone','male'),('Stuart','male'),('Suki','female'),('Summer','female'),('Susan','female'),('Sybil','female'),('Sybill','female'),('Sydnee','female'),('Sydney','female'),('Sylvester','male'),('Sylvia','female'),('TaShya','female'),('Tad','male'),('Tallulah','female'),('Talon','male'),('Tamara','female'),('Tamekah','female'),('Tana','female'),('Tanek','male'),('Tanisha','female'),('Tanner','male'),('Tanya','female'),('Tara','female'),('Tarik','male'),('Tasha','female'),('Tashya','female'),('Tate','male'),('Tatiana','female'),('Tatum','female'),('Tatyana','female'),('Taylor','both'),('Teagan','female'),('Teegan','female'),('Thaddeus','male'),('Thane','male'),('Theodore','male'),('Thomas','male'),('Thor','male'),('Tiger','male'),('Timon','male'),('Timothy','male'),('Tobias','male'),('Todd','male'),('Travis','male'),('Trevor','male'),('Troy','male'),('Tucker','male'),('Tyler','male'),('Tyrone','male'),('Ulla','female'),('Ulric','male'),('Ulysses','male'),('Uma','female'),('Unity','female'),('Upton','male'),('Uriah','male'),('Uriel','male'),('Urielle','female'),('Ursa','female'),('Ursula','female'),('Uta','female'),('Valentine','male'),('Vance','male'),('Vanna','female'),('Vaughan','male'),('Veda','female'),('Velma','female'),('Venus','female'),('Vera','female'),('Vernon','male'),('Veronica','female'),('Victor','male'),('Victoria','female'),('Vielka','female'),('Vincent','male'),('Violet','female'),('Virginia','female'),('Vivian','female'),('Vivien','female'),('Vladimir','male'),('Wade','male'),('Walker','male'),('Wallace','male'),('Walter','male'),('Wanda','female'),('Wang','male'),('Warren','male'),('Wayne','male'),('Wendy','female'),('Wesley','male'),('Whilemina','female'),('Whitney','female'),('Whoopi','female'),('Willa','female'),('William','male'),('Willow','female'),('Wilma','female'),('Wing','male'),('Winifred','female'),('Winter','female'),('Wyatt','male'),('Wylie','male'),('Wynne','female'),('Wynter','female'),('Wyoming','female'),('Xander','male'),('Xandra','female'),('Xantha','female'),('Xanthus','male'),('Xavier','male'),('Xaviera','female'),('Xena','female'),('Xenos','male'),('Xerxes','both'),('Xyla','female'),('Yael','female'),('Yardley','male'),('Yasir','male'),('Yen','female'),('Yeo','female'),('Yetta','female'),('Yoko','female'),('Yolanda','female'),('Yoshi','female'),('Yoshio','male'),('Yuli','male'),('Yuri','female'),('Yvette','female'),('Yvonne','female'),('Zachary','male'),('Zachery','male'),('Zahir','male'),('Zane','male'),('Zelda','female'),('Zelenia','female'),('Zena','female'),('Zenaida','female'),('Zenia','female'),('Zeph','male'),('Zephania','male'),('Zephr','female'),('Zeus','male'),('Zia','female'),('Zoe','female'),('Zorita','female'),('Jacqueline','female')
		";
		$queries[] = "
			CREATE TABLE {$prefix}last_names (
				id mediumint(9) NOT NULL auto_increment,
				last_name varchar(100) NOT NULL default '',
				PRIMARY KEY (id)
			)
		";
		$queries[] = "
			INSERT INTO {$prefix}last_names (last_name)
			VALUES ('Abbott'),('Acevedo'),('Acosta'),('Adams'),('Adkins'),('Aguilar'),('Aguirre'),('Albert'),('Alexander'),('Alford'),('Allen'),('Allison'),('Alston'),('Alvarado'),('Alvarez'),('Anderson'),('Andrews'),('Anthony'),('Armstrong'),('Arnold'),('Ashley'),('Atkins'),('Atkinson'),('Austin'),('Avery'),('Avila'),('Ayala'),('Ayers'),('Bailey'),('Baird'),('Baker'),('Baldwin'),('Ball'),('Ballard'),('Banks'),('Barber'),('Barker'),('Barlow'),('Barnes'),('Barnett'),('Barr'),('Barrera'),('Barrett'),('Barron'),('Barry'),('Bartlett'),('Barton'),('Bass'),('Bates'),('Battle'),('Bauer'),('Baxter'),('Beach'),('Bean'),('Beard'),('Beasley'),('Beck'),('Becker'),('Bell'),('Bender'),('Benjamin'),('Bennett'),('Benson'),('Bentley'),('Benton'),('Berg'),('Berger'),('Bernard'),('Berry'),('Best'),('Bird'),('Bishop'),('Black'),('Blackburn'),('Blackwell'),('Blair'),('Blake'),('Blanchard'),('Blankenship'),('Blevins'),('Bolton'),('Bond'),('Bonner'),('Booker'),('Boone'),('Booth'),('Bowen'),('Bowers'),('Bowman'),('Boyd'),('Boyer'),('Boyle'),('Bradford'),('Bradley'),('Bradshaw'),('Brady'),('Branch'),('Bray'),('Brennan'),('Brewer'),('Bridges'),('Briggs'),('Bright'),('Britt'),('Brock'),('Brooks'),('Brown'),('Browning'),('Bruce'),('Bryan'),('Bryant'),('Buchanan'),('Buck'),('Buckley'),('Buckner'),('Bullock'),('Burch'),('Burgess'),('Burke'),('Burks'),('Burnett'),('Burns'),('Burris'),('Burt'),('Burton'),('Bush'),('Butler'),('Byers'),('Byrd'),('Cabrera'),('Cain'),('Calderon'),('Caldwell'),('Calhoun'),('Callahan'),('Camacho'),('Cameron'),('Campbell'),('Campos'),('Cannon'),('Cantrell'),('Cantu'),('Cardenas'),('Carey'),('Carlson'),('Carney'),('Carpenter'),('Carr'),('Carrillo'),('Carroll'),('Carson'),('Carter'),('Carver'),('Case'),('Casey'),('Cash'),('Castaneda'),('Castillo'),('Castro'),('Cervantes'),('Chambers'),('Chan'),('Chandler'),('Chaney'),('Chang'),('Chapman'),('Charles'),('Chase'),('Chavez'),('Chen'),('Cherry'),('Christensen'),('Christian'),('Church'),('Clark'),('Clarke'),('Clay'),('Clayton'),('Clements'),('Clemons'),('Cleveland'),('Cline'),('Cobb'),('Cochran'),('Coffey'),('Cohen'),('Cole'),('Coleman'),('Collier'),('Collins'),('Colon'),('Combs'),('Compton'),('Conley'),('Conner'),('Conrad'),('Contreras'),('Conway'),('Cook'),('Cooke'),('Cooley'),('Cooper'),('Copeland'),('Cortez'),('Cote'),('Cotton'),('Cox'),('Craft'),('Craig'),('Crane'),('Crawford'),('Crosby'),('Cross'),('Cruz'),('Cummings'),('Cunningham'),('Curry'),('Curtis'),('Dale'),('Dalton'),('Daniel'),('Daniels'),('Daugherty'),('Davenport'),('David'),('Davidson'),('Davis'),('Dawson'),('Day'),('Dean'),('Decker'),('Dejesus'),('Delacruz'),('Delaney'),('Deleon'),('Delgado'),('Dennis'),('Diaz'),('Dickerson'),('Dickson'),('Dillard'),('Dillon'),('Dixon'),('Dodson'),('Dominguez'),('Donaldson'),('Donovan'),('Dorsey'),('Dotson'),('Douglas'),('Downs'),('Doyle'),('Drake'),('Dudley'),('Duffy'),('Duke'),('Duncan'),('Dunlap'),('Dunn'),('Duran'),('Durham'),('Dyer'),('Eaton'),('Edwards'),('Elliott'),('Ellis'),('Ellison'),('Emerson'),('England'),('English'),('Erickson'),('Espinoza'),('Estes'),('Estrada'),('Evans'),('Everett'),('Ewing'),('Farley'),('Farmer'),('Farrell'),('Faulkner'),('Ferguson'),('Fernandez'),('Ferrell'),('Fields'),('Figueroa'),('Finch'),('Finley'),('Fischer'),('Fisher'),('Fitzgerald'),('Fitzpatrick'),('Fleming'),('Fletcher'),('Flores'),('Flowers'),('Floyd'),('Flynn'),('Foley'),('Forbes'),('Ford'),('Foreman'),('Foster'),('Fowler'),('Fox'),('Francis'),('Franco'),('Frank'),('Franklin'),('Franks'),('Frazier'),('Frederick'),('Freeman'),('French'),('Frost'),('Fry'),('Frye'),('Fuentes'),('Fuller'),('Fulton'),('Gaines'),('Gallagher'),('Gallegos'),('Galloway'),('Gamble'),('Garcia'),('Gardner'),('Garner'),('Garrett'),('Garrison'),('Garza'),('Gates'),('Gay'),('Gentry'),('George'),('Gibbs'),('Gibson'),('Gilbert'),('Giles'),('Gill'),('Gillespie'),('Gilliam'),('Gilmore'),('Glass'),('Glenn'),('Glover'),('Goff'),('Golden'),('Gomez'),('Gonzales'),('Gonzalez'),('Good'),('Goodman'),('Goodwin'),('Gordon'),('Gould'),('Graham'),('Grant'),('Graves'),('Gray'),('Green'),('Greene'),('Greer'),('Gregory'),('Griffin'),('Griffith'),('Grimes'),('Gross'),('Guerra'),('Guerrero'),('Guthrie'),('Gutierrez'),('Guy'),('Guzman'),('Hahn'),('Hale'),('Haley'),('Hall'),('Hamilton'),('Hammond'),('Hampton'),('Hancock'),('Haney'),('Hansen'),('Hanson'),('Hardin'),('Harding'),('Hardy'),('Harmon'),('Harper'),('Harrell'),('Harrington'),('Harris'),('Harrison'),('Hart'),('Hartman'),('Harvey'),('Hatfield'),('Hawkins'),('Hayden'),('Hayes'),('Haynes'),('Hays'),('Head'),('Heath'),('Hebert'),('Henderson'),('Hendricks'),('Hendrix'),('Henry'),('Hensley'),('Henson'),('Herman'),('Hernandez'),('Herrera'),('Herring'),('Hess'),('Hester'),('Hewitt'),('Hickman'),('Hicks'),('Higgins'),('Hill'),('Hines'),('Hinton'),('Hobbs'),('Hodge'),('Hodges'),('Hoffman'),('Hogan'),('Holcomb'),('Holden'),('Holder'),('Holland'),('Holloway'),('Holman'),('Holmes'),('Holt'),('Hood'),('Hooper'),('Hoover'),('Hopkins'),('Hopper'),('Horn'),('Horne'),('Horton'),('House'),('Houston'),('Howard'),('Howe'),('Howell'),('Hubbard'),('Huber'),('Hudson'),('Huff'),('Huffman'),('Hughes'),('Hull'),('Humphrey'),('Hunt'),('Hunter'),('Hurley'),('Hurst'),('Hutchinson'),('Hyde'),('Ingram'),('Irwin'),('Jackson'),('Jacobs'),('Jacobson'),('James'),('Jarvis'),('Jefferson'),('Jenkins'),('Jennings'),('Jensen'),('Jimenez'),('Johns'),('Johnson'),('Johnston'),('Jones'),('Jordan'),('Joseph'),('Joyce'),('Joyner'),('Juarez'),('Justice'),('Kane'),('Kaufman'),('Keith'),('Keller'),('Kelley'),('Kelly'),('Kemp'),('Kennedy'),('Kent'),('Kerr'),('Key'),('Kidd'),('Kim'),('King'),('Kinney'),('Kirby'),('Kirk'),('Kirkland'),('Klein'),('Kline'),('Knapp'),('Knight'),('Knowles'),('Knox'),('Koch'),('Kramer'),('Lamb'),('Lambert'),('Lancaster'),('Landry'),('Lane'),('Lang'),('Langley'),('Lara'),('Larsen'),('Larson'),('Lawrence'),('Lawson'),('Le'),('Leach'),('Leblanc'),('Lee'),('Leon'),('Leonard'),('Lester'),('Levine'),('Levy'),('Lewis'),('Lindsay'),('Lindsey'),('Little'),('Livingston'),('Lloyd'),('Logan'),('Long'),('Lopez'),('Lott'),('Love'),('Lowe'),('Lowery'),('Lucas'),('Luna'),('Lynch'),('Lynn'),('Lyons'),('Macdonald'),('Macias'),('Mack'),('Madden'),('Maddox'),('Maldonado'),('Malone'),('Mann'),('Manning'),('Marks'),('Marquez'),('Marsh'),('Marshall'),('Martin'),('Martinez'),('Mason'),('Massey'),('Mathews'),('Mathis'),('Matthews'),('Maxwell'),('May'),('Mayer'),('Maynard'),('Mayo'),('Mays'),('Mcbride'),('Mccall'),('Mccarthy'),('Mccarty'),('Mcclain'),('Mcclure'),('Mcconnell'),('Mccormick'),('Mccoy'),('Mccray'),('Mccullough'),('Mcdaniel'),('Mcdonald'),('Mcdowell'),('Mcfadden'),('Mcfarland'),('Mcgee'),('Mcgowan'),('Mcguire'),('Mcintosh'),('Mcintyre'),('Mckay'),('Mckee'),('Mckenzie'),('Mckinney'),('Mcknight'),('Mclaughlin'),('Mclean'),('Mcleod'),('Mcmahon'),('Mcmillan'),('Mcneil'),('Mcpherson'),('Meadows'),('Medina'),('Mejia'),('Melendez'),('Melton'),('Mendez'),('Mendoza'),('Mercado'),('Mercer'),('Merrill'),('Merritt'),('Meyer'),('Meyers'),('Michael'),('Middleton'),('Miles'),('Miller'),('Mills'),('Miranda'),('Mitchell'),('Molina'),('Monroe'),('Montgomery'),('Montoya'),('Moody'),('Moon'),('Mooney'),('Moore'),('Morales'),('Moran'),('Moreno'),('Morgan'),('Morin'),('Morris'),('Morrison'),('Morrow'),('Morse'),('Morton'),('Moses'),('Mosley'),('Moss'),('Mueller'),('Mullen'),('Mullins'),('Munoz'),('Murphy'),('Murray'),('Myers'),('Nash'),('Navarro'),('Neal'),('Nelson'),('Newman'),('Newton'),('Nguyen'),('Nichols'),('Nicholson'),('Nielsen'),('Nieves'),('Nixon'),('Noble'),('Noel'),('Nolan'),('Norman'),('Norris'),('Norton'),('Nunez'),('Obrien'),('Ochoa'),('Oconnor'),('Odom'),('Odonnell'),('Oliver'),('Olsen'),('Olson'),('Oneal'),('Oneil'),('Oneill'),('Orr'),('Ortega'),('Ortiz'),('Osborn'),('Osborne'),('Owen'),('Owens'),('Pace'),('Pacheco'),('Padilla'),('Page'),('Palmer'),('Park'),('Parker'),('Parks'),('Parrish'),('Parsons'),('Pate'),('Patel'),('Patrick'),('Patterson'),('Patton'),('Paul'),('Payne'),('Pearson'),('Peck'),('Pena'),('Pennington'),('Perez'),('Perkins'),('Perry'),('Peters'),('Petersen'),('Peterson'),('Petty'),('Phelps'),('Phillips'),('Pickett'),('Pierce'),('Pittman'),('Pitts'),('Pollard'),('Poole'),('Pope'),('Porter'),('Potter'),('Potts'),('Powell'),('Powers'),('Pratt'),('Preston'),('Price'),('Prince'),('Pruitt'),('Puckett'),('Pugh'),('Quinn'),('Ramirez'),('Ramos'),('Ramsey'),('Randall'),('Randolph'),('Rasmussen'),('Ratliff'),('Ray'),('Raymond'),('Reed'),('Reese'),('Reeves'),('Reid'),('Reilly'),('Reyes'),('Reynolds'),('Rhodes'),('Rice'),('Rich'),('Richard'),('Richards'),('Richardson'),('Richmond'),('Riddle'),('Riggs'),('Riley'),('Rios'),('Rivas'),('Rivera'),('Rivers'),('Roach'),('Robbins'),('Roberson'),('Roberts'),('Robertson'),('Robinson'),('Robles'),('Rocha'),('Rodgers'),('Rodriguez'),('Rodriquez'),('Rogers'),('Rojas'),('Rollins'),('Roman'),('Romero'),('Rosa'),('Rosales'),('Rosario'),('Rose'),('Ross'),('Roth'),('Rowe'),('Rowland'),('Roy'),('Ruiz'),('Rush'),('Russell'),('Russo'),('Rutledge'),('Ryan'),('Salas'),('Salazar'),('Salinas'),('Sampson'),('Sanchez'),('Sanders'),('Sandoval'),('Sanford'),('Santana'),('Santiago'),('Santos'),('Sargent'),('Saunders'),('Savage'),('Sawyer'),('Schmidt'),('Schneider'),('Schroeder'),('Schultz'),('Schwartz'),('Scott'),('Sears'),('Sellers'),('Serrano'),('Sexton'),('Shaffer'),('Shannon'),('Sharp'),('Sharpe'),('Shaw'),('Shelton'),('Shepard'),('Shepherd'),('Sheppard'),('Sherman'),('Shields'),('Short'),('Silva'),('Simmons'),('Simon'),('Simpson'),('Sims'),('Singleton'),('Skinner'),('Slater'),('Sloan'),('Small'),('Smith'),('Snider'),('Snow'),('Snyder'),('Solis'),('Solomon'),('Sosa'),('Soto'),('Sparks'),('Spears'),('Spence'),('Spencer'),('Stafford'),('Stanley'),('Stanton'),('Stark'),('Steele'),('Stein'),('Stephens'),('Stephenson'),('Stevens'),('Stevenson'),('Stewart'),('Stokes'),('Stone'),('Stout'),('Strickland'),('Strong'),('Stuart'),('Suarez'),('Sullivan'),('Summers'),('Sutton'),('Swanson'),('Sweeney'),('Sweet'),('Sykes'),('Talley'),('Tanner'),('Tate'),('Taylor'),('Terrell'),('Terry'),('Thomas'),('Thompson'),('Thornton'),('Tillman'),('Todd'),('Torres'),('Townsend'),('Tran'),('Travis'),('Trevino'),('Trujillo'),('Tucker'),('Turner'),('Tyler'),('Tyson'),('Underwood'),('Valdez'),('Valencia'),('Valentine'),('Valenzuela'),('Vance'),('Vang'),('Vargas'),('Vasquez'),('Vaughan'),('Vaughn'),('Vazquez'),('Vega'),('Velasquez'),('Velazquez'),('Velez'),('Villarreal'),('Vincent'),('Vinson'),('Wade'),('Wagner'),('Walker'),('Wall'),('Wallace'),('Waller'),('Walls'),('Walsh'),('Walter'),('Walters'),('Walton'),('Ward'),('Ware'),('Warner'),('Warren'),('Washington'),('Waters'),('Watkins'),('Watson'),('Watts'),('Weaver'),('Webb'),('Weber'),('Webster'),('Weeks'),('Weiss'),('Welch'),('Wells'),('West'),('Wheeler'),('Whitaker'),('White'),('Whitehead'),('Whitfield'),('Whitley'),('Whitney'),('Wiggins'),('Wilcox'),('Wilder'),('Wiley'),('Wilkerson'),('Wilkins'),('Wilkinson'),('William'),('Williams'),('Williamson'),('Willis'),('Wilson'),('Winters'),('Wise'),('Witt'),('Wolf'),('Wolfe'),('Wong'),('Wood'),('Woodard'),('Woods'),('Woodward'),('Wooten'),('Workman'),('Wright'),('Wyatt'),('Wynn'),('Yang'),('Yates'),('York'),('Young'),('Zamora'),('Zimmerman')
		";

		$response = Core::$db->query($queries, $rollbackQueries);

		if ($response["success"]) {
			return array(true, "");
		} else {
			return array(false, $response["errorMessage"]);
		}
	}


	public function getHelpHTML() {
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

	public function getRestOptionsFormat() {
		return array(
			"required" => true,
			"type" => "string"
		);
	}

}
