<?php

class DataType_TextRandom extends DataTypePlugin {
	protected $dataTypeName = "Random Number of Words";
	protected $dataTypeFieldGroup = "text";
	protected $dataTypeFieldGroupOrder = 20;
	protected $jsModules = array("TextRandom.js");
	private $helpDialogWidth = 370;


	public function generate($row, $options, $existingRowData) {
	}

	public function getExportTypeInfo($exportType, $options) {
	}

	public function getRowGenerationOptions($postdata, $column, $numCols) {
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
