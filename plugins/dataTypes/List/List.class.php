<?php

class DataType_List extends DataTypePlugin {
	protected $dataTypeName = "Custom List";
	protected $dataTypeFieldGroup = "other";
	protected $dataTypeFieldGroupOrder = 40;
	private $helpDialogWidth = 360;


	public function generateItem($row, $options, $existingRowData) {
	}

	public function getExportTypeInfo($exportType, $options) {
	}

	public function getTemplateOptions($postdata, $column, $numCols) {
	}

	public function getExampleColumnHTML() {
		echo <<< END
	<select name="dt_%ROW%" id="dt_%ROW%">
		<option value="">{$this->L["please_select"]}</option>
		<option value="1|3|5|7|9|11|13|15|17|19|21|23|25|27|29|31|33|35|37|39|41|43|45|47|49">{$this->L["List_example_1"]}</option>
		<option value="2|4|6|8|10|12|14|16|18|20|22|24|26|28|30|32|34|36|38|40|42|44|46|48|50">{$this->L["List_example_2"]}</option>
		<option value="1|2|3|4|5|6|7|8|9|10">1-10</option>
		<option value="{$this->L["List_one_to_ten"]}">{$this->L["List_example_3"]}</option>
		<option value="1|2|3|5|7|11|13|17|19|23|29|31|37|41|43|47|53|59|61|67|71|73|79|83|89|97">{$this->L["List_example_4"]}</option>
		<option value="{$this->L["List_colours"]}">{$this->L["List_example_5"]}</option>
		<option value="{$this->L["List_relationship_states"]}">{$this->L["List_example_6"]}</option>
		<option value="{$this->L["List_prefix"]}">{$this->L["List_example_7"]}</option>
		<option value="{$this->L["List_company_names"]}">{$this->L["List_example_8"]}</option>
		<option value="{$this->L["List_companies"]}">{$this->L["List_example_9"]}</option>
	</select>
  <div>
    &nbsp;{$L["List_separated_by_pipe"]}
  </div>
END;
	}

	public function getOptionsColumnHTML() {
		echo <<< END
	<table cellpadding="0" cellspacing="1">
	<tr>
		<td>
			<input type="radio" name="list_type_%ROW%" id="list_type1_%ROW%" value="Exactly" checked="checked"  />
			<label for="list_type1_%ROW%">{$this->L["List_exactly"]}</label>
			<input type="text" size="2" name="exactly_%ROW%" id="exactly_%ROW%" value="1" />&nbsp;&nbsp;
			<input type="radio" name="list_type_%ROW%" id="list_type2_%ROW%" value="AtMost" />
			<label for="list_type2_%ROW%">{$this->L["List_at_most"]}</label>
			<input type="text" size="2" name="at_most_%ROW%" id="at_most_%ROW%" value="1" />
		</td>
	</tr>
	<tr>
		<td>
			<input type="text" name="option_%ROW%" id="option_%ROW%" style="width: 267px;" />
		</td>
	</tr>
	</table>
END;
	}

	public function getHelpDialogInfo() {
		return array(
			"dialogWidth" => $this->helpDialogWidth,
			"content"     => "<p>{$this->L["List_help"]}</p>"
		);
	}
}
