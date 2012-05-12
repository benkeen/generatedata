  <?php

class DataType_Date extends DataType {

  protected $dataTypeName = "Date";
  protected $dataTypeFieldGroup = "human_data";
  protected $dataTypeFieldGroupOrder = 100;
  protected $includedFiles = array("Country.js");

  private $helpDialogWidth = 860;

  /*
  private $next_year = mktime(0, 0, 0, date("m"),  date("d"),  date("Y")+1);
  private $next_year = date("m/d/Y", $next_year);
  private $last_year = mktime(0, 0, 0, date("m"),  date("d"),  date("Y")-1);
  private $last_year = date("m/d/Y", $last_year);
  */

  public function generateItem($row, $options, $existingRowData) {
	  // convert the From and To dates to datetimes
	  list($month, $day, $year) = split("/", $options["from"]);
	  $from_date = mktime(0, 0, 0, $month, $day, $year);
	  list($month, $day, $year) = split("/", $options["to"]);
	  $to_date = mktime(0, 0, 0, $month, $day, $year);

	  // randomly pick a date between those dates
	  $rand_date = mt_rand($from_date, $to_date);

	  // display the new date in the value specified
	  return date($options["format_code"], $rand_date);
  }

  public function getExportTypeInfo($exportType, $options) {
	  $info = "";
	  switch ($export_type)
	  {
	  	case "sql":
	  		if ($options == "MySQL" || $options == "SQLite")
	        $info = "varchar(100) default NULL";
	      else if ($options == "Oracle")
	        $info = "varchar2(100) default NULL";
	  		break;
	  }

	  return $info;
  }

  public function getTemplateOptions($postdata, $column, $numCols) {
    if (empty($postdata["fromDate_$col"]) || empty($postdata["toDate_$col"]) || empty($postdata["option_$col"])) {
      return false;
    }

    $options = array(
      "format_code" => $postdata["option_$col"],
      "from"        => $postdata["fromDate_$col"],
      "to"          => $postdata["toDate_$col"]
    );

    return $options;
  }

  public function getExampleColumnHTML($rowNum) {
    $html =<<<EOF
      <select id="dt_$rowNum" onchange="$('#option_$rowNum').val(this.value)">
        <option value="">{$L["please_select"]}</option>
        <option value="M j, Y">Jan 1, 2012</option>
        <option value="F jS, Y">January 1st, 2012</option>
        <option value="D, M d">Mon, Jan 01</option>
        <option value="D, jS, Y">Mon, Jan 1st, 2012</option>
        <option value="m.d.y">03.25.06</option>
        <option value="m-d-y">03-25-06</option>
        <option value="m/d/y">03/25/06</option>
        <option value="m/d/Y">03/25/2012</option>
        <option value="d.m.y">25.03.06</option>
        <option value="d-m-y">25-03-06</option>
        <option value="d/m/y">25/03/06</option>
        <option value="d/m/Y">25/03/2012</option>
        <option value="Y-m-d H:i:s">MySQL datetime</option>
        <option value="U">UNIX timestamp</option>
        <option value="c">ISO 8601 date</option>
        <option value="r">RFC 2822 formatted date</option>
        <option value="T">A timezone</option>
      </select>
EOF;
    return $html;
  }

  public function getOptionsColumnHTML($row) {
    $html =<<< END
  {$L["Date_from"]}
  <input type="text" name="fromDate_\$ROW\$" id="fromDate_\$ROW\$" size="10" value="$last_year" />
  <script>
  $(function() {
    $("#fromDate_\$ROW\$").datepicker({
      showOn:          'button',
      buttonImage:     'images/calendar_icon.gif',
      buttonImageOnly: true
    });
  });
  </script>

  {$L["Date_to"]}
  <input type="text" name="toDate_\$ROW\$" id="toDate_\$ROW\$" size="10" value="$next_year" />
  <script>
  $(function() {
    $("#toDate_\$ROW\$").datepicker({
      showOn:          'button',
      buttonImage:     'images/calendar_icon.gif',
      buttonImageOnly: true
    });
  });
  </script>
  <div>
    {$L["Date_format_code"]}&nbsp;<input type="text" name="option_\$ROW\$" id="option_\$ROW\$" style="width: 160px;" />
  </div>
END;
  }

  public function getHelpDialogInfo() {
    $html =<<<END
      <p>
        {$L["Date_help_intro"]}
      </p>

      <table cellpadding="0" cellspacing="1">
      <tr>
        <td class="heading_1" width="50">{$L["Date_char"]}</td>
        <td class="heading_1">{$L["Date_description"]}</td>
        <td class="heading_1">{$L["Date_example"]}</td>
      </tr>
      <tr>
        <td class="heading_3" colspan="3">{$L["Date_day"]}</td>
      </tr>
      <tr>
        <td class="heading_1">d</td>
        <td>{$L["Date_help_d"]}</td>
        <td>{$L["Date_help_d_example"]}</td>
      </tr>
      <tr>
        <td class="heading_1">D</td>
        <td>{$L["Date_help_D"]}</td>
        <td>{$L["Date_help_D_example"]}</td>
      </tr>
      <tr>
        <td class="heading_1">j</td>
        <td>{$L["Date_help_j"]}</td>
        <td>{$L["Date_help_j_example"]}</td>
      </tr>
      <tr>
        <td class="heading_1">l</td>
        <td>{$L["Date_help_l"]}</td>
        <td>{$L["Date_help_l_example"]}</td>
      </tr>
      <tr>
        <td class="heading_1">S</td>
        <td>{$L["Date_help_S"]}</td>
        <td>{$L["Date_help_S_example"]}</td>
      </tr>
      <tr>
        <td class="heading_1">w</td>
        <td>{$L["Date_help_w"]}</td>
        <td>{$L["Date_help_w_example"]}</td>
      </tr>
      <tr>
        <td class="heading_1">z</td>
        <td>{$L["Date_help_z"]}</td>
        <td>{$L["Date_help_z_example"]}</td>
      </tr>
      <tr>
        <td class="heading_3" colspan="3">{$L["Date_week"]}</td>
      </tr>
      <tr>
        <td class="heading_1">W</td>
        <td>{$L["Date_help_W"]}</td>
        <td>{$L["Date_help_W_example"]}</td>
      </tr>
      <tr>
        <td class="heading_3" colspan="3">{$L["Date_month"]}</td>
      </tr>
      <tr>
        <td class="heading_1">F</td>
        <td>{$L["Date_help_F"]}</td>
        <td>{$L["Date_help_F_example"]}</td>
      </tr>
      <tr>
        <td class="heading_1">m</td>
        <td>{$L["Date_help_m"]}</td>
        <td>{$L["Date_help_m_example"]}</td>
      </tr>
      <tr>
        <td class="heading_1">M</td>
        <td>{$L["Date_help_M"]}</td>
        <td>{$L["Date_help_M_example"]}</td>
      </tr>
      <tr>
        <td class="heading_1">n</td>
        <td>{$L["Date_help_n"]}</td>
        <td>{$L["Date_help_n_example"]}</td>
      </tr>
      <tr>
        <td class="heading_1">t</td>
        <td>{$L["Date_help_t"]}</td>
        <td>{$L["Date_help_t_example"]}</td>
      </tr>
      <tr>
        <td class="heading_3" colspan="3">{$L["Date_year"]}</td>
      </tr>
      <tr>
        <td class="heading_1">L</td>
        <td>{$L["Date_help_L"]}</td>
        <td>{$L["Date_help_L_example"]}</td>
      </tr>
      <tr>
        <td class="heading_1">Y</td>
        <td>{$L["Date_help_Y"]}</td>
        <td>{$L["Date_help_Y_example"]}</td>
      </tr>
      <tr>
        <td class="heading_1">y</td>
        <td>{$L["Date_help_y"]}</td>
        <td>{$L["Date_help_y_example"]}</td>
      </tr>
      </table>
END;

		return array(
		  "dialogWidth" => $this->helpDialogWidth,
		  "content"     => $html
		);
	}

}