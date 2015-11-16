<?php

/**
 * Our generator class. This does the work of interpreting the form data, passing the work off to the various
 * plugins and piecing the generated data for returning to the client.
 * @author Ben Keen <ben.keen@gmail.com>
 * @package Core
 */
class DataGenerator {
	private $exportTarget;
	private $batchNum;
	private $batchSize;
	private $numResults;
	private $template;
	private $exportType;
	private $countries;
	private $dataTypes;
	private $postData;
	private $isFirstBatch;
	private $isLastBatch;
	private $currentBatchFirstRow;
	private $currentBatchLastRow;
	
	// compression flag - set as per user choice
	private $isCompressionRequired = false;

	// this may or may not exist. If the user is generating data from a saved data set, it will have a value. Otherwise
	// it won't be included in $postData passed to the constructor
	private $configurationID = null;


	/**
	 * @param $environment "POST" or "API"
	 * @param $data Either the contents of POST sent from the main data generator UI, or the contents of a JSON
	 *   POST sent to the API.
	 */
	public function __construct($environment, $data) {
		$this->genEnvironment = $environment;
		$this->dataTypes = DataTypePluginHelper::getDataTypeHash(Core::$dataTypePlugins);

		if ($environment === Constants::GEN_ENVIRONMENT_POST) {
			$this->initUIGenerator($data);
		} else if ($environment === Constants::GEN_ENVIRONMENT_API) {
			$this->initAPIGenerator($data);
		}
	}

	/**
	 * Calls the appropriate Export Type's generation function to actually generate the random data.
	 */
	public function generate() {
		$response = $this->exportType->generate($this);

		$response["contentTypeHeader"] = $this->exportType->getContentTypeHeader();
		$response["addHeadersInNewWindow"] = $this->exportType->addHeadersInNewWindow();
		$response["isComplete"] = $this->isLastBatch;

		if ($this->exportTarget == "promptDownload") {
			$response["promptDownloadFilename"] = $this->exportType->getDownloadFilename($this);
		}

		// if this is the last batch and we're generating data for a saved data set, update the "total rows" count
		if ($this->isLastBatch && $this->configurationID != null && Core::checkIsLoggedIn()) {
			Core::$user->updateRowsGeneratedCount($this->configurationID, $this->numResults);
		}

		return $response;
	}


	/**
	 * Constructs the Data Generator ready for a generate() call for all data generated via the UI.
	 * @param $postData
	 */
	private function initUIGenerator($postData) {
		$this->exportTarget = $postData["gdExportTarget"]; // inPage, newTab or promptDownload

		if ($this->exportTarget == "inPage") {
			$this->batchSize  = $postData["gdBatchSize"];
			$this->batchNum   = $postData["gdCurrentBatchNum"];
		} else {
			$this->batchSize = $postData["gdNumRowsToGenerate"];
			$this->batchNum = 1;
		}

		$this->numResults = $postData["gdNumRowsToGenerate"];

		$this->applyRowsGeneratedLimit();

		$this->countries = isset($postData["gdCountries"]) ? $postData["gdCountries"] : array();
		$this->postData  = $postData;

		if (isset($postData["configurationID"])) {
			$this->configurationID = $postData["configurationID"];
		}

		// make a note of whether this batch is the first / last. This is useful information for the
		// Export Types to know whether to output special content at the top or bottom
		$this->isFirstBatch = ($this->batchNum == 1);
		$this->isLastBatch = (($this->batchNum * $this->batchSize) >= $this->numResults);
		$this->currentBatchFirstRow = (($this->batchNum - 1) * $this->batchSize) + 1;
		$this->currentBatchLastRow = ($this->currentBatchFirstRow + $this->batchSize > $this->numResults) ?
			$this->numResults : $this->currentBatchFirstRow + $this->batchSize - 1;

		// figure out what we're going to need to generate
		$this->createDataSetTemplateUI($postData);

		$this->exportType = ExportTypePluginHelper::getExportTypeByFolder($postData["gdExportType"]);

		// set the value of isCompressionRequired
		if ($postData["gdExportTarget"] == "promptDownload" && $postData["gdExportTarget_promptDownload_zip"] == "doZip") {
			$this->isCompressionRequired = true;
		}
	}


	/**
	 * Called during an API request for data generation. This does the same thing as initUIGenerator: it pulls the
	 * core values out and stores them on the current DataGenerator object. The only difference is the source: this
	 * pulls them from the JSON content POSTed, rather than relies on the browser form POST used by the UI.
	 * @param $json
	 */
	private function initAPIGenerator($json) {
		$this->exportTarget = "newTab"; // should be a constant
		$this->batchSize = $json->numRows;
		$this->batchNum = 1;
		$this->numResults = $json->numRows;

		$this->applyRowsGeneratedLimit();

		$this->countries = property_exists($json, "countries") ? $json->countries : array();
		$this->apiData  = $json;

		if (isset($postData["configurationID"])) {
			$this->configurationID = $postData["configurationID"];
		}

		// make a note of whether this batch is the first / last. This is useful information for the
		// Export Types to know whether to output special content at the top or bottom
		$this->isFirstBatch = true;
		$this->isLastBatch = true;
		$this->currentBatchFirstRow = 1;
		$this->currentBatchLastRow = $this->numResults;

		// figure out what we're going to need to generate
		$this->createDataSetTemplateAPI($json);

		$this->exportType = ExportTypePluginHelper::getExportTypeByFolder($json->export->type);
		$this->isCompressionRequired = false;
	}


	/**
	 * Helper to see if we're in demo mode, and limit the number of rows that can be generated.
	 */
	private function applyRowsGeneratedLimit() {
		if (Core::checkDemoMode() && !Core::checkIsLoggedIn()) {
			$maxDemoModeRows = Core::getMaxDemoModeRows();
			if ($this->numResults > $maxDemoModeRows) {
				$this->numResults = $maxDemoModeRows;
			}
		}
		// always apply the max generated rows limitation. Technically this value could be lower than
		// the $maxDemoModeRows value above, but it's extremely unlikely & an acceptable restriction
		$maxGeneratedRows = Core::getMaxGeneratedRows();
		if ($this->numResults > $maxGeneratedRows) {
			$this->numResults = $maxGeneratedRows;
		}
	}

	/**
	 * This function creates a "template" of the data set to be generated by passing off work to the
	 * various Data Types. The "template" that's returned is an ordered array of hashes, each hash being
	 * of the following structure:
	 *
	 *   array(
	 *      "title" => "", // whatever string is being used for the column title / node name / etc.
	 *      "type"  => "", // the namespace (folder name) of the Data Type
	 *      "options" => "" // whatever custom options have been specified for this Data Type
	 *      "has_dependencies" => ""  // boolean true / false. This is for Data Types whose generated content
	 *                                // (may) depend on values in other fields in the row, e.g. "Region",
	 *                                // which would need to know the randomly generated country to generate
	 *                                // an appropriate value
	 *   )
	 *
	 * The first two values are found right in the $_POST values, but the third and fourth are determined by
	 * the Data Type itself.
	 *
	 * @param array $hash
	 * @return array
	 */
	private function createDataSetTemplateUI($hash) {
		$numCols  = $hash["gdNumCols"];
		$rowOrder = $hash["gdRowOrder"];
		$rowNums = explode(",", $rowOrder);

		// find out what the user wants to generate
		$templatesByProcessOrder = array();
		$order = 1;
		foreach ($rowNums as $i) {
			$title    = $hash["gdTitle_$i"];
			$dataType = $hash["gdDataType_$i"];

			// if there's no data type, the row wasn't filled in so we just ignore it
			if (empty($dataType)) {
				continue;
			}

			$dataTypeFolder = preg_replace("/^data-type-/", "", $dataType);
			$currDataType = $this->dataTypes[$dataTypeFolder];
			$processOrder = $currDataType->getProcessOrder();
			$options = $currDataType->getRowGenerationOptionsUI($this, $hash, $i, $numCols);

			// the only time $options is false is if this Data Type explicitly returned it, meaning
			// that it was unable to determine the options needed. This could occur if the user didn't enter in
			// appropriate values in the UI and the Data Type failed to catch it via the JS validation
			if ($options !== false) {
				if (!array_key_exists("$processOrder", $templatesByProcessOrder)) {
					$templatesByProcessOrder["$processOrder"] = array();
				}
				$templatesByProcessOrder["$processOrder"][] = array(
					"title"             => $title,
				    "colNum"            => $order,
					"dataTypeFolder"    => $dataTypeFolder,
					"generationOptions" => $options,
					"columnMetadata"    => $currDataType->getDataTypeMetaData()
				);
			}

			$order++;
		}

		// sort by process order and return
		ksort($templatesByProcessOrder, SORT_NUMERIC);
		$this->template = $templatesByProcessOrder;
	}


	private function createDataSetTemplateAPI($json) {
		$numCols = count($json->rows);

		$templatesByProcessOrder = array();
		$order = 1;
		foreach ($json->rows as $row) {
			$dataTypeFolder = $row->type;
			$title          = $row->title;

			$currDataType = $this->dataTypes[$dataTypeFolder];
			$processOrder = $currDataType->getProcessOrder();
			$options = $currDataType->getRowGenerationOptionsAPI($this, $row, $numCols);

			// the only time $options is false is if this Data Type explicitly returned it, meaning
			// that it was unable to determine the options needed. This could occur if the user didn't enter in
			// appropriate values in the UI and the Data Type failed to catch it via the JS validation
			if ($options !== false) {
				if (!array_key_exists("$processOrder", $templatesByProcessOrder)) {
					$templatesByProcessOrder["$processOrder"] = array();
				}
				$templatesByProcessOrder["$processOrder"][] = array(
					"title"             => $title,
					"colNum"            => $order,
					"dataTypeFolder"    => $dataTypeFolder,
					"generationOptions" => $options,
					"columnMetadata"    => $currDataType->getDataTypeMetaData()
				);
			}

			$order++;
		}

		// sort by process order and return
		ksort($templatesByProcessOrder, SORT_NUMERIC);
		$this->template = $templatesByProcessOrder;
	}


	/**
	 * This is a helper function for use by the Export Types. It sifts through all the data and returns a hash containing
	 * the information most likely to be needed for generation, namely:
	 * 	  array(
	 *       "isFirstBatch" => (boolean),
	 *       "isLastBatch" => (boolean),
	 *       "colData" => ordered array of the column names,
	 *       "rowData" => an array of arrays. Each top level array
	 *    );
	 *
	 * Using this function is completely optional - it's just provided for convenience.
	 * @return array
	 */
	public function generateExportData() {
		$columns      = $this->getTemplateByDisplayOrder();
		$template     = $this->getTemplateByProcessOrder();
		$dataTypes    = $this->getDataTypes();
		$firstRowNum  = $this->getCurrentBatchFirstRow();
		$lastRowNum   = $this->getCurrentBatchLastRow();

		// first, generate the (ordered) list of table headings
		$cols = array();
		foreach ($columns as $colInfo) {
			$cols[] = $colInfo["title"];
		}

		// contains only the information needed for display purposes
		$displayData = array();
		for ($rowNum=$firstRowNum; $rowNum<=$lastRowNum; $rowNum++) {

			// $template is already grouped by process order. Just loop through each one, passing off the
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

					$genInfo["randomData"] = $currDataType->generate($this, $generationContextData);
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
			"isFirstBatch" => $this->isFirstBatch(),
			"isLastBatch"  => $this->isLastBatch(),
			"colData"      => $cols,
			"rowData"      => $displayData
		);

		return $data;
	}


	/**
	 * Returns a string representing the target / location of the data generation is happening:
	 * 		"inPage"
	 * 		"newTab"
	 * 		"promptDownload"
	 * @return string
	 */
	public function getExportTarget() {
		return $this->exportTarget;
	}

	public function getBatchNum() {
		return $this->batchNum;
	}

	public function getBatchSize() {
		return $this->batchSize;
	}

	public function getNumResults() {
		return $this->numResults;
	}

	public function getTemplateByProcessOrder() {
		return $this->template;
	}

	/**
	 * this->template contains the entire data set to be generated by the Export Type, grouped
	 * by the priority in which they should be generated. This flattens the info.
	 *
	 * This is generally used for producing the list of headings in the expected order.
	 *
	 * @return array
	 */
	public function getTemplateByDisplayOrder() {
		$ordered = array();

		while (list($order, $dataTypes) = each($this->template)) {
			foreach ($dataTypes as $dataType) {
		    	$order = $dataType["colNum"];
		    	$ordered[$order] = $dataType;
			}
		}
		reset($this->template);
		ksort($ordered, SORT_NUMERIC);
		return array_values($ordered);
	}

	public function getExportType() {
		return $this->exportType;
	}

	public function getCountries() {
		return $this->countries;
	}

	public function getDataTypes() {
		return $this->dataTypes;
	}

	/**
	 * Returns the user-defined generation data. This returns either the POST contents - as in when the user is using
	 * the UI - or the API JSON content.
	 * @return mixed
	 */
	public function getUserSettings() {
		if ($this->genEnvironment === Constants::GEN_ENVIRONMENT_POST) {
			return $this->postData;
		} else {
			return $this->apiData;
		}
	}

	public function isFirstBatch() {
		return $this->isFirstBatch;
	}

	public function isLastBatch() {
		return $this->isLastBatch;
	}

	public function getCurrentBatchFirstRow() {
		return $this->currentBatchFirstRow;
	}

	public function getCurrentBatchLastRow() {
		return $this->currentBatchLastRow;
	}
	
	public function isPromptDownloadZipped(){
		return $this->isCompressionRequired;
	}
}
