<?php

/**
 * @package DataTypes
 */

class DataType_List extends DataTypePlugin {
	protected $isEnabled = true;
	protected $dataTypeName = "Custom List";
	protected $dataTypeFieldGroup = "other";
	protected $dataTypeFieldGroupOrder = 40;
	protected $jsModules = array("List.js");


	public function generate($generator, $generationContextData) {
		$options = $generationContextData["generationOptions"];
		$allElements = explode("|", $options["values"]);

		$val = "";
		if ($options["listType"] == "Exactly") {
			$val = implode(", ", Utils::returnRandomSubset($allElements, $options["number"]));
		} else {
			// at MOST. So randomly calculate a number up to the num specified
			$numItems = mt_rand(0, $options["number"]);
			$val = implode(", ", Utils::returnRandomSubset($allElements, $numItems));
		}

		return array(
			"display" => $val
		);
	}


	public function getRowGenerationOptions($generator, $postdata, $colNum, $numCols) {
		if (empty($postdata["dtOption_$colNum"])) {
			return false;
		}

		$listType = $postdata["dtListType_$colNum"]; // Exactly or AtMost
		$number   = ($listType == "Exactly") ? $postdata["dtListExactly_$colNum"] : $postdata["dtListAtMost_$colNum"];
		$options = array(
			"listType" => $listType,
			"number"   => $number,
			"values"   => $postdata["dtOption_$colNum"]
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
		<option value="{$this->L["drug_names"]}">{$this->L["example_10"]}</option>
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
		<input type="text" size="2" name="dtListAtMost_%ROW%" id="dtListAtMost_%ROW%" value="1" />
	</div>
	<div>
		<input type="text" name="dtOption_%ROW%" id="dtOption_%ROW%" style="width: 267px;" />
	</div>
END;
		return $html;
	}

	public function getDataTypeMetadata() {
		return array(
			"SQLField" => "varchar(255) default NULL",
			"SQLField_Oracle" => "varchar2(255) default NULL",
			"SQLField_MSSQL" => "VARCHAR(255) NULL"
		);
	}

	public function getHelpHTML() {
		return "<p>{$this->L["help"]}</p>";
	}
}
