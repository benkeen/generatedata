<?php


class CSV extends ExportTypePlugin {
	protected $exportTypeName = "CSV";
	protected $contentTypeHeader = "application/csv";
	public $L = array();

	function generate($generator) {

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

	function outputHeaders() {
		header("Content-Type: application/csv");
		header("Content-Disposition: attachment; filename=randomdata.csv");
		//header("Cache-Control: public");
	}

	function getAdditionalSettingsHTML() {
		$LANG = Core::$language->getCurrentLanguageStrings();

		$html =<<< END
<table cellspacing="0" cellpadding="0" width="100%">
<tr>
	<td width="50%">
		<table cellspacing="2" cellpadding="0" width="100%">
		<tr>
			<td width="160">{$LANG["delimiter_chars"]}</td>
			<td>
				<input type="text" size="2" name="csv_delimiter" id="csv_delimiter" value="|" />
			</td>
		</tr>
		</table>
	</td>
	<td width="50%">
		<table cellspacing="0" cellpadding="0" width="100%">
		<tr>
			<td width="160">{$LANG["eol_char"]}</td>
			<td>
				<select name="csv_line_endings" id="csv_line_endings">
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
