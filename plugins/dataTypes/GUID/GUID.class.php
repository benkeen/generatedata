<?php


class DataType_GUID extends DataTypePlugin {
	protected $dataTypeName = "GUID";
	protected $dataTypeFieldGroup = "numeric";
	protected $dataTypeFieldGroupOrder = 50;
	private $generatedGUIDs = array();
	private $helpDialogWidth = 510;


	public function generate($generator, $generationContextData) {
		$placeholderStr = "HHHHHHHH-HHHH-HHHH-HHHH-HHHH-HHHHHHHH";
		$guid = Utils::generateRandomAlphanumericStr($placeholderStr);

		// pretty sodding unlikely, but just in case!
		while (in_array($guid, $this->generatedGUIDs)) {
			$guid = Utils::generateRandomAlphanumericStr($placeholderStr);
		}
		$this->generatedGUIDs[] = $guid;

		return $guid;
	}

	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($exportType) {
			case "sql":
				if ($options == "MySQL" || $options == "SQLite") {
					$info = "varchar(36) NOT NULL";
				} else {
					$info = "varchar2(36) NOT NULL";
				}
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