<?php


class AutoIncrement extends DataType {

  protected $dataTypeName = "AutoIncrement";
  protected $hasHelpDialog = true;
  protected $dataTypeFieldGroup = "other";
  protected $dataTypeFieldGroupOrder = 10;
  protected $includedFiles = array("AutoIncrement.js");

  private $helpDialogWidth = 480;


  public function generateItem($row, $placeholderStr, $existingRowData) {
  }

  public function getExportTypeInfo($exportType, $options) {
  }

  public function getTemplateOptions($postdata, $col, $num_cols) {
  }

  public function getExampleColumnHTML($row) {
    $L = Core::$language->getCurrentLanguageStrings();
    $html =<<< END
  <select name="dt_$row" id="dt_$row" onchange="return AutoIncrement_ns.selectExample(this.value, $row)">
    <option value="1,1,">1, 2, 3, 4, 5, 6...</option>
    <option value="100,1,">100, 101, 102, 103, 104...</option>
    <option value="0,2,">0, 2, 4, 6, 8, 10...</option>
    <option value="0,5,">0, 5, 10, 15, 20, 25...</option>
    <option value="1000,-1,">1000, 999, 998, 997...</option>
    <option value="0,-1,">0, -1, -2, -3, -4...</option>
    <option value="0,0.5,">0, 0.5, 1, 1.5, 2...</option>
    <option value="1,1,ROW-{ROW}">ROW-1, ROW-2, ROW-3,...</option>
    <option value="2,4,{ROW}i">2i, 4i, 6i, 8i...</option>
  </select>
END;
    return $html;
  }

  public function getOptionsColumnHTML($row) {
  	$html =<<< END
&nbsp;{$L["AutoIncrement_start_at_c"]} <input type="text" name="autoIncrementStart_\$ROW\$" id="autoIncrementStart_\$ROW\$" style="width: 40px" value="1" />&nbsp;
&nbsp;{$L["AutoIncrement_increment_c"]} <input type="text" name="autoIncrementValue_\$ROW\$" id="autoIncrementValue_\$ROW\$" style="width: 40px" value="1" />
&nbsp;{$L["AutoIncrement_placeholder_str"]} <input type="text" name="autoIncrementPlaceholder_\$ROW\$" id="autoIncrementPlaceholder_\$ROW\$" style="width: 140px" />
END;
    return $html;
  }

  public function getHelpDialogInfo() {
    $L = Core::$language->getCurrentLanguageStrings();
    $content =<<< END
	<p>
	  {$L["AutoIncrement_help_intro"]}
	</p>
	<p>
	  {$L["AutoIncrement_help_para2"]}
	</p>

	<ul>
	  <li><b>ROW-{\$INCR}</b> -> ROW-1, ROW-2, ROW-3, ROW-4, ...</li>
	  <li><b>{\$INCR}F</b> -> 1F, 2F, 3F, 4F, ...</li>
	</ul>
END;

		return array(
		  "dialogWidth" => $this->helpDialogWidth,
		  "content"     => $content
		);
	}
}
