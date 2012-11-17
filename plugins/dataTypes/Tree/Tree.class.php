<?php

class DataType_Tree extends DataTypePlugin {
	protected $dataTypeName = "Tree";
	protected $dataTypeFieldGroup = "other";
	protected $dataTypeFieldGroupOrder = 30;
	protected $processOrder = 2;
	private $helpDialogWidth = 450;
	private $openTreeNodes = array();


	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];
		$autoIncrementRowNum = $options["autoIncrementRowNum"];

		// find the auto-increment column
		$parentRowData = array();
		foreach ($generationContextData["existingRowData"] as $data) {
			if ($data["colNum"] == $autoIncrementRowNum) {
				$parentRowData = $data;
				break;
			}
		}
		if (empty($parentRowData)) {
			return $L["invalid_parent"];
		}

		// awesome var name, hey?
		$probablyUniqueParentRowValue = $parentRowData["randomData"]["display"];

		if ($probablyUniqueParentRowValue == 1) {
			$this->openTreeNodes[] = array($probablyUniqueParentRowValue, 1);
			return "0";
		}

		// randomly pick an open (non-full) node
		$randIndex  = rand(0, count($this->openTreeNodes)-1);
		$randRow    = $this->openTreeNodes[$randIndex];
		$randParentRowValue = $randRow[0];

		// increment this node. If it's full, remove it from the array
		$this->openTreeNodes[$randIndex][1]++;
		if ($this->openTreeNodes[$randIndex][1] > $options["maxSiblings"]) {
			array_splice($this->openTreeNodes, $randIndex, 1);
		}

		// finally, add the new index
		$this->openTreeNodes[] = array($probablyUniqueParentRowValue, 1);

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

	public function getHelpDialogInfo() {
		$html =<<<END
	<p>
		{$this->L["help_1"]}
	</p>
	<p>
		{$this->L["help_2"]}
	</p>
END;
		return array(
			"dialogWidth" => $this->helpDialogWidth,
			"content"     => $html
		);
	}

	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($exportType) {
			case "sql":
				if ($options == "MySQL" || $options == "SQLite") {
					$info = "mediumint default NULL";
				} else {
					$info = "number";
				}
				break;
		}

		return $info;
	}

}
