import { DTGenerateResult, DTMetadata } from '../../../../types/dataTypes';

export const generate = (): DTGenerateResult => {
	return { display: '' };
};

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'TEXT default NULL',
		field_Oracle: 'BLOB default NULL',
		field_MSSQL: 'VARCHAR(MAX) NULL'
	}
});

/*
class DataType_Composite extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Composite";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "other";
	protected $dataTypeFieldGroupOrder = 20;
	protected $jsModules = array("Composite.js");
	protected $processOrder = 150;
	private $smarty;

	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			$this->smarty = new SecureSmarty();
			$this->smarty->template_dir = realpath(__DIR__ . "/../../../resources/libs/smarty");
			$this->smarty->compile_dir  = realpath(__DIR__ . "/../../../cache");
		}
	}

	public function generate($generator, $generationContextData) {
		$placeholders = array();
		foreach ($generationContextData["existingRowData"] as $rowInfo) {
			$colNum = $rowInfo["colNum"];
			$randomData  = is_array($rowInfo["randomData"]) ? $rowInfo["randomData"]["display"] : $rowInfo["randomData"];
			$placeholders["ROW{$colNum}"] = $randomData;
		}
		while (list($key, $value) = each($placeholders)) {
			$this->smarty->assign($key, $value);
		}
		$output = $this->smarty->fetch('string:' . $generationContextData["generationOptions"]);

		return array(
			"display" => $output
		);
	}

	public function getRowGenerationOptionsUI($generator, $postdata, $col, $num_cols) {
		if (!isset($postdata["dtOption_$col"]) || empty($postdata["dtOption_$col"])) {
			return false;
		}
		return $postdata["dtOption_$col"];
	}

	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		if (empty($json->settings->placeholder)) {
			return false;
		}
		return $json->settings->placeholder;
	}
}
*/
