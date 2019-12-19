import * as React from 'react';
import { GenEnvironment } from '../../../../types/general';
import { JSONSettings } from './JSON.ui';

type GenerateProps = {
    genEnvironment: GenEnvironment;
    userSettings: JSONSettings;
}

export const generate = (props: GenerateProps) => {
	const { genEnvironment, userSettings } = props;

	// $data = $generator->generateExportData();
	// $template = $generator->getTemplateByDisplayOrder();
	// $stripWhitespace = $this->shouldStripWhitespace();
	// $dataStructureFormat = $this->getDataStructureFormat();

	// figure out which fields are strictly numeric or JS boolean values. We don't wrap those values in double quotes
	// $this->determineNumericFields($template);
	// $this->determineBooleanFields($template);
    //
	// if ($dataStructureFormat == "complex") {
	// 	$content = $this->generateComplex($generator, $data, $stripWhitespace);
	// } else {
	// 	$content = $this->generateSimple($generator, $data, $stripWhitespace);
	// }

	return {
		success: true,
		content: ''
	};
};

const generateSimple = (data: any, stripWhitespace: boolean) => {
    const newline = (stripWhitespace) ? '' : '\n';
    const tab = (stripWhitespace) ? '' : '\t';
    const space = (stripWhitespace) ? '' : ' ';

    const nested = [];

    let content = '';
    let comma = '';

    //
    // if ($generator->isFirstBatch()) {
    //     $content .= "[";
    // } else {
    //     $comma = ",";
    // }

    const numCols = data.colData.length;
    const numRows = data.rowData.length;

    numRows.forEach((row: any, rowIndex: number) => {
        content += `${comma}${newline}${tab}{`;
        comma = '';

        numCols.forEach((col: any, colIndex: number) => {
            // $varName = preg_replace('/"/', '\"', $data["colData"][$j]);
            //
            // // x.y.z field names => Nested JSON
            // $levels = explode(".", $varName);
            // $fieldName = array_pop($levels);
            //
            // // How many nested levels match the previous column?
            // for ($k = 0; $k < count($levels) && $k < count($nested) && $nested[$k] === $levels[$k]; $k++) {
            // }
            //
            // // Pop closing levels
            // while (count($nested) > $k) {
            //     $content .= $newline . str_repeat($tab, count($nested) + 1) . "}";
            //     array_pop($nested);
            //     $comma = ",";
            // }
            //
            // // Push new nested levels
            // for ($l = $k; $l < count($levels); $l++) {
            //     $lev = $levels[$l];
            //     array_push($nested, $lev);
            //     $content .= "{$comma}{$newline}" . str_repeat($tab, $l + 2) . "\"{$lev}\":{$space}{";
            //     $comma = "";
            // }
            //
            // // encase all values in double quotes unless it's a number column, or it's a boolean column and it's a valid JS boolean
            // $value = $data["rowData"][$i][$j];
            // if (!$this->isNumeric($j, $value) && !$this->isJavascriptBoolean($j, $value)) {
            //     $value = "\"$value\"";
            // }
            // $content .= "{$comma}{$newline}" . str_repeat($tab, count($nested) + 2) . "\"{$fieldName}\":{$space}{$value}";
            // $comma = ",";
        });

        // while (count($nested) > 0) {
        //     $content .= $newline . str_repeat($tab, count($nested) + 1) . "}";
        //     array_pop($nested);
        // }
        //
        // $content .= "{$newline}{$tab}}";
        // $comma = ",";
    });


    // if ($generator->isLastBatch()) {
    //     $content .= "{$newline}]";
    // }

    return content;
}

/*

private function generateComplex($generator, $data, $stripWhitespace)
{
	$content = "";
	if ($generator->isFirstBatch()) {
		$quotedCols = Utils::enquoteArray($data["colData"]);
		if ($stripWhitespace) {
			$cols = implode(",", $quotedCols);
			$content .= "{\"cols\":[$cols],\"data\":[";
		} else {
			$cols = implode(",\n\t\t", $quotedCols);
			$content .= "{\n\t\"cols\": [\n\t\t$cols\n\t],\n\t\"data\": [\n";
		}
	}

	$numCols = count($data["colData"]);
	$numRows = count($data["rowData"]);
	for ($i = 0; $i < $numRows; $i++) {
		$rowValsArr = array();
		for ($j = 0; $j < $numCols; $j++) {
			$currValue = $data["rowData"][$i][$j];
			if ($this->isNumeric($j, $currValue) || $this->isJavascriptBoolean($j, $currValue)) {
				$rowValsArr[] = $data["rowData"][$i][$j];
			} else {
				$rowValsArr[] = "\"" . $data["rowData"][$i][$j] . "\"";
			}
		}

		if ($stripWhitespace) {
			$rowVals = implode(",", $rowValsArr);
			$content .= "[$rowVals]";
			if ($i < $numRows - 1) {
				$content .= ",";
			}
		} else {
			$rowVals = implode(",\n\t\t\t", $rowValsArr);
			$content .= "\t\t[\n\t\t\t$rowVals\n\t\t]";

			if ($i < $numRows - 1) {
				$content .= ",\n";
			} else if (!$generator->isLastBatch()) {
				$content .= ",\n";
			}
		}
	}

	if ($generator->isLastBatch()) {
		if ($stripWhitespace) {
			$content .= "]}";
		} else {
			$content .= "\n\t]\n}";
		}
	}
	return $content;
}

private function shouldStripWhitespace()
{
	$default = false;
	if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
		$jsonSettings = $this->userSettings->export->settings;
		$stripWhitespace = (property_exists($jsonSettings, "stripWhitespace")) ? $jsonSettings->stripWhitespace : $default;
	} else {
		$stripWhitespace = isset($this->userSettings["etJSON_stripWhitespace"]);
	}
	return $stripWhitespace;
}

// private function getDataStructureFormat()
// {
// 	$default = "complex";
// 	if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
// 		$jsonSettings = $this->userSettings->export->settings;
// 		$format = (property_exists($jsonSettings, "dataStructureFormat")) ? $jsonSettings->dataStructureFormat : $default;
// 	} else {
// 		$format = isset($this->userSettings["etJSON_dataStructureFormat"]) ? $this->userSettings["etJSON_dataStructureFormat"] : $default;
// 	}
// 	return $format;
// }
//
// private function determineNumericFields($template)
// {
// 	foreach ($template as $item) {
// 	$this->numericFields[] = isset($item["columnMetadata"]["type"]) && $item["columnMetadata"]["type"] == "numeric";
// }
// }
//
// private function determineBooleanFields($template)
// {
// 	foreach ($template as $item) {
// 	$this->booleanFields[] = isset($item["columnMetadata"]["type"]) && $item["columnMetadata"]["type"] == "boolean";
// }
// }
//
// private function isNumeric($index, $value)
// {
// 	return $this->numericFields[$index] && is_numeric($value);
// }
//
// private function isJavascriptBoolean($index, $value)
// {
// 	return $this->booleanFields[$index] && ($value === "true" || $value === "false");
// }


const getDownloadFilename = () => {
	// $time = date("M-j-Y");
	// return "data{$time}.json";
};
