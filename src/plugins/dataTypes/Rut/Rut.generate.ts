import { DTGenerateResult } from '../../../../types/dataTypes';

// data: DTGenerationData
export const generate = (): DTGenerateResult => {
	return { display: '' };
};
	
/*
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

private function getDigit($rut){
	$rutA = array_reverse(str_split($rut));

	for($i = 0, $n = 0; $i<count($rutA); $n += $rutA[$i] * ($i % 6 + 2), $i++);
	$digit = 11 - $n % 11;

	if($digit == 10) return "k";
	if($digit == 11) return "0";
	return $digit;
}
*/
