<?php

/**
 * TODO the bulk of this class's code will be moved to the Core, once we establish what aspects
 * may be generalized.
 */

class HTML extends ExportTypePlugin {
	protected $exportTypeName = "HTML";


	/**
	 * @see ExportTypePlugin::generate()
	 */
	function generate($generator) {
		$columns     = $generator->getTemplateByDisplayOrder();
		$template    = $generator->getTemplateByProcessOrder();
		$numResults  = $generator->getNumResults();
		$dataTypes   = $generator->getDataTypes();
		$postData    = $generator->getPostData();
		$firstRowNum = $generator->getCurrentBatchFirstRow();
		$lastRowNum  = $generator->getCurrentBatchLastRow();

		// first, generate the (ordered) list of table headings
		$cols = array();
		foreach ($columns as $colInfo) {
			$cols[] = $colInfo["title"];
		}

		// contains only the information needed for display purposes
		$displayData = array();

		for ($rowNum=$firstRowNum; $rowNum<=$lastRowNum; $rowNum++) {

			// $template is alreay grouped by process order. Just loop through each one, passing off the
			// actual data generation to the appropriate Data Type. Note that we pass all previously generated
			// data (including any metadata returned by the Data Type).
			$currRowData = array();

			while (list($order, $dataTypeGenerationInfo) = each($template)) {
				foreach ($dataTypeGenerationInfo as $genInfo) {
					$colNum = $genInfo["colNum"];
					$currDataType = $dataTypes[$genInfo["dataTypeFolder"]];

					$generationContextData = array(
						"rowNum"            => $rowNum,
						"generationOptions" => $genInfo["generationOptions"],
						"existingRowData"   => $currRowData
					);
					$genInfo["randomData"] = $currDataType->generate($generator, $generationContextData);
					$currRowData["$colNum"] = $genInfo;
				}
			}
			reset($template);

			// now sort the row columns in the desired order
			ksort($currRowData, SORT_NUMERIC);

			// now we have all the info we need for this row, filter out the display value
			$currRowDisplayData = array();
			foreach ($currRowData as $orderedRowData) {
				$currRowDisplayData[] = $orderedRowData["randomData"]["display"];
			}
			$displayData[] = $currRowDisplayData;
		}

		$data = array(
			"isFirstBatch" => $generator->isFirstBatch(),
			"isLastBatch"  => $generator->isLastBatch(),
			"cols"         => $cols,
			"data"         => $displayData
		);

		$template = "";
		switch ($postData["etHTMLExportFormat"]) {
			case "table":
				$content = $this->genFormatTable($data);
				break;
			case "ul":
				$content = $this->genFormatUl($data);
				break;
			case "dl":
				$content = $this->genFormatDl($data);
				break;
		}

		return array(
			"success" => true,
			"content" => $content
		);
	}


	function getAdditionalSettingsHTML() {
		$html =<<< END
		<table cellspacing="0" cellpadding="0" width="100%">
		<tr>
			<td width="17%" valign="top">Data format</td>
			<td width="14%" valign="top">
				<input type="radio" name="etHTMLExportFormat" id="etHTMLExportFormat1" value="table" checked="checked" />
					<label for="etHTMLExportFormat1">&lt;table&gt;</label><br />
				<input type="radio" name="etHTMLExportFormat" id="etHTMLExportFormat2" value="ul" />
					<label for="etHTMLExportFormat2">&lt;ul&gt;</label><br />
				<input type="radio" name="etHTMLExportFormat" id="etHTMLExportFormat3" value="dl" />
					<label for="etHTMLExportFormat3">&lt;dl&gt;</label>
			</td>
			<td width="70%" valign="top">
				<label for="etXML_useCustomExportFormat">
					<input type="checkbox" name="etXML_useCustomExportFormat" id="etXML_useCustomExportFormat" />
					{$this->L["use_custom_html_format"]}
				</label>
				<textarea style="width: 98%; height: 100px" class="gdDisabled" name="etXML_customFormat" id="etXML_customFormat" disabled="disabled">
</textarea>
			</td>
		</tr>
		</table>
END;
		return $html;
	}


	/**
	 * Generates the data in <table> format. Technically we should probably pass this and the other markup generation
	 * logic to Smarty, but this is faster.
	 * @param array $data
	 * @return string
	 */
	private function genFormatTable($data) {
		$content = "";
		if ($data["isFirstBatch"]) {
			$content .= "<table cellpadding=\"1\" cellspacing=\"1\">\n<tr>\n";
			foreach ($data["cols"] as $colName) {
				$content .= "\t<th>$colName</th>\n";
			}
			$content .= "</tr>\n";
		}

		foreach ($data["data"] as $row) {
			$content .= "<tr>\n";
			foreach ($row as $col) {
				$content .= "\t<td>$col</td>\n";
			}
			$content .= "</tr>\n";
		}

		if ($data["isLastBatch"]) {
			$content .= "</table>";
		}

		return $content;
	}

	/**
	 * Generates the data in <ul> format.
	 * @param array $data
	 * @return string
	 */
	private function genFormatUl($data) {
		$content = "";
		if ($data["isFirstBatch"]) {
			$content .= "<ul>\n";
			foreach ($data["cols"] as $colName) {
				$content .= "\t<li>$colName</li>\n";
			}
			$content .= "</ul>\n";
		}

		foreach ($data["data"] as $row) {
			$content .= "<ul>\n";
			foreach ($row as $col) {
				$content .= "\t<li>$col</li>\n";
			}
			$content .= "</ul>\n";
		}
		return $content;
	}

	/**
	 * Generates the data in <dl> format.
	 * @param array $data
	 * @return string
	 */
	private function genFormatDl($data) {
		$numCols = count($data["cols"]);
		$content = "";
		foreach ($data["data"] as $row) {
			$content .= "<dl>\n";
			for ($i=0; $i<$numCols; $i++) {
				$content .= "\t<dt>{$data["cols"][$i]}</dt>\n";
				$content .= "\t\t<dd>{$row[$i]}</dd>\n";
			}
			$content .= "</dl>\n";
		}
		return $content;
	}
}
