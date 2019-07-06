<?php

/**
 * @package DataTypes
 */


class DataType_Rut extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Rut";
	protected $dataTypeFieldGroup = "human_data";
	protected $dataTypeFieldGroupOrder = 105;
	protected $jsModules = array("Rut.js");

	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];
		
		$rowRutInfo = array();
		while (list($key, $info) = each($generationContextData["existingRowData"])) {
			if ($info["dataTypeFolder"] == "Rut") {
				$rowRutInfo = $info;
				break;
			}
		}
		reset($generationContextData["existingRowData"]);
		
		if (!empty($rowRutInfo)) {
            $rutn = $info["randomData"]["rut"];
            $digit = $info["randomData"]["digit"];
		} else {
			$rutn = sprintf("%d%03d%03d", mt_rand(5, 50), mt_rand(0,999), mt_rand(0,999));
            $digit = $this->getDigit($rutn);
        }

		$display = "";
			
        if (strpos($options["formatCode"], "xxxxxxxx") !== false) {
            if ($options["thousep"]) {
                $display = number_format($rutn, 0, ",", ".");
            } else {
                $display = $rutn;
            }
        }

        if (strpos($options["formatCode"], "xxxxxxxx-y") !== false) {
            if (!$options["remdash"]) {
                $display .= "-";
            }
        }
			
		if (strpos($options["formatCode"], "y") !== false) {
			if ($options["upper"]) {
				$display .= strtoupper($digit);
			} else {
				$display .= $digit;
			}
		}
		
		return array(
			"display" => $display,
            "rut"     => $rutn,
            "digit"   => $digit
		);
    }
	
	public function getDataTypeMetadata() {
        return array(
            "SQLField" => "varchar(15) default NULL",
            "SQLField_Oracle" => "varchar2(15) default NULL",
            "SQLField_MSSQL" => "VARCHAR(15) NULL"
        );
    }
	
	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();
		
		$html =<<<EOF
	<select name="dtExample_%ROW%" id="dtExample_%ROW%">
		<option value="">{$L["please_select"]}</option>
		<option value="xxxxxxxx-y">12345678-9 ({$this->L["rut_default"]})</option>
		<option value="xxxxxxxx">12345678 ({$this->L["only_number"]})</option>
		<option value="y">9 ({$this->L["only_digit"]})</option>
	</select>
EOF;
		return $html;
	}
	
	public function getRowGenerationOptionsUI($generator, $postdata, $column, $numCols) {
		return array(
			"formatCode" => $postdata["dtExample_$column"],
			"thousep" => isset($postdata["dtThouSep_$column"]) ? true : false,
			"upper" => isset($postdata["dtUpperDigit_$column"]) ? true : false,
			"remdash" => isset($postdata["dtRemoveDash_$column"]) ? true : false
		);
    }
	
	public function getRowGenerationOptionsAPI($generator, $json, $numCols) {
		return array(
			"formatCode" => $json->settings->placeholder,
			"thousep" => $json->settings->thousep,
			"upper" => $json->settings->upper,
			"remdash" => $json->settings->remdash
		);
	}
	
	public function getOptionsColumnHTML() {
		$html =<<< END
<input type="checkbox" name="dtThouSep_%ROW%" id="dtThouSep_%ROW%" />
	<label for="dtThouSep_%ROW%">{$this->L["thousands_separator"]}</label><br/>
<input type="checkbox" name="dtUpperDigit_%ROW%" id="dtUpperDigit_%ROW%" checked="checked" />
	<label for="dtUpperDigit_%ROW%">{$this->L["digit_uppercase"]}</label><br/>
<input type="checkbox" name="dtRemoveDash_%ROW%" id="dtRemoveDash_%ROW%" />
	<label for="dtRemoveDash_%ROW%">{$this->L["remove_dash"]}</label>
END;
		return $html;
	}
	
	private function getDigit($rut){
		$rutA = array_reverse(str_split($rut));
		
		for($i = 0, $n = 0; $i<count($rutA); $n += $rutA[$i] * ($i % 6 + 2), $i++);
		$digit = 11 - $n % 11;
		
		if($digit == 10) return "k";
		if($digit == 11) return "0";
		return $digit;
	}
}
