<?php


class DataType_Company extends DataTypePlugin {

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
		return ucwords(implode(" ", $words) . " " . $companyType);
	}

	// TODO
	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($exportType) {
			case "sql":
				if ($options == "MySQL" || $options == "SQLite")
					$info = "varchar(255) default NULL";
				else if ($options == "Oracle")
					$info = "varchar2(255) default NULL";
				break;
		}

		return $info;
	}

	public function getHelpDialogInfo() {
		return array(
			"dialogWidth" => $this->helpDialogWidth,
			"content"     => "<p>{$this->L["help"]}</p>"
		);
	}
}
