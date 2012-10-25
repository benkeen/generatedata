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
		for ($rowNum=1; $rowNum<=$numResults; $rowNum++) {
			$currRowData = array();
			while (list($order, $dataTypeGenerationInfo) = each($template)) {
				foreach ($dataTypeGenerationInfo as $genInfo) {
					$columnOrder = $genInfo["colNum"];
					$currDataType = $dataTypes[$genInfo["dataTypeFolder"]];
					$genInfo["randomData"] = $currDataType->generate($rowNum, $genInfo["options"], $row_data);
					$currRowData["$columnOrder"] = $genInfo;
				}
			}
			reset($template);
			ksort($rowData, SORT_NUMERIC);

/*
			echo "<tr>";
			foreach ($row_data as $data)
			{
				$val = (is_array($data["random_data"])) ? $data["random_data"]["display"] : $data["random_data"];
				echo "<td>$val</td>";
			}
			echo "</tr>";
*/
			$data[] = $currRowData;
		}


		try {
			$placeholders = array(
				"isFirstRow" => true,
				"isLastRow"  => true,
				"cols"       => $cols,
				"data"       => $data
			);
			$str = Templates::evalSmartyTemplate("plugins/exportTypes/HTML/output_table.tpl", $placeholders);
			return array(
				"success" => true,
				"content" => $str
			);

		} catch (Exception $e) {
			return array(
				"success"  => false,
				"response" => $e,
				"content"  => ""
			);
		}
	}
}
