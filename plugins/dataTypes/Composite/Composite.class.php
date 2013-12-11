<?php

/**
 * @package DataTypes
 */

class DataType_Composite extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "Composite";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "other";
	protected $dataTypeFieldGroupOrder = 20;
	protected $jsModules = array("Composite.js");
	protected $processOrder = 100;
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

	public function getRowGenerationOptions($generator, $postdata, $col, $num_cols) {
		if (!isset($postdata["dtOption_$col"]) || empty($postdata["dtOption_$col"])) {
			return false;
		}
		return $postdata["dtOption_$col"];
	}

	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();
		return $L["see_help_dialog"];
	}

	public function getOptionsColumnHTML() {
		return '<textarea name="dtOption_%ROW%" id="dtOption_%ROW%" style="height: 70px; width: 260px"></textarea>';
	}

	public function getHelpHTML() {
		$content =<<< END
	<p>
		{$this->L["Composite_help_1"]}
	</p>
	<p>
		{$this->L["Composite_help_2"]}
	</p>
	<p>
		{$this->L["Composite_help_3"]}
	</p>
	<ul>
		<li>{$this->L["Composite_help_4"]}</li>
		<li>{$this->L["Composite_help_5"]}
			<ul>
				<li><b>{\$ROW2-\$ROW1}</b> - {$this->L["Composite_subtraction"]}</li>
				<li><b>{\$ROW2*\$ROW1}</b> - {$this->L["Composite_multiplication"]}</li>
				<li><b>{\$ROW2/\$ROW1}</b> - {$this->L["Composite_division"]}</li>
			</ul>
		</li>
		<li>
			{$this->L["Composite_help_6"]}
			<b>{if \$ROW1 == 5}{$this->L["Composite_na"]}{else}{\$ROW1}{/if}</b>
		</li>
	</ul>
	<p>
		{$this->L["Composite_help_7"]}
	</p>
END;

		return $content;
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "TEXT default NULL",
			"SQLField_Oracle" => "BLOB default NULL",
			"SQLField_MSSQL" => "VARCHAR(MAX) NULL"
		);
	}
}
