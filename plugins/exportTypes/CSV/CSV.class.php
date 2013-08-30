<?php

/**
 * @package ExportTypes
 */

class CSV extends ExportTypePlugin {
	protected $isEnabled = true;
	protected $exportTypeName = "CSV";
	protected $jsModules = array("CSV.js");
	protected $contentTypeHeader = "application/csv";
	public $L = array();


	function generate($generator) {
		$exportTarget = $generator->getExportTarget();
		$postData     = $generator->getPostData();
		$data         = $generator->generateExportData();

		$csvDelimiter = ($postData["etCSV_delimiter"] == '\t') ? "\t" : $postData["etCSV_delimiter"];
		$csvLineEndings = $postData["etCSV_lineEndings"];

		switch ($csvLineEndings) {
			case "Windows":
				$newline = "\r\n";
				break;
			case "Unix":
				$newline = "\n";
				break;
			case "Mac":
			default:
				$newline = "\r";
				break;
		}

		$content = "";
		if ($data["isFirstBatch"]) {
			$content .= implode($csvDelimiter, $data["colData"]);
		}
		$numCols = count($data["colData"]);
		foreach ($data["rowData"] as $row) {

			// see if any of the cells contains the delimiter. If it does, wrap it in double quotes.
			$cleanRow = array();
			for ($i=0; $i<$numCols; $i++) {
				if (strpos($row[$i], $csvDelimiter) !== false) {
					$cleanRow[] = "\"" . preg_replace("/\"/", "\\\"", $row[$i]) . "\"";
				} else {
					$cleanRow[] = $row[$i];
				}
			}
			$content .= $newline . implode($csvDelimiter, $cleanRow);
		}

		return array(
			"success" => true,
			"content" => $content
		);
	}

	/**
	 * Used for constructing the filename of the filename when downloading.
	 * @see ExportTypePlugin::getDownloadFilename()
	 * @param Generator $generator
	 * @return string
	 */
	function getDownloadFilename($generator) {
		$time = date("M-j-Y");
		return "data{$time}.csv";
	}

	function getAdditionalSettingsHTML() {
		$LANG = Core::$language->getCurrentLanguageStrings();

		$html =<<< END
<table cellspacing="0" cellpadding="0" width="100%">
<tr>
	<td width="50%">
		<table cellspacing="2" cellpadding="0" width="100%">
		<tr>
			<td width="160">{$this->L["delimiter_chars"]}</td>
			<td>
				<input type="text" size="2" name="etCSV_delimiter" id="etCSV_delimiter" value="|" />
			</td>
		</tr>
		</table>
	</td>
	<td width="50%">
		<table cellspacing="0" cellpadding="0" width="100%">
		<tr>
			<td width="160">{$this->L["eol_char"]}</td>
			<td>
				<select name="etCSV_lineEndings" id="etCSV_lineEndings">
					<option value="Windows">Windows</option>
					<option value="Unix">Unix</option>
					<option value="Mac">Mac</option>
				</select>
			</td>
		</tr>
		</table>
	</td>
</tr>
</table>
END;

		return $html;
	}
}
