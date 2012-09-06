define([
	"manager",
	"constants",
	"lang"
], function(manager, C, L) {

	var MODULE_ID = "data-type-Phone";
	var LANG = L.dataTypePlugins.Names;

	var _init = function() {
		var subscriptions = {};
		subscriptions[C.EVENT.DATA_TABLE.ROW.EXAMPLE_CHANGE + "__Phone"] = _exampleChange;
		manager.subscribe(MODULE_ID, subscriptions);
	}

	var _exampleChange = function(msg) {
		$("#dtOption_" + msg.rowID).val(msg.value);
	}

/*
	validate: function(rows)
	{
		var visibleProblemRows = [];
		var problemFields      = [];
		for (var i=0; i<rows.length; i++)
		{
			if ($("#option_" + rows[i]).val() == "")
			{
				var visibleRowNum = gd._getVisibleRowOrderByRowNum(rows[i]);
				visibleProblemRows.push(visibleRowNum);
				problemFields.push($("#option_" + rows[i]));
			}
		}

		if (visibleProblemRows.length)
			gd.errors.push({ els: problemFields, error: L.Phone_incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
	},

	loadRow: function(rowNum, data)
	{
		return [
			function() {
				$("#dt_" + rowNum).val(data.example);
				$("#option_" + rowNum).val(data.option);
			},
			function() { return $("#option_" + rowNum).length > 0; }
		];
	},

	saveRow: function(rowNum)
	{
		return {
			"example":  $("#dt_" + rowNum).val(),
			"option":   $("#option_" + rowNum).val()
		};
	}
*/


	manager.register(MODULE_ID, C.COMPONENT.DATA_TYPE, {
		init: _init
	});

});

