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

	function getAdditionalSettingsHTML() {
		$LANG = Core::$language->getCurrentLanguageStrings();

		$html =<<< END
		<table cellspacing="0" cellpadding="0" width="100%">
		<tr>
			<td width="30%" valign="top">
				<table cellspacing="0" cellpadding="0">
				<tr>
					<td colspan="2">
						<input type="checkbox" checked="checked" />
							<label>Include entire webpage HTML</label>
					</td>
				</tr>
				<tr>
					<td width="160" valign="top">Data format</td>
					<td>
						<input type="radio" name="etHTMLExportFormat" id="etHTMLExportFormat1" value="table" checked="checked" />
							<label for="etHTMLExportFormat1">&lt;table&gt;</label><br />
						<input type="radio" name="etHTMLExportFormat" id="etHTMLExportFormat2" value="ul" />
							<label for="etHTMLExportFormat2">&lt;ul&gt;</label><br />
						<input type="radio" name="etHTMLExportFormat" id="etHTMLExportFormat3" value="dl" />
							<label for="etHTMLExportFormat3">&lt;dl&gt;</label>
					</td>
				</tr>
				</table>
			</td>
			<td width="70%" valign="top">
				<label for="etXML_useCustomExportFormat">
					<input type="checkbox" name="etXML_useCustomExportFormat" id="etXML_useCustomExportFormat" />
					{$LANG["use_custom_xml_format"]}
				</label>
				<textarea style="width: 98%; height: 100px" class="gdDisabled" name="etXML_customFormat" id="etXML_customFormat" disabled="disabled">
</textarea>
			</td>
		</tr>
		</table>
END;
		return $html;
	}
}
