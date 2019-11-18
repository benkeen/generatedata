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
                if ($("#isFieldGuesserEnable").is(":checked")) {
                    guessTypes(getLastRowOrder(), field.name, field.type);
                }
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

    /**
     * Guess The Type based on name or type.
     * @param num row number
     * @param name field name
     * @param type field type
     */
    var guessTypes = function (num, name, type) {
        //fallback values based on type
        var typeValues = {
            string: 'gdDataType_{num}||data-type-TextFixed#dtNumWords_{num}||1',
            varchar: 'gdDataType_{num}||data-type-TextFixed#dtNumWords_{num}||1',
            text: 'gdDataType_{num}||data-type-TextRandom',
            longtext: 'gdDataType_{num}||data-type-TextRandom',
            date: 'gdDataType_{num}||data-type-Date#dtOption_{num}||Y-m-d',
            time: 'gdDataType_{num}||data-type-Date#dtOption_{num}||H:i:s',
            guid: 'gdDataType_{num}||data-type-GUID',
            datetimetz: 'gdDataType_{num}||data-type-Date#dtOption_{num}||Y-m-d H:i:s',
            datetime: 'gdDataType_{num}||data-type-Date#dtOption_{num}||Y-m-d H:i:s',
            timestamp: 'gdDataType_{num}||data-type-Date#dtOption_{num}||Y-m-d H:i:s',
            integer: 'gdDataType_{num}||data-type-NumberRange',
            int: 'gdDataType_{num}||data-type-NumberRange',
            bigint: 'gdDataType_{num}||data-type-NumberRange',
            smallint: 'gdDataType_{num}||data-type-NumberRange',
            decimal: 'gdDataType_{num}||data-type-Currency#dtCurrencyFormat_{num}||XXXXX.XX#dtCurrencyRangeFrom_{num}||1000.00#dtCurrencyRangeTo_{num}||10000.00',
            float: 'gdDataType_{num}||data-type-Currency#dtCurrencyFormat_{num}||XXXXX.XX#dtCurrencyRangeFrom_{num}||1000.00#dtCurrencyRangeTo_{num}||10000.00',
            boolean: 'gdDataType_{num}||data-type-Boolean#dtOption_{num}||false|true'
        };

        //common fields name
        var commonNames = {
            /*Auto increment field*/
            id: "gdDataType_{num}||data-type-AutoIncrement",

            /*Names*/
            name: "gdDataType_{num}||data-type-NamesRegional#dtOption_{num}||MaleName",
            full_name: "gdDataType_{num}||data-type-NamesRegional#dtOption_{num}||MaleName Surname",
            fullname: "gdDataType_{num}||data-type-NamesRegional#dtOption_{num}||MaleName Surname",
            first_name: "gdDataType_{num}||data-type-NamesRegional#dtOption_{num}||MaleName",
            firstname: "gdDataType_{num}||data-type-NamesRegional#dtOption_{num}||MaleName",
            last_name: "gdDataType_{num}||data-type-NamesRegional#dtOption_{num}||Surname",
            lastname: "gdDataType_{num}||data-type-NamesRegional#dtOption_{num}||Surname",

            /*Localization*/
            address: "gdDataType_{num}||data-type-StreetAddress",
            street: "gdDataType_{num}||data-type-StreetAddress",
            city: "gdDataType_{num}||data-type-City",
            state: "gdDataType_{num}||data-type-Region",
            region: "gdDataType_{num}||data-type-Region",
            country: "gdDataType_{num}||data-type-Country",
            pincode: "gdDataType_{num}||data-type-PostalZip",
            pin_code: "gdDataType_{num}||data-type-PostalZip",
            zip: "gdDataType_{num}||data-type-PostalZip",
            zipcode: "gdDataType_{num}||data-type-PostalZip",
            postal: "gdDataType_{num}||data-type-PostalZip",
            postalcode: "gdDataType_{num}||data-type-PostalZip",
            latitude: "gdDataType_{num}||data-type-LatLng",
            longitude: "gdDataType_{num}||data-type-LatLng",

            /*email*/
            email: "gdDataType_{num}||data-type-Email",

            /*phone*/
            mobile: "gdDataType_{num}||data-type-PhoneRegional",
            phone: "gdDataType_{num}||data-type-PhoneRegional",

            /*guid*/
            guid: "gdDataType_{num}||data-type-GUID",
            uuid: "gdDataType_{num}||data-type-GUID",


        };
        var nValue = commonNames[name];
        if (typeof nValue != "undefined") {
            chooseGuess(nValue, num);
        } else {
            var tValue = typeValues[type];
            if (typeof tValue != "undefined") {
                chooseGuess(tValue, num);
            }
        }
    };

    /**
     * Choose Type based on given value template.
     * @param template a value template
     * @param num row number
     */
    var chooseGuess = function (template, num) {
        try {
            template = template.replace(/{num}/g, num);
            var controls = template.split("#");
            for (var i = 0; i < controls.length; i++) {
                var meta = controls[i].split("||");
                var element = $("#" + meta[0]);
                element.val("").trigger('change');//reset old value
                element.val(meta[1]).trigger('change');
            }
        } catch (err) {
            console.error(err.message);
        }
    };
});

