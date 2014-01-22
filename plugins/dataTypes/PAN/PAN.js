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
		/*
		return {
			"example":  $("#dt_" + rowNum).val(),
			"digit":   $("#digit_" + rowNum).val(),
			"seperator": $('#sep_' + rowNum).val(),
			"format":	$('#option_' + rowNum).val(),
			"rand_brand": $('#option_mselect_' + rowNum).val()
		};
		*/
	};

	var _loadRow = function(rowNum, data) {
		/*
		return [
			function() {
				$("#dt_" + rowNum).val(data.example);
				$("#digit_" + rowNum).val(data.digit);
				$('#sep_' + rowNum).val(data.seperator);
				$('#option_' + rowNum).val(data.format);

				if ($('#dt_' + rowNum).val() == "rand_card")  {
					$("#Card_digit_" + rowNum).hide();
					$("#Card_format_" + rowNum).hide();
					$("#Card_rand_select_" + rowNum).show();
					$('#option_mselect_' + rowNum).val(data.rand_brand);
				}

			},
			function() { return $("#option_" + rowNum).length > 0; }
		];
		*/
	};


	var _exampleChange = function(msg) {
		var rowID = msg.rowID;
		var selectedCard = msg.value;

		var $digitSection     = $("#dtOptionPAN_digitSection_" + rowID);
		var $digitLengthField = $("#dtOptionPAN_digit_" + rowID);
		var $cardFormat       = $("#dtOptionPAN_cardFormat_" + rowID);
		var $option           = $("#dtOption_" + rowID);
		var $randCardFormatSection = $("#dtOptionPAN_randomCardFormatSection_" + rowID);

		// default states shared by most options
		$cardFormat.show();
		$digitSection.show();
		$randCardFormatSection.hide();

		var formats = [];
		switch (selectedCard) {
			case "mastercard":
			case "discover":
			case "visa_electron":
				$digitLengthField.val("16");
				formats = [
					"XXXXXXXXXXXXXXXX",
					"XXXX XXXX XXXX XXXX",
					"XXXXXX XXXXXX XXXX",
					"XXX XXXXX XXXXX XXX",
					"XXXXXX XXXXXXXXXX"
				];
				break;

			case "visa":
				$digitLengthField.val("13,16");
				formats = [
					"XXXXXXXXXXXXX",
					"XXXX XXX XX XXXX",
					"XXXXXXXXXXXXXXXX",
					"XXXX XXXX XXXX XXXX",
					"XXXXXX XXXXXX XXXX",
					"XXX XXXXX XXXXX XXX",
					"XXXXXX XXXXXXXXXX"
				];
				break;

			case "amex":
			case "enroute":
				$digitLengthField.val("15");
				formats = [
					"XXXXXXXXXXXXXXX",
					"XXXX XXXXXX XXXXX"
				];
				break;

			case "carte_blanche":
			case "diners_club_international":
				$digitLengthField.val('14');
				formats = [
					"XXXXXXXXXXXXXX",
					"XXXX XXXXXX XXXX"
				];
				break;

			case "jcb":
				$digitLengthField.val("15,16");
				formats = [
					"XXXXXXXXXXXXXXX",
					"XXXX XXXXXX XXXXX",
					"XXXXXXXXXXXXXXXX",
					"XXXX XXXX XXXX XXXX",
					"XXXXXX XXXXXX XXXX",
					"XXX XXXXX XXXXX XXX",
					"XXXXXX XXXXXXXXXX"
				];
				break;

			case "maestro":
				$digitLengthField.val("12-19")
				formats = [
					"XXXXXXXXXXXX",
					"XXXXXXXXXXXXX",
					"XXXX XXX XX XXXX",
					"XXXXXXXXXXXXXX",
					"XXXX XXXXXX XXXX",
					"XXXXXXXXXXXXXXX",
					"XXXX XXXXXX XXXXX",
					"XXXXXXXXXXXXXXXX",
					"XXXX XXXX XXXX XXXX",
					"XXXXXX XXXXXX XXXX",
					"XXX XXXXX XXXXX XXX",
					"XXXXXX XXXXXXXXXX",
					"XXXXXXXXXXXXXXXXX",
					"XXXXXXXXXXXXXXXXXX",
					"XXXXXXXXXXXXXXXXXXX",
					"XXXXXX XX XXXX XXXX XXX"
				];
				break;

			case "solo":
			case "switch":
				$digitLengthField.val("16,18,19");
				formats = [
					"XXXXXXXXXXXXXXXX",
					"XXXX XXXX XXXX XXXX",
					"XXXXXX XXXXXX XXXX",
					"XXX XXXXX XXXXX XXX",
					"XXXXXX XXXXXXXXXX",
					"XXXXXXXXXXXXXXXXXX",
					"XXXXXXXXXXXXXXXXXXX",
					"XXXXXX XX XXXX XXXX XXX"
				];
				break;

			case "laser":
				$digitLengthField.val("16-19");
				formats = [
					"XXXXXXXXXXXXXXXX",
					"XXXX XXXX XXXX XXXX",
					"XXXXXX XXXXXX XXXX",
					"XXX XXXXX XXXXX XXX",
					"XXXXXX XXXXXXXXXX",
					"XXXXXXXXXXXXXXXXX",
					"XXXXXXXXXXXXXXXXXX",
					"XXXXXXXXXXXXXXXXXXX",
					"XXXXXX XX XXXX XXXX XXX"
				];
				break;

			case "rand_card":
				$digitSection.hide();
				$cardFormat.hide();
				$randCardFormatSection.show();
				break;
		}

		$option.val(formats.join("\n"));
	};


	var _validate = function(rows) {
		/*
		var visibleProblemRows = [];
		var problemFields      = [];
		var err_flag = [];
		for (var i=0; i<rows.length; i++)
		{
			//Check if Examples(card type) is blank.
			if ($("#dt_" + rows[i]).val() == "")
			{
				var visibleRowNum = gd._getVisibleRowOrderByRowNum(rows[i]);
				visibleProblemRows.push(visibleRowNum);
				problemFields.push($("#dt_" + rows[i]));
				err_flag = "dt";
			}
			//Check if Seperator is of proper format.
			var propersep = $("#sep_" + rows[i]).val();
			if ($("#sep_" + rows[i]).val().match(/[a-z0-9\s\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\+\{\}\[\]\\\;\:\'\"\,\.\/\<\>\?]+|[^CPAHDS\|]\|/))
			{
				var visibleRowNum = gd._getVisibleRowOrderByRowNum(rows[i]);
				visibleProblemRows.push(visibleRowNum);
				problemFields.push($("#sep_" + rows[i]));
				err_flag = "sep";
			}
			//Check if card format is proper.
			var properformat = $("#option_" + rows[i]).val();
			if (properformat.match(/[a-z0-9\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\+\{\}\[\]\\\;\:\'\"\,\.\/\<\>\?]+|[^X\s]/g))
			{
				var visibleRowNum = gd._getVisibleRowOrderByRowNum(rows[i]);
				visibleProblemRows.push(visibleRowNum);
				problemFields.push($("#option_" + rows[i]));
				err_flag = "format";
			}

		}

		if(err_flag == "dt")
			if (visibleProblemRows.length)
				gd.errors.push({ els: problemFields, error: L.Pan_incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
		if(err_flag == "sep")
			if (visibleProblemRows.length)
				gd.errors.push({ els: problemFields, error: L.sep_incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
		if(err_flag == "format")
			if (visibleProblemRows.length)
				gd.errors.push({ els: problemFields, error: L.format_incomplete_fields + " <b>" + visibleProblemRows.join(", ") + "</b>"});
		*/
	};


	manager.registerDataType(MODULE_ID, {
		init: _init,
		validate: _validate,
		saveRow: _saveRow,
		loadRow: _loadRow
	});
});