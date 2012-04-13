<!DOCTYPE html>
<html>
<head>
  <title>{$LANG.title}</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="description" content="GenerateData.com: free, GNU-licensed, random custom data generator for testing software" />
  <meta name="keywords" content="Random Data, Test Data, Sample Data, data generator, generate data, Ben Keen, Benjamin Keen" />
  <link rel="stylesheet" type="text/css" href="css/styles.css">
  <link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.8.1.custom.css" />
  {literal}<noscript><style type="text/css">#content { display: none; }</style></noscript>{/literal}
</head>
<body>
  <header>
    <nav>
      <a href="http://www.generatedata.com">{$LANG.website}</a> |
      <a href="http://www.generatedata.com/#donate">{$LANG.donate}</a> |
      <a href="http://www.generatedata.com/forums/">{$LANG.forums}</a> |
      {language_dropdown}
    </nav>
  </header>
  <nav id="tabs">
    <ul>
      <li id="tab1" class="selected">{$LANG.generate}</li>
      <li id="tab2">{$LANG.help}</li>
    </ul>
  </nav>
  <section>
    <div id="content">
      <!--  TODO -->
      <div id="loadingIcon"><img src="images/loading2.gif" width="16" height="16" /></div>
      <div id="tab1Content" class="tabContent">

        {if $g_show_save_panel}
        <div id="controlPanelWindow" class="box">
          <div id="controlPanel">
            <div>
              <input type="text" name="saveFormName" id="saveFormName" placeholder="{$LANG.default_save_form_empty_str}" value=""
                maxlength="35" />
              <button type="button" class="button buttonType2" onclick="io.saveForm()">{$LANG.save_uc}</button>
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
              <button type="button" class="button buttonType2" onclick="io.loadForm()">{$LANG.load_uc}</button>
              <button type="button" class="button buttonType3" onclick="io.deleteForm()">{$LANG.del_uc}</button>
            </div>
          </div>
        </div>
        {/if}

        <form action="process.php" method="post" name="data" id="data" target="hiddenIframe">
          <input type="hidden" name="numCols" id="numCols" value="" />
          <input type="hidden" name="rowOrder" id="rowOrder" value="" />
          <input type="hidden" name="deletedRows" id="deletedRows" value="" />

          <div class="setting">
            <label>{$LANG.num_results}</label>
            <div>
              <input type="text" style="width:45px;" name="numResults" id="numResults" value="100" /> <!-- TODO -->
            </div>
            <div class="clear"></div>
          </div>
          <div class="setting">
            <label>{$LANG.result_type}</label>
            <div>
              <input type="radio" name="resultType" value="HTML" id="HTML" checked="checked" /> <label for="HTML">HTML</label>&nbsp;
              <input type="radio" name="resultType" value="Excel" id="Excel" /> <label for="Excel">Excel</label>&nbsp;
              <input type="radio" name="resultType" value="XML" id="XML" /> <label for="XML">XML</label>&nbsp;
              <input type="radio" name="resultType" value="CSV" id="CSV" /> <label for="CSV">CSV</label>&nbsp;
              <input type="radio" name="resultType" value="SQL" id="SQL" /> <label for="SQL">SQL</label>
            </div>
            <div class="clear"></div>
          </div>
          <div class="setting">
            <label>{$LANG.countries}</label>
            <div id="countryList">
              {country_list}
            </div>
            <div class="clear"> </div>
          </div>

          <div class="clear"></div>

          <div id="settingsSQL">{include file="settings_sql.tpl"}</div>
          <div id="settingsXML">{include file="settings_xml.tpl"}</div>
          <div id="settingsCSV">{include file="settings_csv.tpl"}</div>

          <div id="messages">
            <a class="close" title="{$LANG.hide_error}" onclick="return g.hideErrors(false)" href="#">X</a>
            <div></div>
          </div>

          <div class="verticalPad"></div>

          <ul class="tableHeadings">
            <li class="colOrder">{$LANG.order}</li>
            <li class="colTitle" id="colTitle">{$LANG.column_title}</li>
            <li class="colDataType">{$LANG.data_type}</li>
            <li class="colExamples">{$LANG.examples}</li>
            <li class="colOptions">{$LANG.options}</li>
            <li class="colHelp">{$LANG.help}</li>
            <li class="colDelete"><input type="button" class="deleteRowsBtn" value="{$LANG.del}" /></li>
          </ul>
          <ul id="tableRows"></ul>
          <ul class="tableHeadings">
            <li class="colOrder">{$LANG.order}</li>
            <li class="colTitle" id="colTitle">{$LANG.column_title}</li>
            <li class="colDataType">{$LANG.data_type}</li>
            <li class="colExamples">{$LANG.examples}</li>
            <li class="colOptions">{$LANG.options}</li>
            <li class="colHelp">{$LANG.help}</li>
            <li class="colDelete"><input type="button" class="deleteRowsBtn" value="{$LANG.del}" /></li>
          </ul>

          <div class="clear"></div>
          <div class="verticalPad"></div>

          <div style="float: right"><input type="button" value="{$LANG.empty_form}" onclick="return gd.emptyForm(true, 5)" /></div>
          {$LANG.add} <input type="text" name="numRows" id="numRows" value="1" size="2" />
          <input type="button" value="{$LANG.row_sp}" onclick="gd.addRows(document.data.numRows.value)" />


          {* hidden iframe, to which the form is submitted *}
          <iframe name="hiddenIframe" src="" frameborder="0" scrolling="no" style="height: 0px; width: 0px;"></iframe>

          <div class="verticalPad"></div>
          <div>
            <button class="button buttonType1" type="submit">{$LANG.generate}</button>
          </div>

          <!--  TODO - jquery templates? Might be nicer...! -->
          <div id="field_type_hidden_data">
            <div id="HTML_Row">
              <ul>
                <li class="colOrder">$ROW$</li>
                <li class="colTitle"><input type="text" name="title_$ROW$" id="title_$ROW$" /></li>
                <li class="colDataType">
                  <select name="type_$ROW$" id="type_$ROW$" onchange="gd.changeRowType(this.name, this.value)">
                  {*
                    <option value="">{$LANG.please_select}</option>
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
                  *}
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

            {*
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
            *}
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

    <!-- TODO -->
    <noscript>
      <div class="error"><span><span><span><span><span><span><span><span>
      <div class="red"><?php echo $LANG["no_js"]?></div>
      <br/>
      <?php echo $LANG["no_js_blurb"]?>
      </span></span></span></span></span></span></span></span></div>
    </noscript>
  </section>

  <footer>
    Version {$g_version}
  </footer>

  <?php
  gd_include_data_type_includes();
  ?>

  <script src="scripts/jquery-1.4.2.min.js"></script>
  <script src="scripts/jquery-ui-1.8.1.custom.min.js"></script>
  <script src="scripts/jquery.json-2.2.min.js"></script>
  <script src="scripts/lang.php"></script>
  <script src="scripts/generator.js"></script>
  <script src="scripts/io.js"></script>
</body>
</html>