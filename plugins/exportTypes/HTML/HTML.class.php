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
		$postData   = $generator->getPostData();

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
			$data[] = $currRowData;
		}

		try {
			$placeholders = array(
				"isFirstRow" => true,
				"isLastRow"  => true,
				"cols"       => $cols,
				"data"       => $data
			);

			$template = "";
			if ($postData["etHTMLExportFormat"] == "ul") {
				$template = "plugins/exportTypes/HTML/output_ul.tpl";
			} else if ($postData["etHTMLExportFormat"] == "dl") {
				$template = "plugins/exportTypes/HTML/output_dl.tpl";
			} else {
				$template = "plugins/exportTypes/HTML/output_table.tpl";
			}
			$str = Templates::evalSmartyTemplate($template, $placeholders);

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
		$html =<<< END
		<table cellspacing="0" cellpadding="0" width="100%">
		<tr>
			<td width="30%" valign="top">
				<table cellspacing="0" cellpadding="0" width="100%">
				<tr>
					<td colspan="2">
						<input type="checkbox" checked="checked" />
							<label>Include entire webpage HTML</label>
					</td>
				</tr>
				<tr>
					<td width="130" valign="top">Data format</td>
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
}
