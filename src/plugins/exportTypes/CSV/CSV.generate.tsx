export const generate = (): any => {

};


/*
protected $exportTypeName = "CSV";
protected $contentTypeHeader = "application/csv";
protected $addHeadersInNewWindow = false;
public $L = array();

public function generate($generator) {
	$this->genEnvironment = $generator->genEnvironment; // API / POST
	$this->userSettings = $generator->getUserSettings();

	$csvDelimiter = $this->getCSVDelimiter();
	$newline      = $this->getLineEndingChar();

	$data = $generator->generateExportData();

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

 * Used for constructing the filename of the filename when downloading.
 * @see ExportTypePlugin::getDownloadFilename()
 * @param Generator $generator
 * @return string
public function getDownloadFilename($generator) {
	$time = date("M-j-Y");
	return "data{$time}.csv";
}

private function getCSVDelimiter() {
	if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
		$settings = $this->userSettings->export->settings;
		$format = $settings->delimiter;
	} else {
		$format = ($this->userSettings["etCSV_delimiter"] == '\t') ? "\t" : $this->userSettings["etCSV_delimiter"];
	}
	return $format;
}


// return a string: "Windows", "Unix" or "Mac"
private function getLineEndingChar() {
	$type = "";
	if ($this->genEnvironment == Constants::GEN_ENVIRONMENT_API) {
		$type = $this->userSettings->export->settings->eol;
	} else {
		$type = $this->userSettings["etCSV_lineEndings"];
	}

	$newline = "";
	switch ($type) {
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
	return $newline;
}
*/
