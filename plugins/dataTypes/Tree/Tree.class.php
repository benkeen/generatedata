<?php

/**
 * @package DataTypes
 */

class DataType_Tree extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Tree";
	protected $dataTypeFieldGroup = "other";
	protected $dataTypeFieldGroupOrder = 30;
	protected $processOrder = 2;
	protected $jsModules = array("Tree.js");
	private $openTreeNodes = array();


	/**
	 * Our generation function. Unlike other Data Types, the Tree Data type relies on knowing about 
	 * previously generated rows. Since the Data Generator provides the option to generate the data 
	 * sets all at once ("New Window/Tab", "Prompt to Download") or in pieces, we need to accommodate
	 * each scenario. 
	 * (1) If we're generating in batches, store the relevant info in sessions.
	 * (2) Otherwise, store in $openTreeNodes private var.
	 */
	public function generate($generator, $generationContextData) {
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
	}

	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		if (empty($postdata["dtTreeAutoIncrementRowNum_$colNum"]) || empty($postdata["dtTreeMaxSiblings_$colNum"])) {
			return false;
		}

		// note that we don't bother confirming that the AutoIncrement row specified actually exists. The
		// reason being perhaps the user wants to use another field, like an alpha-numeric or GUID
		$options = array(
			"autoIncrementRowNum" => $postdata["dtTreeAutoIncrementRowNum_$colNum"],
			"maxSiblings"         => $postdata["dtTreeMaxSiblings_$colNum"]
		);

		return $options;
	}

	public function getOptionsColumnHTML() {
		$html =<<<END
<div>{$this->L["auto_increment_row_num"]} <input type="text" id="dtTreeAutoIncrementRowNum_%ROW%" name="dtTreeAutoIncrementRowNum_%ROW%" value="1" size="3" maxlength="3" /></div>
<div>{$this->L["max_num_sibling_nodes"]} <input type="text" id="dtTreeMaxSiblings_%ROW%" name="dtTreeMaxSiblings_%ROW%" value="2" size="3" maxlength="3" /></div>
END;
		return $html;
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "mediumint default NULL",
			"SQLField_Oracle" => "number",
			"SQLField_MSSQL" => "INTEGER NULL",
			"SQLField_Postgres" => "integer NULL",
		);
	}

	public function getHelpHTML() {
		$html =<<<END
	<p>
		{$this->L["help_1"]}
	</p>
	<p>
		{$this->L["help_2"]}
	</p>
END;
		return $html;
	}
}