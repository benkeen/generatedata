export const generate = (): any => {

};

/*
class HTML extends ExportTypePlugin {
	protected $isEnabled = true;
	protected $exportTypeName = "HTML";
	protected $jsModules = array("HTML.js");
	protected $cssFiles = array("HTML.css");
	protected $contentTypeHeader = "text/html";
	protected $codeMirrorModes = array("xml", "smarty", "smartymixed", "htmlmixed", "css");

	public function __construct($runtimeContext) {
		parent::__construct($runtimeContext);
		if ($runtimeContext == "generation") {
			$this->smarty = new SecureSmarty();
			$this->smarty->template_dir = realpath(dirname(__FILE__) . "/../../../resources/libs/smarty");
			$this->smarty->compile_dir  = realpath(dirname(__FILE__) . "/../../../cache");
		}
	}

	 * @see ExportTypePlugin::generate()
	public function generate($generator) {
		$this->genEnvironment = $generator->genEnvironment; // API / POST
		$this->userSettings = $generator->getUserSettings();

		$exportTarget = $generator->getExportTarget();
		$data         = $generator->generateExportData();

		$content = "";
		$format = $this->getExportFormat();

		if ($format == "custom") {
			$template = $this->getCustomTemplate();
			$content .= $this->genFormatCustom($data, $template);
		} else {

			// if we're generating the data in the context of a new window/tab, include the additional
			// necessary HTML & styles to prettify it a bit
			if ($exportTarget == "newTab" || $exportTarget == "promptDownload") {
				$content .= $this->generateExportHeader();
			}

			switch ($format) {
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

	 * Used for constructing the filename of the filename when downloading.
	 * @see ExportTypePlugin::getDownloadFilename()
	 * @param Generator $generator
	 * @return string
	public function getDownloadFilename($generator) {
		$time = date("U");
		return "randomdata-{$time}.html";
	}

	 * Generates the data in <table> format. Technically we should probably pass this and the other markup generation
	 * logic to Smarty, but this is faster.
	 * @param array $data
	 * @return string
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

	 * Generates the data in <ul> format.
	 * @param array $data
	 * @return string
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

	 * Generates the data in <dl> format.
	 * @param array $data
	 * @return string
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

	 * Generates the data in whatever Smarty content the user entered.
	 * @param array $data
	 * @param string $template
	 * @return string
	private function genFormatCustom($data, $template) {
		return Templates::evalSmartyString($template, $data);
	}

	private function generateExportHeader() {
		$html =<<< END
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset="utf-8">
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

	private function getExportFormat() {
		if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
			return $this->userSettings->export->settings->exportFormat;
		} else {
			return (isset($this->userSettings["etHTMLExportFormat"])) ? $this->userSettings["etHTMLExportFormat"] : "custom";
		}
	}

	private function getCustomTemplate() {
		if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
			return (property_exists($this->userSettings->export->settings, "customTemplate")) ? $this->userSettings->export->settings->customTemplate : "";
		} else {
			return (get_magic_quotes_gpc()) ? stripslashes($this->userSettings["etHTMLCustomHTMLSource"]) : $this->userSettings["etHTMLCustomHTMLSource"];
		}
	}
}
*/