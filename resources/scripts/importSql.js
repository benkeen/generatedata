define([
    "manager",
    "lang",
    "generator",
    "constants",
    "utils"
], function (manager, L, generator, C, utils) {

    var loadDatabases = function () {
        var data = "action=getAllDatabases";
        $.ajax({
            url: "ajax.php",
            type: "POST",
            data: data,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            success: function (result) {
                if (result.success) {
                    $("#mSelDatabases").html('<option value="" disabled selected>' + L.import_sql_select_db_option_hint + "</option>");
                    result.content.forEach(function (rs) {
                        var option = $("<option></option>").text(rs);
                        $("#mSelDatabases").append(option);
                    });

                // for whatever reason, here we weren't able to get the list of databases (e.g the user is in demo mode)
	            // so hide the DB and Tables dropdown fields
                } else {
					$("#mDialogSqlSelectDbFields").hide();
                }
            }
        });
    };

    var loadTables = function (db) {
        if (db == null || db === "")
            return;
        var data = "action=getTables&db=" + db;
        $.ajax({
            url: "ajax.php",
            type: "POST",
            data: data,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            success: function (result) {
                if (result.success) {
                    $("#mSelTable").html('<option value="" disabled selected>' + L.import_sql_select_table_option_hint + "</option>");
                    result.content.forEach(function (tbl) {
                        var option = $("<option></option>").text(tbl.table_name);
                        $("#mSelTable").append(option);
                    });
                }
            }
        });
    };

    var loadCreateSql = function (db, table) {
        if (db == null || db === "" || table == null || table === "")
            return;
        var data = "action=getCreateTablesSql&db=" + db + "&table=" + table;
        $.ajax({
            url: "ajax.php",
            type: "POST",
            data: data,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            success: function (result) {
                if (result.success) {
                    $("#inputImportSql").val(result.content);
                }
            }
        });
    };

    //////Select DB & Table to generate Sql
    //load all databases
    if ($("#mSelDatabases").length > 0) {
        loadDatabases();

        //on db selected
        $("#mSelDatabases").on('change', function () {
            loadTables($("#mSelDatabases").val());
        });
        //on table selected
        $("#mSelTable").on('change', function () {
            loadCreateSql($("#mSelDatabases").val(), $("#mSelTable").val());
        });
    }
    //////////////////////////
    $(function () {
        $("#accordionsqlnote").accordion({
            heightStyle: "content",
            collapsible: true,
            active: false
        });
    });

    $("#dialogSql").dialog({
        autoOpen: false,
        modal: true,
        width: 400,
    });
    $("#btnImportSql").click(function () {
        $("#dialogSql").dialog("open");
    });
    $("#btnImportSqlSubmit").click(function () {
        var sql_tabel = _parseCreateSql($("#inputImportSql").val());
        if (sql_tabel != null) {
            //delete old all rows
            deleteAllRow();
            setDataSetName(sql_tabel.table);
            sql_tabel.fields.forEach(function (field) {
                addRow(field);
            });
        } else {
            //display error
            utils.clearValidationErrors($("#gdMainTab1Content"));
            utils.addValidationErrors({els: [], error: L.import_sql_error});
            utils.displayValidationErrors("#gdMessages");
        }
        $("#dialogSql").dialog("close");
    });

    var addRow = function (field) {
        _addSingleRow();
        var lastId = getLastRowOrder();
        $("#gdTitle_" + lastId).val(field.name);
    };

    var _addSingleRow = function () {
        $("#gdNumRowsToAdd").val(1);
        $("#gdAddDataSetRowsSection>input.gdAddRowsBtn").trigger('click');
    };

    var getLastRowOrder = function () {
        var rowOrder = generator.getRowOrder();
        if (rowOrder.length === 0) {
            return 0;
        }
        return rowOrder[rowOrder.length - 1];
    };

    var deleteAllRow = function () {
        $("input[name^=gdDeleteRows]:visible").attr('checked', true).trigger('change');
        $("input.gdDeleteRowsBtn").trigger('click');
    };

    var setDataSetName = function (tableName) {
        //change dataset & sql table name;
        tableName = tableName.replace(/`/g, '');
        $("#gdDataSetName").val(tableName);
        $("#etSQL_tableName").val(tableName);
    };

    var _parseCreateSql = function (query) {
        query = query.replace(';', '');

        //match the single line sql comments
        var sqlCommentsSingle = /(--.*?\n)/ig;

        //match multiline sql comments
        var sqlMultilineComments = /\/\*([\s\S]*?)\*\//gms;

        query = query.replace(sqlCommentsSingle, "").replace(sqlMultilineComments, "");

        query = query.toLowerCase();
        var create_table_word = "create table";
        var create_table_if_not_word = "create table if not exists";
        query = query.trim();
        if (query === "" || !query.startsWith(create_table_word))
            return null;
        var table = {};

        //find table name
        if (query.startsWith(create_table_if_not_word)) {
            table["table"] =
                query.substring(query.indexOf(create_table_if_not_word) + create_table_if_not_word.length, query.indexOf("(")).trim();
        } else {
            table["table"] =
                query.substring(query.indexOf(create_table_word) + create_table_word.length, query.indexOf("(")).trim();
        }

        var fieldsRaw = query.substring(query.indexOf("(") + 1, query.lastIndexOf(")"));
        var fieldsArray = fieldsRaw.split(/\n/gm);
        table["fields"] = [];
        fieldsArray.forEach(function (field) {
            field = field.trim();
            if (field === "")
                return;

            var fieldMeta = field.replace(/\s\s+/g, ' ').replace(/\s(?![^)]*(\(|$))/g, '').split(' ');
            if (!isSQLReservedWord(fieldMeta[0])) {
                var type = fieldMeta[1].replace(/(\(.*?\))/ig, '');
                var size = 0;
                var sizeMatch = fieldMeta[1].match(/(\(.*?\))/);
                if (sizeMatch) {
                    size = sizeMatch[0].replace('(', '').replace(')', '');
                }
                table["fields"].push({
                    name: fieldMeta[0].replace(/`/g, ''),
                    type: type,
                    size: size,
                    attribute: fieldMeta[2]
                });
            }
        });
        return table;
    };

    var isSQLReservedWord = function (word) {
        // the constraints keyword in create statement to ignore field.
        var words = ["UNIQUE", "PRIMARY", "CONSTRAINT"];
        return words.includes(word.trim().toUpperCase());
    };
});
