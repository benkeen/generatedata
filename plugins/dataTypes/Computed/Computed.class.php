<?php

/**
 * @package DataTypes
 */

class DataType_Computed extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "Computed";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "other";
    protected $dataTypeFieldGroupOrder = 60;
    protected $jsModules = array("Computed.js");
    private $smarty;

    // this should always be highest for all Data Types. Point is, this Data Type needs to be able to access the
    // result of all other fields to work. Composite works similarly, but it has a lower process order (150) so this
    // field trumps everything and executes last
    protected $processOrder = 200;

    public function __construct($runtimeContext) {
        parent::__construct($runtimeContext);
        if ($runtimeContext == "generation") {
            $this->smarty = new SecureSmarty();
            $this->smarty->template_dir = realpath(__DIR__ . "/../../../resources/libs/smarty");
            $this->smarty->compile_dir  = realpath(__DIR__ . "/../../../cache");
        }
    }

	public function generate($generator, $generationContextData) {
        foreach ($generationContextData["existingRowData"] as $row) {
            $colNum = $row["colNum"];
            $rowInfo = array(
                "OPTIONS"      => $row["generationOptions"],
                "COL_METADATA" => $row["columnMetadata"],
                "DATA"         => $row["randomData"]
            );
            $debug = json_encode($rowInfo);
            $rowInfo["DEBUG"] = $debug;

            $this->smarty->assign("ROW{$colNum}", $rowInfo);
        }

		return array(
			"display" => $this->smarty->fetch('string:' . $generationContextData["generationOptions"])
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

    public function getExampleColumnHTML() {
        $L = Core::$language->getCurrentLanguageStrings();
        return $L["see_help_dialog"];
    }

    public function getOptionsColumnHTML() {
        return '<textarea name="dtOption_%ROW%" id="dtOption_%ROW%" style="height: 70px; width: 260px"></textarea>';
    }

	public function getHelpHTML() {
        $content =<<<EOF
	<p>
	    {$this->L["help_para1"]}          
	</p>
	
    <p>
        {$this->L["help_para2"]} 
    </p>
    
    <ul>
        <li>{$this->L["help_prop1"]}</li>
        <li>{$this->L["help_prop2"]}</li>
        <li>{$this->L["help_prop3"]}</li>
        <li>{$this->L["help_prop4"]}</li>
    </ul>

    <b>{$this->L["example"]}</b>

    <ul>
        <li>{$this->L["example1"]}</li>
    </ul>

EOF;

        return $content;
	}
}
