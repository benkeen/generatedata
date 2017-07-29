/*global $:false*/
define([
	"manager",
	"generator",
	"constants",
	"lang"
], function(manager, generator, C, L) {
	"use strict";

	/**
	 * @name SQL
	 * @see ExportType
	 * @description Client-side code for the SQL Export Type.
	 * @namespace
	 */
	var MODULE_ID = "export-type-SQL";
	var LANG = L.exportTypePlugins.SQL;


	var _init = function() {
		$("#etSQL_databaseType").on("change", _onChangeDatabaseType);
		$('input[name="etSQL_statementType"]').on("change", _onChangeStatementType);

		var subscriptions = {};
		subscriptions[C.EVENT.APP_START] = _onChangeSettings;
		subscriptions[C.EVENT.IO.LOAD] = _onChangeSettings;
		subscriptions[C.EVENT.RESULT_TYPE.CHANGE] = _resultTypeChanged;
		subscriptions[C.EVENT.GENERATE] = _onGenerate;
		manager.subscribe(MODULE_ID, subscriptions);
	};

	var _onChangeDatabaseType = function(e) {
		_updateAvailableSettings(e.target.value);
	};

	var _onChangeStatementType = function(e) {
		if (e.target.value === "insert" || e.target.value === "insertignore") {
			$("#etSQL_batchSizeLabel").css("color", "");
			$("#etSQL_insertBatchSize").prop("disabled", false).removeClass("gdDisabled");
		} else {
			$("#etSQL_insertBatchSize").prop("disabled", true).addClass("gdDisabled");
			$("#etSQL_batchSizeLabel").css("color", "#cccccc");
		}
	};

	var _onChangeSettings = function() {
		var dbType = $("#etSQL_databaseType").val();
		_updateAvailableSettings(dbType);
	};

	var _updateAvailableSettings = function(dbType) {
		if (dbType === "Postgres") {
			$("#etSQL_encloseWithBackquotes").prop("disabled", true).prop("checked", false);
			$("#etSQL_encloseWithBackquotes_group label").css("color", "#cccccc");
		} else {
			$("#etSQL_encloseWithBackquotes").prop("disabled", false);
			$("#etSQL_encloseWithBackquotes_group label").css("color", "");
		}

		if (dbType === "MySQL") {
			$("#etSQL_statementType2").prop("disabled", false);
			$("#etSQL_insertIgnore label").css("color", "");
		} else {
			$("#etSQL_statementType2").prop("disabled", true).prop("checked", false);
			$("#etSQL_insertIgnore label").css("color", "#cccccc");
		}

    if (dbType === "Oracle") {
      $("#etSQL_insertBatchSize").prop("disabled", true).css("color", "#cccccc");
      $("#etSQL_batchSizeLabel").css("color", "#cccccc");
    } else {
      $("#etSQL_insertBatchSize").prop("disabled", false).css("color", "");
      $("#etSQL_batchSizeLabel").css("color", "");
    }
	};

	/**
	 * Called when the user changes the result type.
	 */
	var _resultTypeChanged = function(msg) {
		if (msg.newExportType === "SQL") {
			$("#gdColTitleTop,#gdColTitleBottom").html(LANG.row_label);
		}
	};

	/**
	 * If the user is generating in-page data with this Export Type, enable the XML
	 * mode for the in-page editor. Since Oracle and SQLite don't have their own CodeMirror modes yet,
	 * we just re-use MySQL for all of them: they're pretty similar, anyway.
	 */
	var _onGenerate = function(msg) {
		if (msg.exportTarget !== "inPage" || msg.exportType !== "SQL") {
			return;
		}

		// the default mode is a simple x-sql mime type. But if there's a specific one available for the
		// chosen database type, use that instead
		var selectedSQLMode = $("#etSQL_databaseType").val();
		var mode = "text/x-sql";
		switch (selectedSQLMode) {
			case "MySQL":
				mode = "text/x-mysql";
				break;
			case "MSSQL":
				mode = "text/x-mssql";
				break;
		}

		msg.editor.setOption("mode", mode);
	};

	var _validate = function(rowNums) {
		var errors = [];

		// first, check the Table Column names that have been entered are valid
		var errorFields = [];
		var errorFieldVisibleRowNums = [];

    // as noted in issues/262, SQL Server allows spaces in the db names, hence the separate regexp. issues/426 noted
    // that MySQL tables can begin with _ (and 0-9 as it turns out).
    var validTableCol          = new RegExp("^[0-9a-zA-Z_$]*$");
    var validTableColSQLServer = new RegExp("^[_a-zA-Z][0-9a-zA-Z_\\s]*$");

    var selectedSQLMode = $("#etSQL_databaseType").val();

		for (var i=0; i<rowNums.length; i++) {
			var tableColField = $("#gdTitle_" + rowNums[i]);
			var tableColFieldVal = tableColField.val();

			// we don't bother throwing an error if the field is empty, because that's caught by the Core script
			if (tableColFieldVal === "") {
        continue;
      }

      var hasError = false;
      if (selectedSQLMode === "MSSQL") {
        if (!validTableColSQLServer.test(tableColFieldVal)) {
          hasError = true;
        }
      } else {
        if (!validTableCol.test(tableColFieldVal)) {
          hasError = true;
        }
      }

      if (hasError) {
        errorFields.push(tableColField);
        errorFieldVisibleRowNums.push(generator.getVisibleRowOrderByRowNum(rowNums[i]));
      }
		}

		if (errorFields.length) {

      // N.B. the error message here isn't quite right for SQL Server, which permits spaces. But frankly it's best if they
      // don't know about it. The code will work (the PHP side will automatically detect the space and wrap it in brackets)
			errors.push({
				els: errorFields,
				error: LANG.validation_invalid_col_name + "<b>" + errorFieldVisibleRowNums.join(", ") + "</b>"
			});
		}

		// secondly, check the SQL fields have all been entered properly
		var tableNameField = $("#etSQL_tableName");
		var tableNameFieldVal = $.trim(tableNameField.val());
		var validTableName = new RegExp("^[a-zA-Z_][0-9a-zA-Z_$]*$");
		if (tableNameFieldVal === "" || !validTableName.test(tableNameFieldVal)) {
			errors.push({
				els: tableNameField,
				error: LANG.validation_invalid_table_name
			});
		}

		// check batch size if current statement type is "insert" or "insertignore"
		var statementType = $.trim($('input[name="etSQL_statementType"]:checked').val());
		if (statementType === "insert" || statementType === "insertignore") {
			var validBatchSize = new RegExp("^([1-9]|[1-9][0-9]|[1-2][0-9][0-9]|300)$");
			var batchSizeField = $("#etSQL_insertBatchSize");
			var batchSizeFieldVal = $.trim(batchSizeField.val());
			if (batchSizeFieldVal === "" || !validBatchSize.test(batchSizeFieldVal)) {
				errors.push({
					els: batchSizeField,
					error: LANG.validation_invalid_batch_size
				});
			}
		}

		return errors;
	};

	var _loadSettings = function(settings) {
		$("#etSQL_tableName").val(settings.tableName);
		$("#etSQL_databaseType").val(settings.databaseType);
		if (settings.createTable == "1") {
			$("#etSQL_createTable").attr("checked", "checked");
		} else {
			$("#etSQL_createTable").removeAttr("checked");
		}
		if (settings.dropTable == "1") {
			$("#etSQL_dropTable").attr("checked", "checked");
		} else {
			$("#etSQL_dropTable").removeAttr("checked");
		}
		if (settings.encloseWithBackquotes == "1") {
			$("#etSQL_encloseWithBackquotes").attr("checked", "checked");
		} else {
			$("#etSQL_encloseWithBackquotes").removeAttr("checked");
		}

		$("input[name=etSQL_statementType]:eq(" + settings.statementType + ")").attr("checked", "checked");

		if (settings.hasOwnProperty("insertBatchSize")) {
			$("#etSQL_insertBatchSize").val(settings.insertBatchSize);
		}
		$("input[name=etSQL_primaryKey][value=" + settings.primaryKey + "]").attr("checked", "checked");
	};

	var _saveSettings = function() {
		return {
			tableName:    $("#etSQL_tableName").val(),
			databaseType: $("#etSQL_databaseType").val(),
			createTable:  $("#etSQL_createTable").attr("checked") ? 1 : 0,
			dropTable:    $("#etSQL_dropTable").attr("checked") ? 1 : 0,
			encloseWithBackquotes: $("#etSQL_encloseWithBackquotes").attr("checked") ? 1 : 0,
			statementType: $("input[name=etSQL_statementType]:checked").val(),
			insertBatchSize: $("#etSQL_insertBatchSize").val(),
			primaryKey:    $("input[name=etSQL_primaryKey]:checked").val()
		};
	};

	var _resetSettings = function() {
		$("#etSQL_tableName").val("myTable");
		$("#etSQL_databaseType").val("MySQL");
		$("#etSQL_createTable").attr("checked", "checked");
		$("#etSQL_dropTable").attr("checked", "checked");
		$("#etSQL_encloseWithBackquotes").attr("checked", "checked");
		$("#etSQL_insertBatchSize").val(10);
		$("input[name=etSQL_statementType][value=insert]").attr("checked", "checked");
		$("input[name=etSQL_primaryKey][value=default]").attr("checked", "checked");
	};

	manager.registerExportType(MODULE_ID, {

		/*
		 * @function
		 * @name SQL#init
		 */
		init: _init,

		/**
		 * The SQL validation function checks that all table columns are a-Z, 0-9 and that all custom SQL
		 * settings are filled in properly. For simplicity, this function doesn't do anything terribly smart
		 * in terms of the table name and column name validation: it doesn't do custom validation against the
		 * selected database type or against reserved words. Would be good to add...!
		 * @function
		 * @name SQL#validate
		 */
		validate: _validate,
		loadSettings: _loadSettings,
		saveSettings: _saveSettings,
		resetSettings: _resetSettings
	});
});
