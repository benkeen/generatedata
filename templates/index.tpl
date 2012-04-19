<!DOCTYPE html>
<html>
<head>
  <title>{$L.title}</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="description" content="GenerateData.com: free, GNU-licensed, random custom data generator for testing software" />
  <meta name="keywords" content="Random Data, Test Data, Sample Data, data generator, generate data, Ben Keen, Benjamin Keen" />
  <link rel="stylesheet" type="text/css" href="css/styles.css">
  <link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.8.19.custom.css" />
  {literal}<noscript><style type="text/css">#content { display: none; }</style></noscript>{/literal}
</head>
<body>
  <header>
    <nav>
      <a href="http://www.generatedata.com">{$L.website}</a> |
      <a href="http://www.generatedata.com/#donate">{$L.donate}</a> |
      <a href="http://www.generatedata.com/forums/">{$L.forums}</a> |
      {language_dropdown}
    </nav>
  </header>
  <nav id="tabs">
    <ul>
      <li id="tab1" class="selected">{$L.generate}</li>
      <li id="tab2">{$L.help}</li>
    </ul>
  </nav>
  <section>
    <div id="content">
      <div id="loadingIcon"></div>
      <div id="tab1Content" class="tabContent">

        {if $g_show_save_panel}
        <div id="controlPanelWindow" class="box">
          <div id="controlPanel">
            <div>
              <input type="text" name="saveFormName" id="saveFormName" placeholder="{$L.default_save_form_empty_str}" value=""
                maxlength="35" />
              <button type="button" class="button buttonType2" onclick="io.saveForm()">{$L.save_uc}</button>
            </div>
            <div>
              <select name="formList" id="formList">
                <option value=""><?php echo $L["please_select"]?></option>
                <?php
                for ($i=0; $i<count($forms); $i++)
                {
                  $form_id   = $forms[$i][0];
                  $form_name = $forms[$i][1];
                  echo "<option value=\"$form_id\">$form_name</option>\n";
                }
                ?>
              </select>
              <button type="button" class="button buttonType2" onclick="io.loadForm()">{$L.load_uc}</button>
              <button type="button" class="button buttonType3" onclick="io.deleteForm()">{$L.del_uc}</button>
            </div>
          </div>
        </div>
        {/if}

        <form action="process.php" method="post" name="data" id="data" target="hiddenIframe">
          <input type="hidden" name="numCols" id="numCols" value="" />
          <input type="hidden" name="rowOrder" id="rowOrder" value="" />
          <input type="hidden" name="deletedRows" id="deletedRows" value="" />

          <div class="setting">
            <label>{$L.num_results}</label>
            <div>
              <input type="text" style="width:45px;" name="numResults" id="numResults" value="100" /> <!-- TODO -->
            </div>
            <div class="clear"></div>
          </div>
          <div class="setting">
            <label>{$L.result_type}</label>
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
            <label>{$L.countries}</label>
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
            <a class="close" title="{$L.hide_error}" onclick="return g.hideErrors(false)" href="#">X</a>
            <div></div>
          </div>

          <div class="verticalPad"></div>

          <ul class="tableHeadings">
            <li class="colOrder">{$L.order}</li>
            <li class="colTitle" id="colTitle">{$L.column_title}</li>
            <li class="colDataType">{$L.data_type}</li>
            <li class="colExamples">{$L.examples}</li>
            <li class="colOptions">{$L.options}</li>
            <li class="colHelp">{$L.help}</li>
            <li class="colDelete"><input type="button" class="deleteRowsBtn" value="{$L.del}" /></li>
          </ul>
          <ul id="tableRows"></ul>
          <ul class="tableHeadings">
            <li class="colOrder">{$L.order}</li>
            <li class="colTitle" id="colTitle">{$L.column_title}</li>
            <li class="colDataType">{$L.data_type}</li>
            <li class="colExamples">{$L.examples}</li>
            <li class="colOptions">{$L.options}</li>
            <li class="colHelp">{$L.help}</li>
            <li class="colDelete"><input type="button" class="deleteRowsBtn" value="{$L.del}" /></li>
          </ul>

          <div class="clear"></div>
          <div class="verticalPad"></div>

          <div style="float: right"><input type="button" value="{$L.empty_form}" onclick="return gd.emptyForm(true, 5)" /></div>
          {$L.add} <input type="text" name="numRows" id="numRows" value="1" size="2" />
          <input type="button" value="{$L.row_sp}" onclick="gd.addRows(document.data.numRows.value)" />


          {* hidden iframe, to which the form is submitted *}
          <iframe name="hiddenIframe" src="" frameborder="0" scrolling="no" style="height: 0px; width: 0px;"></iframe>

          <div class="verticalPad"></div>
          <div>
            <button class="button buttonType1" type="submit">{$L.generate}</button>
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
                    <option value="">{$L.please_select}</option>
                    <?php
                    while (list($group_name_key, $curr_data_types) = each($data_types))
                    {
                      $group_name = $L[$group_name_key];
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
      </div>
    </div>

    <noscript>
      <h1>{$L.no_js}</h1>
      {$L.no_js_blurb}
      <form action="{$same_page}">
        <button class="green_button" id="create_database">{$L.refresh_page}</button>
      </form>
    </noscript>
  </section>

  <footer>
    {$L.version} {$version} - <a href="https://github.com/benkeen/generatedata" target="_blank">github</a>
  </footer>

  <?php
  gd_include_data_type_includes();
  ?>

  <script src="scripts/jquery-1.7.2.min.js"></script>
  <script src="scripts/jquery-ui-1.8.19.custom.min.js"></script>
  <script src="scripts/jquery.json-2.2.min.js"></script>
  <script src="scripts/lang.php"></script>
  <script src="scripts/generator.js"></script>
  <script src="scripts/io.js"></script>
</body>
</html>