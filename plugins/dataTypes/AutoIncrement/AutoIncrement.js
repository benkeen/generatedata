define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	var MODULE_ID = "data-type-AutoIncrement";
	var LANG = L.dataTypePlugins.AutoIncrement;
	var subscriptions = {};

	var _init = function() {
		subscriptions[C.EVENT.DATA_TABLE.ROW.EXAMPLE_CHANGE + "__" + MODULE_ID] = _exampleChange;
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
		var visibleProblemRows = [];
		var problemFields      = [];
		for (var i=0; i<rows.length; i++) {
			var autoIncrementStart = $.trim($("#dtAutoIncrementStart_" + rows[i]).val());
			var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
			if (autoIncrementStart == "") {
				problemFields.push($("#dtAutoIncrementStart_" + rows[i]));
			}
			var autoIncrementEnd = $.trim($("#dtAutoIncrementValue_" + rows[i]).val());
			if (autoIncrementEnd == "") {
				problemFields.push($("#dtAutoIncrementValue_" + rows[i]));
			}
			if (autoIncrementStart == "" || autoIncrementEnd == "") {
				visibleProblemRows.push(visibleRowNum);
			}
		}
		var errors = [];
		if (visibleProblemRows.length) {
			errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
		}
		return errors;
	}

	manager.register(MODULE_ID, C.COMPONENT.DATA_TYPE, {
		init: _init,
		validate: _validate
	});

});


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