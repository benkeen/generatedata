var io = {

  saveForm: function()
  {
    var buttons = [];
    var newFormName = $("#saveFormName").val();
    if (!newFormName || newFormName == L.default_save_form_empty_str)
    {
      gd.errors = [];
      gd.errors.push({ els: null, error: L.no_form_name });
      gd.displayErrors();
      return false;
    }

    // if the name already exists, check with the user that it's okay to overwrite it
    var form_exists = false;
    var form_list_dd = $("#formList")[0];
    for (var i=0; i<form_list_dd.length; i++)
    {
      if (form_list_dd[i].text == newFormName)
        form_exists = true;
    }

    if (form_exists)
    {
      if (!confirm(L.form_exists_overwrite_confirmation))
        return false;
    }

    // okay! now we serialize the form data and submit it for storage
    var countries = [];
    for (i=0; i<document.data["countryChoice[]"].length; i++)
    {
      if (document.data["countryChoice[]"][i].checked)
        countries.push(document.data["countryChoice[]"][i].value);
    }

    var rowData = [];
    var orderedRowIDs = gd._getRowOrder();
    for (var i=0; i<orderedRowIDs.length; i++)
    {
      var currRow  = orderedRowIDs[i];
      var func_ns  = $("#type_" + currRow).val() + "_ns";

      // not every data type NEEDS a save-load function beyond the data type dropdown value, e.g.
      // "email" data type
      var currData = {};
      if (typeof window[func_ns] === "object" && typeof window[func_ns].saveRow === "function")
        currData = window[func_ns].saveRow(currRow);

      currData.title    = $("#title_" + currRow).val();
      currData.dataType = $("#type_" + currRow).val();
      rowData.push(currData);
    }

    var data = {
      numResults: document.data.numResults.value,
      resultType: $("input[name=resultType]:checked").val(),
      countries: countries,
      xmlSettings: {
        rootNodeName:          $("#xml_root_node_name").val(),
        recordNodeName:        $("#xml_record_node_name").val(),
        xml_use_custom_format: $("#xml_use_custom_format").attr("checked"),
        xml_custom_format:     $("#xml_custom_format").val()
      },
      csvSettings: {
        delimiter:        $("#csv_delimiter").val(),
        csv_line_endings: $("#csv_line_endings").val()
      },
      sqlSettings: {
        dbTableName:   $("#sql_table_name").val(),
        dbType:        $("#sql_database").val(),
        includeCreateTableQuery: $("#sql_create_table").is(":checked"),
        includeDropTableQuery:   $("#sql_drop_table").is(":checked"),
        encloseWithBackquotes:   $("#enclose_with_backquotes").is(":checked"),
        statementType: $("input[name=sql_statement_type]:checked").val(),
        primaryKey:    $("input[name=sql_primary_key]:checked").val()
      },
      rowData: rowData
    };

    var data_str = 'form_name=' + newFormName + '&form_content=' + $.toJSON(data);
    gd.startProcessing();

    $.ajax({
      url:  "code/ajax_save.php",
      data: data_str,
      success: function(data) {
        var json = $.evalJSON(data);

        // if this form isn't listed in the form dropdown list, add it
        var already_listed = false;
        var form_list_dd = $("#formList")[0];
        for (var f=0; f<form_list_dd.length; f++)
        {
          if (form_list_dd[f].text == json.form_name)
            already_listed = true;
        }
        if (!already_listed)
          form_list_dd[form_list_dd.length] = new Option(json.form_name, json.form_id, false, false);

        gd.displayMessage(L.form_saved);
        gd.stopProcessing();
      },

      error: function() {
        alert(L.fatal_error);
        gd.stopProcessing();
      }
    });
  },

  loadForm: function()
  {
    if (gd.queue.length)
    {
      alert(L.script_thinking);
      return false;
    }

    gd.startProcessing();

    // get the form to load
    $.ajax({
      url:  "code/ajax_load.php",
      data: "form_id=" + $("#formList").val(),
      success: function(data)
      {
        var json = $.evalJSON(data);

        if (json.success == "true")
        {
          var info = json.form_content;

          var form_list = $("#formList")[0];
          for (var i=0; i<form_list.length; i++)
          {
            if (form_list[i].selected)
              $("#saveFormName").val(form_list[i].text);
          }

          // remove all the existing rows (except the heading row)
          gd.emptyForm(false, 0);

          $("#numResults").val(info.numResults);
          for (var i=0; i<document.data.resultType.length; i++)
          {
            if (document.data.resultType[i].value == info.resultType)
            {
              document.data.resultType[i].checked = true;
              gd.changeResultType(info.resultType);
              break;
            }
          }
          for (i=0; i<document.data["countryChoice[]"].length; i++)
          {
            if ($.inArray(document.data["countryChoice[]"][i].value, info.countries) != -1)
              document.data["countryChoice[]"][i].checked = true;
            else
              document.data["countryChoice[]"][i].checked = false;
          }
          gd.updateCountryChoice();

          // XML
          $("#xml_root_node_name").val(info.xmlSettings.rootNodeName);
          $("#xml_record_node_name").val(info.xmlSettings.recordNodeName);
          $("#xml_use_custom_format").attr("checked", info.xmlSettings.xml_use_custom_format);
          $("#xml_custom_format").val(info.xmlSettings.xml_custom_format);
          gd.toggleCustomXMLFormat.call($("#xml_use_custom_format"));

          // CSV
          $("#csv_delimiter").val(info.csvSettings.delimiter);
          $("#csv_line_endings").val(info.csvSettings.csv_line_endings);

          // SQL
          $("#sql_table_name").val(info.sqlSettings.dbTableName);
          $("#sql_database").val(info.sqlSettings.dbType);
          $("#sql_create_table").attr("checked", info.sqlSettings.includeCreateTableQuery);
          $("#sql_drop_table").attr("checked", info.sqlSettings.includeDropTableQuery);
          $("#enclose_with_backquotes").attr("checked", info.sqlSettings.encloseWithBackquotes);
          $("input:radio[name=sql_statement_type]").filter("[value=" + info.sqlSettings.statementType + "]").attr("checked", true);
          $("input:radio[name=sql_primary_key]").filter("[value=" + info.sqlSettings.primaryKey + "]").attr("checked", true);

          // add the new blank rows
          gd.addRows(info.rowData.length);
          var rowOrder = gd._getRowOrder();

          // now populate the rows. Do everything that we can: create the rows, populate the titles & select
          // the data type. The remaining fields are custom to the data type, so we leave them to their
          // [ns].loadRow function (if defined)
          for (var i=0; i<rowOrder.length; i++)
          {
            var currRow = rowOrder[i];
            $("#title_" + currRow).val(info.rowData[i]["title"]); // decodeURIComponent
            $("#type_" + currRow).val(info.rowData[i]["dataType"]);
            gd.changeRowType("type_" + currRow, info.rowData[i]["dataType"]);

            var func_ns  = $("#type_" + currRow).val() + "_ns";
            if (typeof window[func_ns] === "object" && typeof window[func_ns].loadRow === "function")
            {
              gd.queue.push(window[func_ns].loadRow(currRow, info.rowData[i]));
            }
          }
          gd.processQueue();
        }
        else
        {
          gd.errors = [];
          gd.errors.push({ els: null, error: json.message });
          gd.displayErrors();
        }
        gd.stopProcessing();
      }
    });
  },

  /*
  loadRowContent: function()
  {
    for (currRow=1; currRow<=g_lastJsonResponse.num_rows; currRow++)
    {
      row_type = decodeURIComponent(g_lastJsonResponse["type" + currRow]);

      switch (row_type)
      {
        case "Date":
          var date_info = decodeURIComponent(g_lastJsonResponse["option" + currRow]).split(",");
          $("#fromDate_" + currRow).value = date_info[0];
          $("#toDate_" + currRow).value   = date_info[1];
          $("#option_" + currRow).value   = date_info[2];
          break;

        case "Text-Fixed":
          $("#numWords_" + currRow).value = decodeURIComponent(g_lastJsonResponse["option" + currRow]);
          break;

        case "Text-Random":
          var rand_text_info = decodeURIComponent(g_lastJsonResponse["option" + currRow]).split(",");
          $("#startsWithLipsum_" + currRow).checked = (rand_text_info[0] == "true") ? true : false;
          $("#numWordsMin_" + currRow).value = rand_text_info[1];
          $("#numWordsMax_" + currRow).value = rand_text_info[2];
          break;

        case "Auto-Increment":
          $("#datatype_" + currRow).value = decodeURIComponent(g_lastJsonResponse["example" + currRow]);
          var auto_increment_info = decodeURIComponent(g_lastJsonResponse["option" + currRow]).split(",");
          $("#autoIncrementStart_" + currRow).value = auto_increment_info[0];
          $("#autoIncrementValue_" + currRow).value = auto_increment_info[1];
          break;

        case "Number-Range":
          var num_range = decodeURIComponent(g_lastJsonResponse["option" + currRow]).split(",");
          $("#numRangeMin_" + currRow).value = num_range[0];
          $("#numRangeMax_" + currRow).value = num_range[1];
          break;

        case "List":
          $("#datatype_" + currRow).value = decodeURIComponent(g_lastJsonResponse["example" + currRow]);
          var list = decodeURIComponent(g_lastJsonResponse["option" + currRow]).split(",");
          $("#listType1_" + currRow).checked = (list[0] == "true") ? true : false;
          $("#listType2_" + currRow).checked = (list[1] == "true") ? true : false;
          $("#exactly_" + currRow).value = list[2];
          $("#atMost_" + currRow).value = list[3];
          $("#option_" + currRow).value = list[4];
          break;
      }
    }
  },
  */

  deleteForm: function()
  {
    var form_id = $("#formList").val();
    if (!form_id)
    {
      gd.errors = [];
      gd.errors.push({ els: null, error: "Please select a form to delete." });
      gd.displayErrors();
      return false;
    }

    // check it's okay with the user first
    if (!confirm(L.confirm_delete_form))
      return false;

    gd.startProcessing();

    $.ajax({
      url:  "code/ajax_delete_form.php",
      data: "form_id=" + $("#formList").val(),
      success: function(data)
      {
        var json = $.evalJSON(data);
        if (json.success)
        {
          // it was deleted. Remove it from the dropdown list and inform the user
          var formList = $("#formList")[0];
          for (var i=0; i<formList.options.length; i++)
          {
            if (formList.options[i].value == json.form_id)
              formList.options[i] = null;
          }

          gd.displayMessage(L.form_deleted);
        }
        else
        {
          gd.displayMessage(L.form_not_deleted);
        }

        gd.stopProcessing();
      },
      error: function(data)
      {
        alert(L.fatal_error);
        gd.stopProcessing();
      }
    });
  }
}
