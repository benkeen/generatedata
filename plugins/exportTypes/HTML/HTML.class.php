<?php

/**
 * TODO add setting: "HTML format": table, ul
 */
class HTML extends ExportTypePlugin {
	protected $exportTypeName = "HTML";

	/**
	 * @see ExportTypePlugin::generate()
	 */
	function generate($generator) {
		$columns    = $generator->getTemplateByDisplayOrder();
		$template   = $generator->getTemplateByProcessOrder();
		$numResults = $generator->getNumResults();
		$dataTypes  = $generator->getDataTypes();

		// first, generate the (ordered) list of table headings
		$cols = array();
		foreach ($columns as $colInfo) {
			$cols[] = $colInfo["title"];
		}

		// next, generate the actual table content
		ksort($template, SORT_NUMERIC);

		$data = array();
		for ($row=1; $row<=$numResults; $row++) {
			$rowData = array();
			while (list($order, $dataTypeGenerationInfo) = each($template)) {
				foreach ($dataTypeGenerationInfo as $genInfo) {
					$order = $gen["colNum"];

					$currDataType = $dataTypes[$genInfo["dataTypeFolder"]];
					$genInfo["randomData"] = $currDataType->generate($row, $dataTypeInfo["options"], $row_data);


					$rowData["$order"] = $genInfo;
					print_r($rowData);
				}
			}
			reset($template);
			ksort($rowData, SORT_NUMERIC);
			$data[] = $rowData;

/*
			echo "<tr>";
			foreach ($row_data as $data)
			{
				$val = (is_array($data["random_data"])) ? $data["random_data"]["display"] : $data["random_data"];
				echo "<td>$val</td>";
			}
			echo "</tr>";
*/
		}

		exit;

		print_r($data);
		exit;


		//
		$placeholders = array(
			"isFirstRow" => true,
			"cols"       => $cols,
			"isLastRow"  => true
		);
		echo Templates::evalSmartyTemplate("plugins/exportTypes/HTML/output_table.tpl", $placeholders);
	}
}
