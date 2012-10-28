<?php

class DataType_Tree extends DataTypePlugin {
	protected $dataTypeName = "Tree";
	protected $dataTypeFieldGroup = "other";
	protected $dataTypeFieldGroupOrder = 30;
	protected $processOrder = 2;

	private $helpDialogWidth = 450;

	// $Tree_open_nodes = array();

	public function generate($row, $options, $existingRowData) {
		global $Tree_open_nodes, $L;

		$ai_row_num = $options["ai_row_num"];

		if (!isset($existing_row_data["order{$ai_row_num}"]["random_data"]))
			return $L["Tree_invalid_parent"];

		$parent_row_id = $existing_row_data["order{$ai_row_num}"]["random_data"];

		if ($row == 1) {
			$Tree_open_nodes[] = array($parent_row_id, 1);
			return "0";
		}

		// randomly pick an open (non-full) node
		$rand_index = rand(0, count($Tree_open_nodes)-1);
		$rand_row   = $Tree_open_nodes[$rand_index];
		$parent_row = $rand_row[0];

		// increment this node. If it's full, remove it from the array
		$Tree_open_nodes[$rand_index][1]++;
		if ($Tree_open_nodes[$rand_index][1] > $options["max_siblings"])
			array_splice($Tree_open_nodes, $rand_index, 1);

		// finally, add the new index
		$Tree_open_nodes[] = array($parent_row_id, 1);

		return $parent_row;
	}

	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($export_type)
		{
			case "sql":
				if ($options == "MySQL" || $options == "SQLite")
					$info = "mediumint default NULL";
				else
					$info = "number";
				break;
		}

		return $info;
	}

	public function getRowGenerationOptions($postdata, $column, $numCols) {
		if (empty($postdata["tree_ai_row_num_$col"]) || empty($postdata["tree_max_siblings_$col"]))
			return false;

		// note that we don't bother confirming that the AutoIncrement row specified actually exists. The
		// reason being perhaps the user wants to use another field (like an alpha-numeric one)

		$options = array(
			"ai_row_num"   => $postdata["tree_ai_row_num_$col"],
			"max_siblings" => $postdata["tree_max_siblings_$col"]
		);

		return $options;
	}

	public function getExampleColumnHTML() {
	}

	public function getOptionsColumnHTML() {
		$html =<<<END
<div>{$this->L["Tree_auto_increment_row_num"]} <input type="text" id="tree_ai_row_num_%ROW%" name="tree_ai_row_num_%ROW%" value="1" size="3" maxlength="3" /></div>
<div>{$this->L["Tree_max_num_sibling_nodes"]} <input type="text" id="tree_max_siblings_%ROW%" name="tree_max_siblings_%ROW%" value="2" size="3" maxlength="3" /></div>
END;
		return $html;
	}

	public function getHelpDialogInfo() {
		$html =<<<END
	<p>
		{$this->L["Tree_help_1"]}
	</p>
	<p>
		{$this->L["Tree_help_2"]}
	</p>
END;
		return array(
			"dialogWidth" => $this->helpDialogWidth,
			"content"     => $html
		);
	}
}
