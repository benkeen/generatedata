<?php

/**
 * @package DataTypes
 */


class DataType_AutoIncrement extends DataTypePlugin {

	protected $isEnabled = true;
	protected $dataTypeName = "AutoIncrement";
	protected $hasHelpDialog = true;
	protected $dataTypeFieldGroup = "numeric";
	protected $dataTypeFieldGroupOrder = 20;
	protected $jsModules = array("AutoIncrement.js");


	public function generate($generator, $generationContextData) {
		$rowSettings = $generationContextData["generationOptions"];
		$start       = $rowSettings["start"];
		$increment   = $rowSettings["increment"];
		$placeholder = $rowSettings["placeholder"];
		$val = (($generationContextData["rowNum"]-1) * $increment) + $start;

		if (!empty($placeholder)) {
			$val = preg_replace('/\{\$INCR\}/', $val, $placeholder);
		}

		return array(
			"display" => $val
		);
	}

	public function getRowGenerationOptions($generator, $postdata, $col, $num_cols) {
		$start = isset($postdata["dtAutoIncrementStart_$col"]) ? $postdata["dtAutoIncrementStart_$col"] : null;
		$end   = isset($postdata["dtAutoIncrementValue_$col"]) ? $postdata["dtAutoIncrementValue_$col"] : null;

		if ($start == null || $end == null || $start == "") {
			return false;
		}

		$options = array(
			"start"       => $postdata["dtAutoIncrementStart_$col"],
			"increment"   => $postdata["dtAutoIncrementValue_$col"],
			"placeholder" => $postdata["dtAutoIncrementPlaceholder_$col"]
		);

		return $options;
	}

	public function getExampleColumnHTML() {
		$html =<<< END
	<select name="dtExample_%ROW%" id="dtExample_%ROW%">
		<option value="1,1,">1, 2, 3, 4, 5, 6...</option>
		<option value="100,1,">100, 101, 102, 103, 104...</option>
		<option value="0,2,">0, 2, 4, 6, 8, 10...</option>
		<option value="0,5,">0, 5, 10, 15, 20, 25...</option>
		<option value="1000,-1,">1000, 999, 998, 997...</option>
		<option value="0,-1,">0, -1, -2, -3, -4...</option>
		<option value="0,0.5,">0, 0.5, 1, 1.5, 2...</option>
		<option value="1,1,ROW-{\$INCR}">ROW-1, ROW-2, ROW-3,...</option>
		<option value="2,4,{\$INCR}i">2i, 4i, 6i, 8i...</option>
	</select>
END;
		return $html;
	}

	public function getOptionsColumnHTML() {
		$html =<<< END
&nbsp;{$this->L["start_at_c"]} <input type="text" name="dtAutoIncrementStart_%ROW%" id="dtAutoIncrementStart_%ROW%" style="width: 40px" value="1" />&nbsp;
&nbsp;{$this->L["increment_c"]} <input type="text" name="dtAutoIncrementValue_%ROW%" id="dtAutoIncrementValue_%ROW%" style="width: 40px" value="1" />
&nbsp;{$this->L["placeholder_str"]} <input type="text" name="dtAutoIncrementPlaceholder_%ROW%" id="dtAutoIncrementPlaceholder_%ROW%" style="width: 140px" />
END;
		return $html;
	}

	public function getDataTypeMetadata() {
		return array(
			"type" => "numeric",
			"SQLField" => "mediumint",
			"SQLField_Oracle" => "number default NULL",
			"SQLField_MSSQL" => "INTEGER NULL",
			"SQLField_Postgres" => "integer NULL"
		);
	}

	public function getHelpHTML() {
		$content =<<< END
	<p>
		{$this->L["help_intro"]}
	</p>
	<p>
		{$this->L["help_para2"]}
	</p>
	<ul>
		<li><b>ROW-{\$INCR}</b> -> ROW-1, ROW-2, ROW-3, ROW-4, ...</li>
		<li><b>{\$INCR}F</b> -> 1F, 2F, 3F, 4F, ...</li>
	</ul>
END;

		return $content;
	}
}
