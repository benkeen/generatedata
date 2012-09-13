define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	var MODULE_ID = "data-type-AutoIncrement";
	var LANG = L.dataTypePlugins.AutoIncrement;

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.DATA_TABLE.ROW.EXAMPLE_CHANGE + "__AutoIncrement"] = _exampleChange;
		manager.subscribe(MODULE_ID, subscriptions);
	}

	var _exampleChange = function(msg) {
		var parts = msg.value.split(',');
		var rowNum = msg.rowID;
		$("#dtAutoIncrementStart_" + rowNum).val(parts[0]);
		$("#dtAutoIncrementValue_" + rowNum).val(parts[1]);
		$("#dtAutoIncrementPlaceholder_" + rowNum).val(parts[2]);
	}

	var _validate = function(rows) {
		/*
		var visibleProblemRows = [];
		var problemFields      = [];
		for (var i=0; i<rows.length; i++) {
			if ($("#option_" + rows[i]).val() == "") {
				var visibleRowNum = gd._getVisibleRowOrderByRowNum(rows[i]);
				visibleProblemRows.push(visibleRowNum);
				problemFields.push($("#option_" + rows[i]));
			}
		}

		if (visibleProblemRows.length) {
			gd.errors.push({ els: problemFields, error: L.AlphaNumeric_incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
		}
		*/
	}

	/*
		var AutoIncrement_ns = {
		loadRow: function(rowNum, data)
		{
			return [
				function() {
					$("#dt_" + rowNum).val(data.example);
					$("#autoIncrementStart_" + rowNum).val(data.start);
					$("#autoIncrementValue_" + rowNum).val(data.value);
					$("#autoIncrementPlaceholder_" + rowNum).val(data.placeholder);
				},
				function() { return $("#autoIncrementPlaceholder_" + rowNum).length > 0; }
			];
		},

		saveRow: function(rowNum)
		{
			return {
				"example":     $("#dt_" + rowNum).val(),
				"start":       $("#autoIncrementStart_" + rowNum).val(),
				"value":       $("#autoIncrementValue_" + rowNum).val(),
				"placeholder": $("#autoIncrementPlaceholder_" + rowNum).val()
			};
		}
	}
	*/

	manager.register(MODULE_ID, C.COMPONENT.DATA_TYPE, {
		init: _init,
		validate: _validate
	});

});