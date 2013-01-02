<?php

/**
 * @author Ben Keen <ben.keen@gmail.com>
 * @package ExportTypes
 */
class HTML extends ExportTypePlugin {
	protected $isEnabled = true;
	protected $exportTypeName = "HTML";
	protected $jsModules = array("HTML.js");
	protected $cssFile = "HTML.css";
	protected $contentTypeHeader = "text/html";
	protected $codeMirrorModes = array("xml");

	function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			$this->smarty = new Smarty();
			$this->smarty->template_dir = realpath(dirname(__FILE__) . "/../../../libs/smarty");
			$this->smarty->compile_dir  = realpath(dirname(__FILE__) . "/../../../cache");
		}
	}

	/**
	 * @see ExportTypePlugin::generate()
	 */
	function generate($generator) {
		$exportTarget = $generator->getExportTarget();
		$postData     = $generator->getPostData();
		$data         = $generator->generateExportData();

		$content = "";
		$htmlFormat = (isset($postData["etHTMLExportFormat"])) ? $postData["etHTMLExportFormat"] : "custom";

		if ($htmlFormat == "custom") {
			$smartyTemplate = (get_magic_quotes_gpc()) ? stripslashes($postData["etHTMLCustomHTMLSource"]) : $postData["etHTMLCustomHTMLSource"];
			$content .= $this->genFormatCustom($data, $smartyTemplate);
		} else {

			// if we're generating the data in the context of a new window/tab, include the additional
			// necessary HTML & styles to prettify it a bit
			if ($exportTarget == "newTab" || $exportTarget == "promptDownload") {
				$content .= $this->generateExportHeader();
			}

			switch ($htmlFormat) {
				case "table":
					$content .= $this->genFormatTable($data);
					break;
				case "ul":
					$content .= $this->genFormatUl($data);
					break;
				case "dl":
					$content .= $this->genFormatDl($data);
					break;
			}

			if ($exportTarget == "newTab" || $exportTarget == "promptDownload") {
				$content .= $this->generateExportFooter();
			}
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
		$time = date("U");
		return "randomdata-{$time}.html";
	}


	function getAdditionalSettingsHTML() {
		$html =<<< END
<table cellspacing="0" cellpadding="0" width="100%">
<tr>
	<td width="15%" valign="top" class="etHTMLDefaultFormatLabels">Data format</td>
	<td width="35%" valign="top" class="etHTMLDefaultFormatLabels">
		<input type="radio" name="etHTMLExportFormat" id="etHTMLExportFormat1" class="etHTMLDefaultFormats" value="table" checked="checked" />
			<label for="etHTMLExportFormat1">&lt;table&gt;</label>
		<input type="radio" name="etHTMLExportFormat" id="etHTMLExportFormat2" class="etHTMLDefaultFormats" value="ul" />
			<label for="etHTMLExportFormat2">&lt;ul&gt;</label>
		<input type="radio" name="etHTMLExportFormat" id="etHTMLExportFormat3" class="etHTMLDefaultFormats" value="dl" />
			<label for="etHTMLExportFormat3">&lt;dl&gt;</label>
	</td>
	<td width="50%" valign="top">
		<input type="checkbox" name="etHTMLUseCustomExportFormat" id="etHTMLUseCustomExportFormat" />
			<label for="etHTMLUseCustomExportFormat">{$this->L["use_custom_html_format"]}</label>
			<input type="button" id="etHTMLEditCustomFormat" value="edit" disabled="disabled" />
	</td>
</tr>
</table>
<input type="hidden" name="etHTMLCustomHTMLSource" id="etHTMLCustomHTMLSource" />

<div id="etHTMLCustomFormatDialog" style="display:none">
	<div style="width: 300px; float: left;">
		<h4>Available Smarty Vars</h4>

<pre>{\$isFirstBatch}, {\$isLastBatch}</pre>
Booleans for whether or not the current batch of results being generated is the first or last. This is only ever used for
users generating the data in-page, which generates the results in chunks. For all other situations, both are always true.

<pre>{\$colData}</pre>
An ordered array of strings containing the column names.

<pre>{\$rowData}</pre>
An ordered array of arrays. Each top level array contains the contents of the row; each child array contains
an ordered array of values for each item of data.

		<button class="gdPrimaryButton" id="etHTML_ResetCustomHTML">Reset Custom HTML</button>
	</div>
	<div id="etHTMLCustomContent">
		<textarea name="etHTMLCustomSmarty" id="etHTMLCustomSmarty"></textarea>
<script type="text/template" id="etHTMLCustomSmarty_Template">{if \$isFirstBatch}
<!DOCTYPE html>
<html>
<head>
	<style type="text/css">
	body { margin: 10px; }
	table, th, td, li, dl { font-family: "lucida grande", arial; font-size: 8pt; }
	dt { font-weight: bold; }
	table { background-color: #efefef; border: 2px solid #dddddd; width: 100%; }
	th { background-color: #efefef; }
	td { background-color: #ffffff; }
	</style>
</head>
<body>

<table cellspacing="0" cellpadding="1">
<tr>
{foreach \$colData as \$col}
	<th>{\$col}</th>
{/foreach}
</tr>
{/if}
{foreach \$rowData as \$row}
<tr>
{foreach \$row as \$r}	<td>{\$r}</td>
{/foreach}
</tr>
{/foreach}

{if \$isLastBatch}
</table>

</body>
</html>
{/if}</script>

	</div>
</div>
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
			foreach ($data["colData"] as $colName) {
				$content .= "\t<th>$colName</th>\n";
			}
			$content .= "</tr>\n";
		}
		foreach ($data["rowData"] as $row) {
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
			foreach ($data["colData"] as $colName) {
				$content .= "\t<li>$colName</li>\n";
			}
			$content .= "</ul>\n";
		}
		foreach ($data["rowData"] as $row) {
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
		$numCols = count($data["colData"]);
		$content = "";
		foreach ($data["rowData"] as $row) {
			$content .= "<dl>\n";
			for ($i=0; $i<$numCols; $i++) {
				$content .= "\t<dt>{$data["colData"][$i]}</dt>\n";
				$content .= "\t\t<dd>{$row[$i]}</dd>\n";
			}
			$content .= "</dl>\n";
		}
		return $content;
	}

	/**
	 * Generates the data in whatever Smarty content the user entered.
	 * @param array $data
	 * @param string $template
	 */
	private function genFormatCustom($data, $template) {
		return Templates::evalSmartyString($template, $data);
	}

	private function generateExportHeader() {
		$html =<<< END
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<style type="text/css">
	body { margin: 10px; }
	table, th, td, li, dl { font-family: "lucida grande", arial; font-size: 8pt; }
	dt { font-weight: bold; }
	table { background-color: #efefef; border: 2px solid #dddddd; width: 100%; }
	th { background-color: #efefef; }
	td { background-color: #ffffff; }
	</style>
</head>
<body>
END;
		return $html;
	}

	private function generateExportFooter() {
		return "</body></html>";
	}
}
