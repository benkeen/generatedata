import { ETOnMessage, ETMessageData } from '~types/exportTypes';

declare var utils: any;

const context: Worker = self as any;

let workerUtilsLoaded = false;
context.onmessage = (e: ETOnMessage) => {
	const { workerResources } = e.data;

	if (!workerUtilsLoaded) {
		importScripts(workerResources.workerUtils);
		workerUtilsLoaded = true;
	}

	context.postMessage(generate(e.data));
};

const generate = (data: ETMessageData) => {
	// $csvDelimiter = $this->getCSVDelimiter();
	// $newline      = $this->getLineEndingChar();
	//
	// $data = $generator->generateExportData();
	//
	// $content = "";
	// if ($data["isFirstBatch"]) {
	// 	$content .= implode($csvDelimiter, $data["colData"]);
	// }
	// $numCols = count($data["colData"]);
	// foreach ($data["rowData"] as $row) {
	//
	// 	// see if any of the cells contains the delimiter. If it does, wrap it in double quotes.
	// 	$cleanRow = array();
	// 	for ($i=0; $i<$numCols; $i++) {
	// 		if (strpos($row[$i], $csvDelimiter) !== false) {
	// 			$cleanRow[] = "\"" . preg_replace("/\"/", "\\\"", $row[$i]) . "\"";
	// 		} else {
	// 			$cleanRow[] = $row[$i];
	// 		}
	// 	}
	// 	$content .= $newline . implode($csvDelimiter, $cleanRow);
	// }

	return '...';
};


/*
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
