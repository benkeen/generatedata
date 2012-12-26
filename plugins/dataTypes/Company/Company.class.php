<?php

/**
 * @package DataTypes
 */

class DataType_Company extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "Company Names";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 50;
	private $helpDialogWidth = 340;
	private $companyTypes = array(
		"Company", "Corp.", "Corporation", "Inc.", "Incorporated", "LLC", "LLP", "Ltd", "Limited",
		"PC", "Foundation", "Institute", "Associates", "Industries", "Consulting"
	);
	private $numCompanyTypes;
	private $words;
	private $numWords;


	/**
	 * Our custom constructor. This instantiates $words and $numWords for use by the generate() function.
	 *
	 * @param string $runtimeContext
	 */
	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			$this->words = Utils::getLipsum();
			$this->numWords = count($this->words);
			$this->numCompanyTypes = count($this->companyTypes);
		}
	}

	public function generate($generator, $generationContextData) {
		$numCompanyNameWords = rand(1, 3);
		$offset = rand(0, $this->numWords - ($numCompanyNameWords + 1));
		$words = array_slice($this->words, $offset, $numCompanyNameWords);
		$words = preg_replace("/[,.:]/", "", $words);
		$companyType = $this->companyTypes[rand(0, $this->numCompanyTypes-1)];

		return array(
			"display" => ucwords(implode(" ", $words) . " " . $companyType)
		);
	}

	public function getDataTypeMetadata() {
		return array(
			"sqlField" => "varchar(255)",
			"sqlField_Oracle" => "varchar2(255)"
		);
	}

	public function getHelpHTML() {
		return "<p>{$this->L["help"]}</p>";
	}
}
