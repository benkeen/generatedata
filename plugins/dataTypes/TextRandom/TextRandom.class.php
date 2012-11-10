<?php

class DataType_TextRandom extends DataTypePlugin {
	protected $dataTypeName = "Random Number of Words";
	protected $dataTypeFieldGroup = "text";
	protected $dataTypeFieldGroupOrder = 20;
	protected $jsModules = array("TextRandom.js");
	private $helpDialogWidth = 370;
	private $words;

	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			$this->words = Utils::getLipsum();
		}
	}

	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];
		return Utils::generateRandomTextStr($this->words, $options["startsWithLipsum"], "range", $options["numWordsMin"], $options["numWordsMax"]);
	}

	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($exportType) {
			case "sql":
				if ($options == "MySQL" || $options == "SQLite") {
					$info = "TEXT default NULL";
				} else if ($options == "Oracle") {
        			$info = "BLOB default NULL";
				}
  				break;
		}
		return $info;
	}

	public function getRowGenerationOptions($generator, $postdata, $column, $numCols) {
		if (empty($postdata["dtNumWordsMin_$column"]) || empty($postdata["dtNumWordsMin_$column"])) {
			return false;
		}

		$options = array(
			"numWordsMin"      => $postdata["dtNumWordsMin_$column"],
			"numWordsMax"      => $postdata["dtNumWordsMax_$column"],
			"startsWithLipsum" => isset($postdata["dtStartsWithLipsum_$column"]) ? true : false
		);

		return $options;
	}

	public function getOptionsColumnHTML() {
		$html =<<< END
		<div>
			<input type="checkbox" name="dtStartsWithLipsum_%ROW%" id="dtStartsWithLipsum_%ROW%" />
			<label for="dtStartsWithLipsum_%ROW%">Start with "Lorem Ipsum..."</label>
		</div>
		<div>
			Generate #<input type="text" name="dtNumWordsMin_%ROW%" id="dtNumWordsMin_%ROW%" style="width: 40px" value="1" />
			to #<input type="text" name="dtNumWordsMax_%ROW%" id="dtNumWordsMax_%ROW%" style="width: 40px" value="10" /> words
		</div>
END;
		return $html;
	}

	public function getHelpDialogInfo() {
		return array(
			"dialogWidth" => $this->helpDialogWidth,
			"content"     => "<p>This option generates a random number of words - the total number within the range that you specify (inclusive). As with the Fixed number option, the words are pulled the standard lorem ipsum latin text.</p>"
		);
	}
}
