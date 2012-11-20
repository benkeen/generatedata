<?php

/**
 * TODO the bulk of this class's code will be moved to the Core, once we establish what aspects
 * may be generalized.
 */

class HTML extends ExportTypePlugin {
	protected $exportTypeName = "HTML";
	protected $jsModules = array("HTML.js");
	protected $cssFile = "HTML.css";
	private $exportTarget;

	/**
	 * @see ExportTypePlugin::generate()
	 */
	function generate($generator) {
		$this->exportTarget = $generator->getExportTarget();

		$columns      = $generator->getTemplateByDisplayOrder();
		$template     = $generator->getTemplateByProcessOrder();
		$numResults   = $generator->getNumResults();
		$dataTypes    = $generator->getDataTypes();
		$postData     = $generator->getPostData();
		$firstRowNum  = $generator->getCurrentBatchFirstRow();
		$lastRowNum   = $generator->getCurrentBatchLastRow();


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

		$content = "";

		// if we're generating the data in the context of a new window/tab, include the additional
		// necessary HTML & styles to prettify it a bit
		if ($this->exportTarget == "newTab") {
			$content .= $this->generateExportHeader();
		}

		switch ($postData["etHTMLExportFormat"]) {
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

		if ($this->exportTarget == "newTab") {
			$content .= $this->generateExportFooter();
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
			<td width="15%" valign="top">Data format</td>
			<td width="35%" valign="top">
				<input type="radio" name="etHTMLExportFormat" id="etHTMLExportFormat1" value="table" checked="checked" />
					<label for="etHTMLExportFormat1">&lt;table&gt;</label>
				<input type="radio" name="etHTMLExportFormat" id="etHTMLExportFormat2" value="ul" />
					<label for="etHTMLExportFormat2">&lt;ul&gt;</label>
				<input type="radio" name="etHTMLExportFormat" id="etHTMLExportFormat3" value="dl" />
					<label for="etHTMLExportFormat3">&lt;dl&gt;</label>
			</td>
			<td width="50%" valign="top">
				<input type="checkbox" name="etXML_useCustomExportFormat" id="etXML_useCustomExportFormat" />
					<label for="etXML_useCustomExportFormat">{$this->L["use_custom_html_format"]}</label>
					<a href="#" id="etHTML_editCustomFormat">[edit]</a>

			</td>
		</tr>
		</table>

<div id="etHTMLCustomFormatDialog" style="display:none">
	<div style="width: 300px; float: left;">
		<p>
			This dialog lets you customize the HTML used in generating your data through custom Smarty template logic.
		</p>

		<h4>Available Smarty Vars</h4>

<pre>{\$isFirstBatch}, {\$isLastBatch}</pre>
Booleans for whether or not the current batch of results being generated is the first or last. This is only ever used for
users generating the data in-page, which generates the results in chunks. For all other situations, both are always true.

<pre>{\$colData}</pre>
An ordered array of strings containing the column names.

<pre>{\$rowData}</pre>
An ordered array of arrays. Each top level array contains the contents of the row; each child array contains
an ordered array of values for each item of data.

		<button class="gdPrimaryButton">Reset Custom HTML</button>
	</div>
	<div style="etHTMLCustomContent">
		<textarea id="etHTMLCustomSmarty"><!DOCTYPE html>
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

{if \$isFirstBatch}
<table cellspacing="0" cellpadding="1">
<tr>
{foreach \$colData as \$col}
	<th>{\$col}</th>
{/foreach}
</tr>
{/if}

{foreach \$rowData as \$row}

{/foreach}

{if \$isLastBatch}
</table>
{/if}

</body>
</html>
</textarea>
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
