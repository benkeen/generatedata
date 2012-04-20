$(function() {
  $("input[name=resultType]").bind("click", function() { gd.changeResultType(this.value); });
  $("input[name=countryChoice\[\]]").bind("click", gd.updateCountryChoice);
  $(".deleteRowsBtn").bind("click", gd.deleteRows);
  $("input[name=sql_statement_type]").bind("click", gd.changeStatementType);
  $("#xml_use_custom_format").bind("click", gd.toggleCustomXMLFormat);
  if ($("#xml_use_custom_format").attr("checked")) {
    gd.toggleCustomXMLFormat.call($("#xml_use_custom_format")[0]);
  }

  $("#tableRows").sortable({
    handle: ".colOrder",
    update: function(event, ui) {
      gd.restyleRows();
    }
  });
  $("#data").bind("submit", gd.submitForm);
  gd.init();

  // TODO
  if ($.browser.msie) {
    $("body").html("<h1>Sorry, this script will not run on IE yet.</h1>");
  }
});


var gd = {
  numRows:          0,
  request:          null,
  countries:        [],
  allCountries:     [],
  lastJsonResponse: null,
  queue:            [],
  deletedRows:      [],
  dataTypes:        {},   // populated on load with all data types from the /data_types folder
  currResultType:   null, // populated on load

  init: function() {
    gd.addRows(5);
    gd.initResultType();
    gd.updateCountryChoice();
  },

  addRows: function(rows) {
    var rows = rows.toString();
    if (rows.match(/\D/) || rows == 0 || rows == "") {
      g.clearErrors();
      gd.errors.push({ els: [$("#numRows")], error: L.no_num_rows });
      gd.displayErrors();
      return false;
    }

    for (var i=1; i<=rows; i++) {
      var currRow = ++gd.numRows;
      var newRowHTML = $('#HTML_Row').html().replace(/\$ROW\$/g, currRow);
      $("#tableRows").append("<li class=\"tableRow\" id=\"row_" + currRow + "\">" + newRowHTML +"</li>");
    }

    $("#numCols").val(gd.numRows);
    gd.restyleRows();
  },

  deleteRows: function() {
    $("input[name=deleteRows]:checked").each(function() {
      var parentRowID = $(this).parents(".tableRow").attr("id");
      if (parentRowID != null) {
        var row = parentRowID.replace(/row_/g, "");

        // remove element here
        $(this).parents(".tableRow").remove();
        gd.deletedRows.push(row);
      }
    });

    gd.restyleRows();
  },

  markRowAsDeleted: function(el) {
    if (el.checked) {
      $(el).parents(".tableRow").addClass("deletedRow");
    } else {
      $(el).parents(".tableRow").removeClass("deletedRow");
    }
  },

  restyleRows: function() {
    $("#tableRows>li").removeClass("oddRow");
    $("#tableRows>li").removeClass("evenRow"); // TODO
    $("#tableRows>li:odd").addClass("oddRow");
    $("#tableRows>li:even").addClass("evenRow");
    $("#tableRows>li .colOrder").each(function(i) { $(this).html(i+1); });
  },

  showHelpPopup: function(row) {
    var choice = $("#type_" + row).val();
    var title   = null;
    for (var i=0; i<$("#type_" + row)[0].options.length; i++) {
      if (choice == $("#type_" + row)[0].options[i].value)
        title = $("#type_" + row)[0].options[i].text;
    }
    var width = gd.dataTypes[choice].width;

    var myDialog = $('#helpPopup').html($("#dt_help_" + choice).html()).dialog({
      autoOpen:  false,
      modal:     true,
      resizable: false,
      title:     title,
      width:     width
    });
    myDialog.dialog('open');
  },

  changeRowType: function(rowType, choice) {
    var row = parseInt(rowType.replace(/^type_/, ""));

    // if the user just selected the empty value ("Please Select"), clear everything
    if (choice == "") {
      $('#example_' + row).html(""); // TODO
      $('#options_' + row).html("");
      $('#help_' + row).html("");
      return;
    }

    var noOptionsTest  = function() { return true; };
    var hasOptionsTest = function() { return (typeof $("#option_" + row) != "undefined"); };
    var readyTest = ($("#dt_options_" + rowType).length > 0) ? hasOptionsTest : noOptionsTest;

    gd.queue.push([
      function() {
        var exampleHTML = null;
        var optionsHTML = null;

        if ($("#dt_example_" + choice).length > 0) {
          exampleHTML = $("#dt_example_" + choice).html().replace(/\$ROW\$/g, row);
        } else {
          exampleHTML = "&nbsp;" + L.no_examples_available;
        }
        $('#example_' + row).html(exampleHTML);

        if ($("#dt_options_" + choice).length > 0) {
          optionsHTML = $("#dt_options_" + choice).html().replace(/\$ROW\$/g, row);
        } else {
          optionsHTML = "&nbsp;" + L.no_options_available;
        }
        $('#options_' + row).html(optionsHTML);

        if ($("#dt_help_" + choice).length > 0) {
          $('#help_' + row).html($("#HTML_question").html().replace(/\$ROW\$/g, row));
        } else {
          $('#help_' + row).html(" ");
        }
      },
      readyTest
    ]);

    gd.processQueue();
  },

  // called whenever the user changes the result type, to hide/show custom options
  changeResultType: function(resultType) {
    if (resultType == gd.currResultType) {
      return;
    }

    switch (resultType) {
      case "HTML":
      case "Excel":
        $("#colTitle").html(L.column_title);
        gd.hideResultTypeIfOpen(["XML", "SQL", "CSV"]);
        break;
      case "XML":
        $("#colTitle").html(L.node_name);
        gd.hideResultTypeIfOpen(["SQL", "CSV"]);
        $("#settingsXML").show("blind", null, 500);
        break;
      case "CSV":
        $("#colTitle").html(L.column_title);
        gd.hideResultTypeIfOpen(["SQL", "XML"]);
        $("#settingsCSV").show("blind", null, 500);
        break;
      case "SQL":
        $("#colTitle").html(L.table_column);
        gd.hideResultTypeIfOpen(["CSV", "XML"]);
        $("#settingsSQL").show("blind", null, 500);
        break;
    }

    gd.currResultType = resultType;
  },

  changeStatementType: function() {
    if ($("input[name=sql_statement_type]:checked").val() == "update") {
      $("#spk1").attr("checked", "checked");
      $("input[name=sql_primary_key]").attr("disabled", "disabled");
    } else {
      $("input[name=sql_primary_key]").attr("disabled", "");
    }
  },

  hideResultTypeIfOpen: function(resultTypes) {
    for (var i=0; i<resultTypes.length; i++) {
      if (gd.currResultType == resultTypes[i] && $("#settings" + resultTypes[i]).length > 0) {
        $("#settings" + resultTypes[i]).hide("blind", null, 500);
      }
    }
  },

  updateCountryChoice: function() {
    gd.countries.length = 0;

    for (var i=0; i<document.data["countryChoice[]"].length; i++) {
      if (document.data["countryChoice[]"][i].checked) {
        gd.countries.push(document.data["countryChoice[]"][i].value);
      }
    }

    // now hide/show all country-specific elements, based on what the user has selected)
    for (var i=0; i<gd.allCountries.length; i++) {
      var elements = $(".country_" + gd.allCountries[i]);

      // if selected, ensure that elements with that language's classes are visible
      var display = ($.inArray(gd.allCountries[i], gd.countries) != -1) ? "block" : "none";
      if (elements.length > 0) {
        for (var k=0; k<elements.length; k++) {
          elements[k].style.display = display;
        }
      }
    }
  },

  toggleCustomXMLFormat: function() {
	if ($(this).attr("checked")) {
	  $("#xml_custom_format").attr("disabled", false);
	  $("#xml_custom_format").removeClass("disabled");
	} else {
      $("#xml_custom_format").attr("disabled", true);
      $("#xml_custom_format").addClass("disabled");
	}
  },

  // called on page load. Hides/shows the resultType-specific fields
  initResultType: function() {
    for (var i=0; i<document.data.resultType.length; i++) {
      if (document.data.resultType[i].checked) {
        gd.currResultType = document.data.resultType[i].value;
        switch (document.data.resultType[i].value) {
          case "XML":
            $("#custom_col_name").html(L.node_name);
            $("#settingsXML").show();
            break;
          case "SQL":
            $("#custom_col_name").html(L.table_column);
            $("#settingsSQL").show();
            break;
          case "CSV":
            $("#custom_col_name").html(L.table_column);
            $("#settingsCSV").show();
            break;
        }
      }
    }
  },

  emptyForm: function(requireConfirmation, numInitRows) {
    if (requireConfirmation) {
      var answer = confirm(L.confirm_empty_form);
      if (!answer) {
        return false;
      }
    }

    $("input[name=deleteRows]").attr("checked", "checked");
    gd.deleteRows();

    if (numInitRows) {
      gd.addRows(numInitRows);
    }

    return false;
  },


  // determines the target of the form: the hidden iframe for excel or a new window for HTML
  submitForm: function() {
    var numResults = $("#numResults").val();
    var numCols    = $("#numCols").val();

    g.clearErrors();

    // check numResults is an integer
    if (numResults.match(/\D/) || numResults == 0 || numResults == "") {
      gd.errors.push({ el: $("#numResults"), error: L.invalid_num_results });
    }

    var error = false;
    var orderedRowIDs = gd._getRowOrder();
    var resultType = $("input[name=resultType]:checked").val();
    var numGeneratedRows = 0;

    var missingNodeNames  = [];
    var invalidNodeNames  = [];
    var missingTableNames = [];
    var invalidTableNames = [];

    var visibleRowNum = 0;
    var dataTypeValidationFunctions = [];
    for (var i=0; i<orderedRowIDs.length; i++) {
      var nodeNum = orderedRowIDs[i];
      visibleRowNum++;

      // ignore rows that haven't specified a data type
      if ($("#type_" + nodeNum).val() == "") {
        continue;
      }

      switch (resultType) {
        case "XML":
          if ($("#title_" + nodeNum).val() == "") {
            missingNodeNames.push([$("#title_" + nodeNum), visibleRowNum]);
          } else if ($("#title_" + nodeNum).val().match(/\W/) || $("#title_" + nodeNum).val().match(/^[^a-zA-Z]/)) {
            invalidNodeNames.push([$("#title_" + nodeNum), visibleRowNum]);
          }
          break;

        case "SQL":
          if ($("#title_" + nodeNum).val() == "") {
            missingTableNames.push([$("#title_" + nodeNum), visibleRowNum]);
          } else if ($("#title_" + nodeNum).val().match(/\W/) || $("#title_" + nodeNum).val().match(/^[^a-zA-Z]/)) {
            invalidTableNames.push([$("#title_" + nodeNum), visibleRowNum]);
          }
          break;
      }

      // keep track of the data types that have custom validation routines
      var func_ns = $("#type_" + nodeNum).val() + "_ns";
      if (typeof window[func_ns] === "object" && typeof window[func_ns].validate === "function") {
        if (!gd._multiDimArrayContains(func_ns, dataTypeValidationFunctions)) {
          dataTypeValidationFunctions.push([func_ns, [nodeNum]]);
        } else {
          dataTypeValidationFunctions = gd._multiDimArrayAddRow(func_ns, dataTypeValidationFunctions, nodeNum);
        }
      }

      numGeneratedRows++;
    }

    // now call all data type validation functions
    for (var i=0; i<dataTypeValidationFunctions.length; i++) {
      var func = dataTypeValidationFunctions[i][0];
      var rows = dataTypeValidationFunctions[i][1];
      window[func].validate(rows);
    }

    if (missingNodeNames.length) {
      var problemFields = [];
      var rowNumbers    = [];
      for (var i=0; i<missingNodeNames.length; i++) {
        problemFields.push(missingNodeNames[i][0]);
        rowNumbers.push(missingNodeNames[i][1]);
      }
      gd.errors.push({ els: problemFields, error: L.missing_node_names + " <b>" + rowNumbers.join(", ") + "</b>" });
    }
    if (invalidNodeNames.length) {
      var problemFields = [];
      var rowNumbers    = [];
      for (var i=0; i<invalidNodeNames.length; i++) {
        problemFields.push(invalidNodeNames[i][0]);
        rowNumbers.push(invalidNodeNames[i][1]);
      }
      gd.errors.push({ els: problemFields, error: L.invalid_node_names + " <b>" + rowNumbers.join(", ") + "</b>" });
    }
    if (missingTableNames.length) {
      var problemFields = [];
      var rowNumbers    = [];
      for (var i=0; i<missingTableNames.length; i++) {
        problemFields.push(missingTableNames[i][0]);
        rowNumbers.push(missingTableNames[i][1]);
      }
      gd.errors.push({ els: problemFields, error: L.missing_table_names + " <b>" + rowNumbers.join(", ") + "</b>" });
    }
    if (invalidTableNames.length) {
      var problemFields = [];
      var rowNumbers    = [];
      for (var i=0; i<invalidTableNames.length; i++) {
        problemFields.push(invalidTableNames[i][0]);
        rowNumbers.push(invalidTableNames[i][1]);
      }
      gd.errors.push({ els: problemFields, error: L.invalid_table_names + " <b>" + rowNumbers.join(", ") + "</b>" });
    }

    if (resultType == "XML") {
      if ($("#xml_root_node_name").val() == "") {
        gd.errors.push({ els: [$("#xml_root_node_name")], error: L.missing_xml_root_node_name });
      } else if ($("#xml_root_node_name").val().match(/\W/)) {
        gd.errors.push({ els: [$("#xml_root_node_name")], error: L.invalid_xml_root_node_name });
      } else if ($("#xml_record_node_name").val() == "") {
        gd.errors.push({ els: [$("#xml_record_node_name")], error: L.missing_xml_record_node_name });
      } else if ($("#xml_record_node_name").val().match(/\W/)) {
        gd.errors.push({ els: [$("#xml_record_node_name")], error: L.invalid_xml_record_node_name });
      }
    }
    else if (resultType == "CSV") {
      if ($("#csv_delimiter").val() == "") {
        gd.errors.push({ els: [$("#csv_delimiter")], error: L.no_csv_delimiter });
      }
    }

    if (numGeneratedRows == 0) {
      gd.errors.push({ els: null, error: L.no_data });
    }

    if (gd.errors.length) {
      gd.displayErrors();
      return false;
    }

    // all checks out. Set the form target and submit the sucker
    if (resultType == "HTML" || resultType == "XML" || resultType == "SQL") {
      document.data.target = "_blank";
    } else {
      document.data.target = "hiddenIframe";
    }

    // pass the ordered rows to the server, according to whatever sort the user's done
    $("#rowOrder").val(gd._getRowOrder());
    $("#deletedRows").val(gd.deletedRows.toString());

    return true;
  },


  // helper functions for the generator code
  _getRowOrder: function() {
    var orderedRowIDs = $("#tableRows").sortable("toArray");
    var sortedOrder = [];
    for (var i=0; i<orderedRowIDs.length; i++) {
      var row = orderedRowIDs[i].replace(/row_/g, "");
      sortedOrder.push(row);
    }
    return sortedOrder;
  },

  /**
   * When a user re-orders or deletes some rows, the table gives the appearance of being numbered
   * numerically 1-N, however the actual markup retains the original number scheme according to how it
   * was first generated. This function finds the visible row order by the actual row number in the markup.
   */
  _getVisibleRowOrderByRowNum: function(rowNum) {
    var rowOrder = gd._getRowOrder();
    var visibleRowNum = 1;
    for (var i=0; i<rowOrder.length; i++) {
      if (rowOrder[i] == rowNum) {
        return visibleRowNum;
      }
      visibleRowNum++;
    }

    // shouldn't ever happen
    return false;
  },

  _multiDimArrayContains: function(target, arr) {
    for (var i=0; i<arr.length; i++) {
      if (arr[i][0] == target) {
        return true;
      }
    }
    return false;
  },

  _multiDimArrayAddRow: function(target, arr, rowNum) {
    for (var i=0; i<arr.length; i++) {
      if (arr[i][0] == target) {
        arr[i][1].push(rowNum);
      }
    }
    return arr;
  }
};

