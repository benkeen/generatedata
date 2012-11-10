<?php

class DataType_List extends DataTypePlugin {
	protected $dataTypeName = "Custom List";
	protected $dataTypeFieldGroup = "other";
	protected $dataTypeFieldGroupOrder = 40;
	protected $jsModules = array("List.js");
	private $helpDialogWidth = 410;


	public function generate($generator, $row, $options, $existingRowData) {
		$allElements = explode("|", $options["values"]);

		$val = "";
		if ($options["list_type"] == "Exactly") {
			$val = implode(", ", gd_return_random_subset($all_elements, $options["number"]));
		} else {
			// at MOST. So randomly calculate a number up to the num specified:
			$num_items = rand(0, $options["number"]);
			$val = implode(", ", gd_return_random_subset($all_elements, $num_items));
		}

		return $val;
	}


	public function getRowGenerationOptions($generator, $postdata, $column, $numCols) {
		if (empty($postdata["option_$col"])) {
			return false;
		}

		$list_type = $postdata["list_type_{$col}"]; // Exactly or AtMost
		$number    = ($list_type == "Exactly") ? $postdata["exactly_{$col}"] : $postdata["at_most_{$col}"];
		$options = array(
			"list_type" => $list_type,
			"number"    => $number,
			"values"    => $postdata["option_{$col}"]
		);

		return $options;
	}


	public function getExampleColumnHTML() {
		$L = Core::$language->getCurrentLanguageStrings();
		$html =<<< END
	<select name="dtExample_%ROW%" id="dtExample_%ROW%">
		<option value="">{$L["please_select"]}</option>
		<option value="1|3|5|7|9|11|13|15|17|19|21|23|25|27|29|31|33|35|37|39|41|43|45|47|49">{$this->L["example_1"]}</option>
		<option value="2|4|6|8|10|12|14|16|18|20|22|24|26|28|30|32|34|36|38|40|42|44|46|48|50">{$this->L["example_2"]}</option>
		<option value="1|2|3|4|5|6|7|8|9|10">1-10</option>
		<option value="{$this->L["one_to_ten"]}">{$this->L["example_3"]}</option>
		<option value="1|2|3|5|7|11|13|17|19|23|29|31|37|41|43|47|53|59|61|67|71|73|79|83|89|97">{$this->L["example_4"]}</option>
		<option value="{$this->L["colours"]}">{$this->L["example_5"]}</option>
		<option value="{$this->L["relationship_states"]}">{$this->L["example_6"]}</option>
		<option value="{$this->L["prefix"]}">{$this->L["example_7"]}</option>
		<option value="{$this->L["company_names"]}">{$this->L["example_8"]}</option>
		<option value="{$this->L["companies"]}">{$this->L["example_9"]}</option>
	</select>
	<div>
		&nbsp;{$this->L["separated_by_pipe"]}
	</div>
END;
		return $html;
	}

	public function getOptionsColumnHTML() {
		$html =<<< END
	<div>
		<input type="radio" name="dtListType_%ROW%" id="dtListType1_%ROW%" value="Exactly" checked="checked"  />
		<label for="dtListType1_%ROW%">{$this->L["exactly"]}</label>
		<input type="text" size="2" name="dtListExactly_%ROW%" id="dtListExactly_%ROW%" value="1" />&nbsp;&nbsp;
		<input type="radio" name="dtListType_%ROW%" id="dtListType2_%ROW%" value="AtMost" />
		<label for="dtListType2_%ROW%">{$this->L["at_most"]}</label>
		<input type="text" size="2" name="dtAtMost_%ROW%" id="dtAtMost_%ROW%" value="1" />
	</div>
	<div>
		<input type="text" name="dtOption_%ROW%" id="dtOption_%ROW%" style="width: 267px;" />
	</div>
END;
		return $html;
	}

	public function getHelpDialogInfo() {
		return array(
			"dialogWidth" => $this->helpDialogWidth,
			"content"     => "<p>{$this->L["help"]}</p>"
		);
	}

	public function getExportTypeInfo($exportType, $options) {
		$info = "";
		switch ($export_type) {
			case "sql":
				if ($options == "MySQL" || $options == "SQLite") {
					$info = "varchar(255) default NULL";
				} else if ($options == "Oracle") {
					$info = "varchar2(255) default NULL";
				}
				break;
		}

		return $info;
	}
}
