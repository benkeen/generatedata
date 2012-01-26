<?php

session_start();
header("Cache-control: private");
require_once("library.php");

$_SESSION["account_id"] = 1;
$forms = gd_get_forms($_SESSION["account_id"]);

$data_types   = gd_get_data_types();
$translations = gd_get_translations();
?>
<!DOCTYPE html>
<html>
<head>
  <title><?php echo $LANG["title"]?></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="description" content="GenerateData.com: free, GNU-licensed, random custom data generator for testing software" />
  <meta name="keywords" content="Random Data, Test Data, Sample Data, data generator, generate, Ben Keen, Benjamin Keen" />
  <link rel="stylesheet" type="text/css" href="css/styles.css">
  <link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.8.1.custom.css" />
  <script src="scripts/jquery-1.4.2.min.js"></script>
  <script src="scripts/jquery-ui-1.8.1.custom.min.js"></script>
  <script src="scripts/jquery.json-2.2.min.js"></script>
  <script src="scripts/lang.php"></script>
  <script src="scripts/generator.js"></script>
  <script src="scripts/io.js"></script>
  <script>
  $(function() {
    $("input[name=resultType]").bind("click", function() { gd.changeResultType(this.value); });
    $("input[name=countryChoice\[\]]").bind("click", gd.updateCountryChoice);
    $(".deleteRowsBtn").bind("click", gd.deleteRows);
    $("#selectLanguage").bind("change", gd.changeLanguage);
    $("input[name=sql_statement_type]").bind("click", gd.changeStatementType);
    $("#xml_use_custom_format").bind("click", gd.toggleCustomXMLFormat);
    if ($("#xml_use_custom_format").attr("checked"))
      gd.toggleCustomXMLFormat.call($("#xml_use_custom_format")[0]);

    $("#tableRows").sortable({
      handle: ".colOrder",
      update: function(event, ui) {
        gd.restyleRows();
      }
    });
    $("#data").bind("submit", gd.submitForm);
    gd.init();

    // temporary!
    if ($.browser.msie)
      $("body").html("<h1>Sorry, this script will not run on IE yet.</h1>");
  });
  </script>
</head>
<body>
  <header>
    <nav>
      <a href="http://www.generatedata.com"><?php echo $LANG["website"]?></a> |
      <a href="http://www.generatedata.com/#donate"><?php echo $LANG["donate"]?></a> |
      <a href="http://www.generatedata.com/forums/"><?php echo $LANG["forums"]?></a> |
      <select id="selectLanguage">
        <option value=""><?php echo $LANG["select_language"]?></option>
        <?php
        while (list($file, $language) = each($translations))
        {
          $value = preg_replace("/\.php$/", "", $file);
          $selected = ($value == $g_language) ? " selected" : "";
          echo "<option value=\"{$value}\"{$selected}>{$language}</option>\n";
        }
        ?>
      </select>
    </nav>
  </header>
  <nav id="tabs">
    <ul>
      <li id="tab1" class="selected"><a href="#" onclick="return gd.selectTab(1)"><?php echo $LANG["generate"]?></a></li>
      <li id="tab2"><a href="#" onclick="return gd.selectTab(2)"><?php echo $LANG["help"]?></a></li>
    </ul>
  </nav>
  <section>
    <div id="content">
      <div id="loadingIcon"><img src="images/loading2.gif" width="16" height="16" /></div>
      <div id="tab1Content" class="tabContent">

        <?php if ($g_show_save_panel) { ?>
        <div id="controlPanelWindow" class="box">
          <div id="controlPanel">
            <div>
              <input type="text" name="saveFormName" id="saveFormName" placeholder="<?php echo $LANG["default_save_form_empty_str"]?>" value="" maxlength="35" />
              <button type="button" class="button buttonType2" onclick="io.saveForm()"><?php echo $LANG["save_uc"]?></button>
            </div>
            <div>
              <select name="formList" id="formList">
                <option value=""><?php echo $LANG["please_select"]?></option>
                <?php
                for ($i=0; $i<count($forms); $i++)
                {
                  $form_id   = $forms[$i][0];
                  $form_name = $forms[$i][1];
                  echo "<option value=\"$form_id\">$form_name</option>\n";
                }
                ?>
              </select>
              <button type="button" class="button buttonType2" onclick="io.loadForm()"><?php echo $LANG["load_uc"]?></button>
              <button type="button" class="button buttonType3" onclick="io.deleteForm()"><?php echo $LANG["del_uc"]?></button>
            </div>
          </div>
        </div>
        <?php } ?>

        <form action="process.php" method="post" name="data" id="data" target="hiddenIframe">
          <input type="hidden" name="numCols" id="numCols" value="" />
          <input type="hidden" name="rowOrder" id="rowOrder" value="" />
          <input type="hidden" name="deletedRows" id="deletedRows" value="" />

          <div class="setting">
            <label><?php echo $LANG["num_results"]?></label>
            <div>
              <input type="text" style="width:45px;" name="numResults" id="numResults" value="100" />
            </div>
            <div class="clear"></div>
          </div>
          <div class="setting">
            <label><?php echo $LANG["result_type"]?></label>
            <div>
              <input type="radio" name="resultType" value="HTML" id="HTML" checked /> <label for="HTML">HTML</label>&nbsp;
              <input type="radio" name="resultType" value="Excel" id="Excel" /> <label for="Excel">Excel</label>&nbsp;
              <input type="radio" name="resultType" value="XML" id="XML" /> <label for="XML">XML</label>&nbsp;
              <input type="radio" name="resultType" value="CSV" id="CSV" /> <label for="CSV">CSV</label>&nbsp;
              <input type="radio" name="resultType" value="SQL" id="SQL" /> <label for="SQL">SQL</label>
            </div>
            <div class="clear"></div>
          </div>
          <div class="setting">
            <label><?php echo $LANG["countries"]?></label>
            <div id="countryList">
              <div class="col">
              <?php
              $num_per_col = 3;
              $countries   = gd_get_configurable_countries();
              $row   = 0;
              $slugs = array();
              foreach ($countries as $country_info)
              {
                $country          = $country_info["country"];
                $slug             = $country_info["country_slug"];
                $country_lang_key = $country_info["country_lang_key"];
                $slugs[] = "\"$slug\"";

                if ($row > 0 && ($row % $num_per_col == 0))
                  echo "</div><div class=\"col\">";

                $checked = ($slug == "canada" || $slug == "us") ? "checked" : "";
                $country_in_curr_lang = $LANG[$country_lang_key];

                echo <<<EOF
                  <div>
                    <input type="checkbox" name="countryChoice[]" value="$slug" id="$slug" $checked />
                    <label for="$slug">$country_in_curr_lang</label>
                  </div>
EOF;
                $row++;
              }

              echo "</div>";
              ?>

              <script>gd.allCountries = [<?php echo join(",", $slugs)?>];</script>
            </div>
            <div class="clear"> </div>
          </div>

          <div class="clear"></div>

          <div id="settingsSQL">
            <table cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td width="50%">

                <table cellspacing="2" cellpadding="0" width="100%">
                <tr>
                  <td width="150"><label><?php echo $LANG["db_table_name"]?></label></td>
                  <td><input type="text" size="10" name="sql_table_name" id="sql_table_name" value="myTable" /></td>
                </tr>
                <tr>
                  <td><label><?php echo $LANG["db_type"]?></label></td>
                  <td>
                    <select name="sql_database">
                      <option value="MySQL">MySQL</option>
                      <option value="SQLite">SQLite</option>
                      <option value="Oracle">Oracle</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td><label><?php echo $LANG["misc_options"]?></label></td>
                  <td>
                    <div>
                      <input type="checkbox" name="sql_create_table" id="sql_create_table" checked />
                      <label for="sql_create_table"><?php echo $LANG["include_create_table_query"]?></label>
                    </div>
                    <div>
                      <input type="checkbox" name="sql_drop_table" id="sql_drop_table" checked />
                      <label for="sql_drop_table"><?php echo $LANG["include_drop_table_query"]?></label>
                    </div>
                    <div>
                      <input type="checkbox" name="enclose_with_backquotes" id="enclose_with_backquotes" checked />
                      <label for="enclose_with_backquotes"><?php echo $LANG["enclose_table_backquotes"]?></label>
                    </div>
                  </td>
                </tr>
                </table>

              </td>
              <td width="50%">

                <table cellspacing="0" cellpadding="0" width="100%">
                <tr>
                  <td><label><?php echo $LANG["statement_type"]?></label></td>
                  <td>
                    <div>
                      <input type="radio" name="sql_statement_type" id="sst1" value="insert" checked />
                      <label for="sst1">INSERT</label>
                    </div>
                    <div>
                      <input type="radio" name="sql_statement_type" id="sst2" value="update" />
                      <label for="sst2">UPDATE</label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><label><?php echo $LANG["primary_key"]?></label></td>
                  <td>
                  <div>
                    <input type="radio" name="sql_primary_key" id="spk2" value="none" />
                    <label for="spk2"><?php echo $LANG["none"]?></label>
                  </div>
                  <div>
                    <input type="radio" name="sql_primary_key" id="spk1" value="default" checked />
                    <label for="spk1"><?php echo $LANG["add_default_auto_increment_col"]?></label>
                  </div>
                  </td>
                </tr>
                </table>

              </td>
            </tr>
            </table>
          </div>

          <div id="settingsXML">
            <table cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td width="30%" valign="top">
                <table cellspacing="0" cellpadding="0">
                <tr>
                  <td width="160"><label for="xml_root_node_name"><?php echo $LANG["root_node_name"]?></label></td>
                  <td>
          <input type="text" size="10" name="xml_root_node_name" id="xml_root_node_name" value="records" />
                  </td>
                </tr>
                <tr>
                  <td><label for="xml_record_node_name"><?php echo $LANG["record_node_name"]?></label></td>
                  <td>
          <input type="text" size="10" name="xml_record_node_name" id="xml_record_node_name" value="record" />
                  </td>
                </tr>
                </table>
              </td>
              <td width="70%" valign="top">
                <label for="xml_use_custom_format">
                  <input type="checkbox" name="xml_use_custom_format" id="xml_use_custom_format" />
                  <?php echo $LANG["use_custom_xml_format"]?>
                </label>
        <textarea style="width: 98%; height: 70px" class="disabled" name="xml_custom_format" id="xml_custom_format" disabled>&lt;?xml version="1.0" encoding="UTF-8" ?&gt;
&lt;records&gt;
  {records}
    &lt;record&gt;
      &lt;row1&gt;{ROW1}&lt;/row1&gt;
      &lt;row2&gt;{ROW2}&lt;/row2&gt;
    &lt;/record&gt;
  {/records}
&lt;/records&gt;</textarea>
              </td>
            </tr>
            </table>
          </div>

          <div id="settingsCSV">
            <table cellspacing="0" cellpadding="0" width="100%">
            <tr>
              <td width="50%">
                <table cellspacing="2" cellpadding="0" width="100%">
                <tr>
                  <td width="160"><?php echo $LANG["delimiter_chars"]?></td>
                  <td>
                  <input type="text" size="2" name="csv_delimiter" id="csv_delimiter" value="|" />
                  </td>
                </tr>
                </table>
              </td>
              <td width="50%">
                <table cellspacing="0" cellpadding="0" width="100%">
                <tr>
                  <td width="160"><?php echo $LANG["eol_char"]?></td>
                  <td>
                    <select name="csv_line_endings" id="csv_line_endings">
                      <option value="Windows">Windows</option>
                      <option value="Unix">Unix</option>
                      <option value="Mac">Mac</option>
                    </select>
                  </td>
                </tr>
                </table>
              </td>
            </tr>
            </table>
          </div>

          <div id="messages">
            <a class="close" title="<?php echo $LANG["hide_error"]?>" onclick="return gd.hideErrors(false)" href="#">X</a>
            <div></div>
          </div>

          <div class="verticalPad"></div>

          <ul class="tableHeadings">
            <li class="colOrder"><?php echo $LANG["order"]?></li>
            <li class="colTitle" id="colTitle"><?php echo $LANG["column_title"]?></li>
            <li class="colDataType"><?php echo $LANG["data_type"]?></li>
            <li class="colExamples"><?php echo $LANG["examples"]?></li>
            <li class="colOptions"><?php echo $LANG["options"]?></li>
            <li class="colHelp"><?php echo $LANG["help"]?></li>
            <li class="colDelete"><input type="button" class="deleteRowsBtn" value="<?php echo $LANG["del"]?>" /></li>
          </ul>
          <ul id="tableRows">
          </ul>
          <ul class="tableHeadings">
            <li class="colOrder"><?php echo $LANG["order"]?></li>
            <li class="colTitle" id="colTitle"><?php echo $LANG["column_title"]?></li>
            <li class="colDataType"><?php echo $LANG["data_type"]?></li>
            <li class="colExamples"><?php echo $LANG["examples"]?></li>
            <li class="colOptions"><?php echo $LANG["options"]?></li>
            <li class="colHelp"><?php echo $LANG["help"]?></li>
            <li class="colDelete"><input type="button" class="deleteRowsBtn" value="<?php echo $LANG["del"]?>" /></li>
          </ul>

          <div class="clear"></div>
          <div class="verticalPad"></div>

          <div style="float: right"><input type="button" value="<?php echo $LANG["empty_form"]?>" onclick="return gd.emptyForm(true, 5)" /></div>
          <?php echo $LANG["add"]?> <input type="text" name="numRows" id="numRows" value="1" size="2" />
          <input type="button" value="<?php echo $LANG["row_sp"]?>" onclick="gd.addRows(document.data.numRows.value)" />


          <!-- hidden iframe, to which the form is submitted -->
          <iframe name="hiddenIframe" src="" frameborder="0" scrolling="no" style="height: 0px; width: 0px;"></iframe>

          <div class="verticalPad"></div>
          <div>
            <button class="button buttonType1" type="submit"><?php echo $LANG["generate"]?></button>
          </div>

          <div id="field_type_hidden_data">
            <div id="HTML_Row">
              <ul>
                <li class="colOrder">$ROW$</li>
                <li class="colTitle"><input type="text" name="title_$ROW$" id="title_$ROW$" /></li>
                <li class="colDataType">
                  <select name="type_$ROW$" id="type_$ROW$" onchange="gd.changeRowType(this.name, this.value)">
                    <option value=""><?php echo $LANG["please_select"]?></option>
                    <?php
                    while (list($group_name_key, $curr_data_types) = each($data_types))
                    {
                      $group_name = $LANG[$group_name_key];
                      echo "<optgroup label=\"$group_name\">\n";

                      foreach ($curr_data_types as $data_type_info)
                      {
                        echo "<option value=\"{$data_type_info["data_folder_name"]}\">{$data_type_info["data_type_name"]}</option>\n";
                      }

                      echo "</optgroup>\n";
                    }
                    ?>
                  </select>
                </li>
                <li class="colExamples" id="example_$ROW$">&nbsp;</li>
                <li class="colOptions" id="options_$ROW$">&nbsp;</li>
                <li class="colHelp" id="help_$ROW$">&nbsp;</li>
                <li class="colDelete"><input type="checkbox" onclick="gd.markRowAsDeleted(this)" name="deleteRows" /></li>
              </ul>
            </div>

            <div id="HTML_question">
              <ul class="ui-widget ui-helper-clearfix">
                <li class="ui-state-default ui-corner-all" onmouseover="$(this).addClass('ui-state-hover')"
                  onmouseout="$(this).removeClass('ui-state-hover')"
                  onclick="gd.showHelpPopup($ROW$)"
                  id="helpLink_$ROW$"><span class="ui-icon ui-icon-help" /></li>
              </ul>
            </div>

            <?php
            reset($data_types);
            while (list($group_name, $curr_data_types) = each($data_types))
            {
              foreach ($curr_data_types as $data_type_info)
              {
                $dt_ns = $data_type_info["data_folder_name"];

                // examples HTML
                if (!empty($data_type_info["data_type_example_html"]))
                  echo "<div id=\"dt_example_$dt_ns\">{$data_type_info["data_type_example_html"]}</div>";

                // options HTML
                if (!empty($data_type_info["data_type_options_html"]))
                  echo "<div id=\"dt_options_$dt_ns\">{$data_type_info["data_type_options_html"]}</div>";

                // help popup
                if (!empty($data_type_info["help_html_content"]))
                {
                  echo "<div id=\"dt_help_$dt_ns\">{$data_type_info["help_html_content"]}</div>";

                  // settings for the help popup
                  echo <<<EOF
                    <script>
                    gd.dataTypes["$dt_ns"] = {
                      width: {$data_type_info["help_popup_width"]}
                    }
                    </script>
EOF;
                }
              }
            }
            ?>
          </div>
        </form>
        <div id="helpPopup"></div>
      </div>

      <div class="tabContent" id="tab2Content">
        <br />
        <b>Coming soon!</b>
        <br />
        <br />
        This tab will contain additional links to help documentation, such as information on how to develop your
        own data types and information about the API.
        <br />
        <br />
        <br />
      </div>
    </div>

    <noscript>
      <div class="error"><span><span><span><span><span><span><span><span>
      <div class="red"><?php echo $LANG["no_js"]?></div>
      <br/>
      <?php echo $LANG["no_js_blurb"]?>
      </span></span></span></span></span></span></span></span></div>
    </noscript>
  </section>

  <footer>Version <?php echo $g_version?></footer>

  <?php
  gd_include_data_type_includes();
  ?>
</body>
</html>