/*global $:false*/
define([
	"manager",
	"constants",
	"lang",
	"generator"
], function(manager, C, L, generator) {

	"use strict";

	/**
	 * @name PAN
	 * @description JS code for the PAN Data Type.
	 * @see DataType
	 * @namespace
	 */

	var MODULE_ID = "data-type-PAN";
	var LANG = L.dataTypePlugins.PAN;
	var subscriptions = {};

	var _init = function() {
		subscriptions[C.EVENT.DATA_TABLE.ROW.EXAMPLE_CHANGE + "__" + MODULE_ID] = _exampleChange;
		manager.subscribe(MODULE_ID, subscriptions);
	};

	var _saveRow = function(rowNum) {
//		return {
//			"example": $("#dtExample_" + rowNum).val(),
//			"option":  $("#dtOption_" + rowNum).val()
//		};
	};

	var _loadRow = function(rowNum, data) {
//		return {
//			execute: function() {
//				$("#dtExample_" + rowNum).val(data.example);
//				$("#dtOption_" + rowNum).val(data.option);
//			},
//			isComplete: function() { return $("#dtOption_" + rowNum).length > 0; }
//		};
	};

	var _exampleChange = function(msg) {
		var rowID = msg.rowID;
		var value = msg.value;

		switch (value) {
			case "mastercard":
			case "discover":
			case "visa_electron":
				$("#Card_digit_" + rowID).show();
				$("#Card_format_" + rowID).show("blind", null, 500);
				$("#Card_rand_select_" + rowID).hide();
				$("#Card_digit_" + rowID).css("display", "inline");
				$("#digit_" + rowID).val('16');
				$("#option_" + rowID).val("XXXXXXXXXXXXXXXX\\nXXXX XXXX XXXX XXXX\\nXXXXXX XXXXXX XXXX\\nXXX XXXXX XXXXX XXX\\nXXXXXX XXXXXXXXXX");
				break;

			case "visa":
				$("#Card_digit_" + rowID).show();
				$("#Card_format_" +rowID).show("blind", null, 500);
				$("#Card_rand_select_" + rowID).hide();
				$("#Card_digit_" + rowID).css("display", "inline");
				$("#digit_" + rowID).val('13,16');
				$("#option_" + rowID).val('XXXXXXXXXXXXX\\nXXXX XXX XX XXXX\\nXXXXXXXXXXXXXXXX\\nXXXX XXXX XXXX XXXX\\nXXXXXX XXXXXX XXXX\\nXXX XXXXX XXXXX XXX\\nXXXXXX XXXXXXXXXX');
				break;

			case "amex":
			case "enroute":
				$("#Card_digit_" + rowID).show();
				$("#Card_format_" + rowID).show("blind", null, 500);
				$("#Card_rand_select_" + rowID).hide();
				$("#Card_digit_" + rowID).css("display", "inline");
				$("#digit_" + rowID).val('15');
				$('#option_\$ROW\$').val("XXXXXXXXXXXXXXX\\nXXXX XXXXXX XXXXX");
				break;

			case "carte_blanche":
			case "diners_club_international":
				$("#Card_digit_" + rowID).show();
				$("#Card_format_" + rowID).show("blind", null, 500);
				$("#Card_rand_select_" + rowID).hide();
				$("#Card_digit_" + rowID).css("display", "inline");
				$('#digit_\$ROW\$').val('14');
				$('#option_\$ROW\$').val("XXXXXXXXXXXXXX\\nXXXX XXXXXX XXXX");
				break;

			case "jcb":
				$("#Card_digit_" + rowID).show();
				$("#Card_format_" + rowID).show("blind", null, 500);
				$("#Card_rand_select_" + rowID).hide();
				$("#Card_digit_" + rowID).css("display", "inline");
				$('#digit_\$ROW\$').val('15,16')
				$('#option_\$ROW\$').val("XXXXXXXXXXXXXXX\\nXXXX XXXXXX XXXXX\\nXXXXXXXXXXXXXXXX\\nXXXX XXXX XXXX XXXX\\nXXXXXX XXXXXX XXXX\\nXXX XXXXX XXXXX XXX\\nXXXXXX XXXXXXXXXX");
				break;

			case "maestro":
				$("#Card_digit_" + rowID).show();
				$("#Card_format_" + rowID).show("blind", null, 500);
				$("#Card_rand_select_" + rowID).hide();
				$("#Card_digit_" + rowID).css("display", "inline");
				$('#digit_\$ROW\$').val('12-19')
				$('#option_\$ROW\$').val("XXXXXXXXXXXX\\nXXXXXXXXXXXXX\\nXXXX XXX XX XXXX\\nXXXXXXXXXXXXXX\\nXXXX XXXXXX XXXX\\nXXXXXXXXXXXXXXX\\nXXXX XXXXXX XXXXX\\nXXXXXXXXXXXXXXXX\\nXXXX XXXX XXXX XXXX\\nXXXXXX XXXXXX XXXX\\nXXX XXXXX XXXXX XXX\\nXXXXXX XXXXXXXXXX\\nXXXXXXXXXXXXXXXXX\\nXXXXXXXXXXXXXXXXXX\\nXXXXXXXXXXXXXXXXXXX\\nXXXXXX XX XXXX XXXX XXX");
				break;

			case "solo":
			case "switch":
				$("#Card_digit_" + rowID).show();
				$("#Card_format_" + rowID).show("blind", null, 500);
				$("#Card_rand_select_" + rowID).hide();
				$("#Card_digit_" + rowID).css("display", "inline");
				$('#digit_\$ROW\$').val('16,18,19')
				$('#option_\$ROW\$').val("XXXXXXXXXXXXXXXX\\nXXXX XXXX XXXX XXXX\\nXXXXXX XXXXXX XXXX\\nXXX XXXXX XXXXX XXX\\nXXXXXX XXXXXXXXXX\\nXXXXXXXXXXXXXXXXXX\\nXXXXXXXXXXXXXXXXXXX\\nXXXXXX XX XXXX XXXX XXX");
				break;

			case "laser":
				$("#Card_digit_" + rowID).show();
				$("#Card_format_" + rowID).show("blind", null, 500);
				$("#Card_rand_select_" + rowID).hide();
				$("#Card_digit_" + rowID).css("display", "inline");
				$('#digit_\$ROW\$').val('16-19')
				$('#option_\$ROW\$').val("XXXXXXXXXXXXXXXX\\nXXXX XXXX XXXX XXXX\\nXXXXXX XXXXXX XXXX\\nXXX XXXXX XXXXX XXX\\nXXXXXX XXXXXXXXXX\\nXXXXXXXXXXXXXXXXX\\nXXXXXXXXXXXXXXXXXX\\nXXXXXXXXXXXXXXXXXXX\\nXXXXXX XX XXXX XXXX XXX");
				break;

			case "laser":
				$("#Card_digit_" + rowID).hide();
				$("#Card_format_" + rowID).hide("blind", null, 500);
				$("#Card_rand_select_" + rowID).show("blind", null, 500);
				break;
		}
	};

	var _validate = function(rows) {
//		var visibleProblemRows = [];
//		var problemFields      = [];
//		for (var i=0; i<rows.length; i++) {
//			var currEl = $("#dtOption_" + rows[i]);
//			if ($.trim(currEl.val()) === "") {
//				var visibleRowNum = generator.getVisibleRowOrderByRowNum(rows[i]);
//				visibleProblemRows.push(visibleRowNum);
//				problemFields.push(currEl);
//			}
//		}
//		var errors = [];
//		if (visibleProblemRows.length) {
//			errors.push({ els: problemFields, error: LANG.incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
//		}
//		return errors;
	};


	manager.registerDataType(MODULE_ID, {
		init: _init,
		validate: _validate,
		saveRow: _saveRow,
		loadRow: _loadRow
	});
});