<?php

class AlphaNumeric extends DataType {

  protected $dataTypeName = "Alphanumeric";
  protected $hasHelpDialog = true;
  protected $dataTypeFieldGroup = "other";
  protected $dataTypeFieldGroupOrder = 20;
  protected $includedFiles = array("AlphaNumeric.js");

  private $helpDialogWidth = 460;


  public function generateItem($row, $placeholderStr, $existingRowData) {
    $formats = explode("|", $placeholderStr);
    $chosenFormat = $formats[0];
    if (count($formats) > 1) {
      $chosenFormat = $formats[rand(0, count($formats)-1)];
    }
    return Utils::generateRandomAlphanumericStr($chosenFormat);
  }

  public function getExportTypeInfo($exportType, $options) {
    $info = "";
    switch ($exportType) {
      case "sql":
        $info = "varchar(255)";
        break;
    }
    return $info;
  }

  public function getTemplateOptions($postdata, $col, $num_cols) {
    if (!isset($postdata["option_$col"]) || empty($postdata["option_$col"])) {
      return false;
    }
    return $postdata["option_$col"];
  }

  public function getExampleColumnHTML($row) {
    $L = Core::$language->getCurrentLanguageStrings();
    $html =<<< END
  <select name="dt_$row" id="dt_$row" onchange="$('#option_$row').val(this.value)">
    <option value="">{$L["please_select"]}</option>
    <option value="LxL xLx">V6M 4C1 {$L["AlphaNumeric_example_CanPostalCode"]}</option>
    <option value="xxxxx">90210 {$L["AlphaNumeric_example_USZipCode"]}</option>
    <option value="LLLxxLLLxLL">eZg29gdF5K1 {$DT["AlphaNumeric_example_Password"]}</option>
  </select>
END;
    return $html;
  }

  public function getOptionsColumnHTML($row) {
    return "<input type=\"text\" name=\"option_$row\" id=\"option_$row\" style=\"width: 230px\" />"; // TODO no hardcoded widths
  }

  public function getHelpDialogInfo() {
    $L = Core::$language->getCurrentLanguageStrings();
    $content =<<<EOF
      <p>
        {$L["AlphaNumeric_help_intro"]}
      </p>

      <table cellpadding="0" cellspacing="1" width="100%">
      <tr>
        <td class="heading_1" width="20">L</td>
        <td width="200">{$L["AlphaNumeric_help_1"]}</td>
        <td class="heading_1" width="20">V</td>
        <td>{$L["AlphaNumeric_help_2"]}</td>
      </tr>
      <tr>
        <td class="heading_1">l</td>
        <td>{$L["AlphaNumeric_help_3"]}</td>
        <td class="heading_1">v</td>
        <td>{$L["AlphaNumeric_help_4"]}</td>
      </tr>
      <tr>
        <td class="heading_1">D</td>
        <td>{$L["AlphaNumeric_help_5"]}</td>
        <td class="heading_1">F</td>
        <td>{$L["AlphaNumeric_help_6"]}</td>
      </tr>
      <tr>
        <td class="heading_1">C</td>
        <td>{$L["AlphaNumeric_help_7"]}</td>
        <td class="heading_1">x</td>
        <td>{$L["AlphaNumeric_help_8"]}</td>
      </tr>
      <tr>
        <td class="heading_1">c</td>
        <td>{$L["AlphaNumeric_help_9"]}</td>
        <td class="heading_1">X</td>
        <td>{$L["AlphaNumeric_help_10"]}</td>
      </tr>
      <tr>
        <td class="heading_1">E</td>
        <td>{$L["AlphaNumeric_help_11"]}</td>
        <td class="heading_1">H</td>
        <td>{$L["AlphaNumeric_help_12"]}</td>
      </tr>
      </table>
EOF;

		return array(
		  "dialogWidth" => $this->helpDialogWidth,
		  "content"     => $content
		);
	}

}
