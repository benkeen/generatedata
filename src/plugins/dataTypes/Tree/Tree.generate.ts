import { DTMetadata, DTGenerateResult } from '../../../../types/dataTypes';

// private $openTreeNodes = array();

/**
 * Our generation function. Unlike other Data Types, the Tree Data type relies on knowing about
 * previously generated rows. Since the Data Generator provides the option to generate the data
 * sets all at once ("New Window/Tab", "Prompt to Download") or in pieces, we need to accommodate
 * each scenario.
 * (1) If we're generating in batches, store the relevant info in sessions.
 * (2) Otherwise, store in $openTreeNodes private var.
 */
export const generate = (): DTGenerateResult => { // data: GenerationData

	/*
	$options = $generationContextData["generationOptions"];
	$autoIncrementRowNum = $options["autoIncrementRowNum"];

	if ($generationContextData["rowNum"] == 1) {
		$_SESSION["gdTree_openTreeNodes"] = "";
	}

	$storageType = ($generator->isFirstBatch() && $generator->isLastBatch()) ? "privateVar" : "sessions";

	// find the auto-increment column
	$parentRowData = array();
	foreach ($generationContextData["existingRowData"] as $data) {
		if ($data["colNum"] == $autoIncrementRowNum) {
			$parentRowData = $data;
			break;
		}
	}

	// hmm... needs fixing
	if (empty($parentRowData)) {
		return array("display" => "");
	}

	// awesome var name, hey?
	$probablyUniqueParentRowValue = $parentRowData["randomData"]["display"];

	if ($storageType == "privateVar") {
		if ($probablyUniqueParentRowValue == 1) {
			$this->openTreeNodes[] = array($probablyUniqueParentRowValue, 1);
			return "0";
		}

		// randomly pick an open (non-full) node
		$randIndex  = mt_rand(0, count($this->openTreeNodes)-1);
		$randRow    = $this->openTreeNodes[$randIndex];
		$randParentRowValue = $randRow[0];

		// increment this node. If it's full, remove it from the array
		$this->openTreeNodes[$randIndex][1]++;
		if ($this->openTreeNodes[$randIndex][1] > $options["maxSiblings"]) {
			array_splice($this->openTreeNodes, $randIndex, 1);
		}

		// finally, add the new index
		$this->openTreeNodes[] = array($probablyUniqueParentRowValue, 1);

	}  else {

		$sessions_openTreeNodes = unserialize($_SESSION["gdTree_openTreeNodes"]);
		if ($probablyUniqueParentRowValue == 1) {
			$sessions_openTreeNodes[] = array($probablyUniqueParentRowValue, 1);
			$_SESSION["gdTree_openTreeNodes"] = serialize($sessions_openTreeNodes);
			return "0";
		}

		// randomly pick an open (non-full) node
		$randIndex  = mt_rand(0, count($sessions_openTreeNodes)-1);
		$randRow    = $sessions_openTreeNodes[$randIndex];
		$randParentRowValue = $randRow[0];

		// increment this node. If it's full, remove it from the array
		$sessions_openTreeNodes[$randIndex][1]++;
		if ($sessions_openTreeNodes[$randIndex][1] > $options["maxSiblings"]) {
			array_splice($sessions_openTreeNodes, $randIndex, 1);
		}

		// finally, add the new index
		$sessions_openTreeNodes[] = array($probablyUniqueParentRowValue, 1);
		$_SESSION["gdTree_openTreeNodes"] = serialize($sessions_openTreeNodes);
	}

	return array(
		"display" => $randParentRowValue
	);
	*/

	return { display: '' };
};

export const getMetadata = (): DTMetadata => ({
	sql: {
		field: 'mediumint default NULL',
		field_Oracle: 'number',
		field_MSSQL: 'INTEGER NULL',
		field_Postgres: 'integer NULL'
	}
});
