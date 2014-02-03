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
		var randomBrands = $("#dtOptionPAN_randomCardFormat_" + rowNum).val();
		return {
			example:      $("#dtExample_" + rowNum).val(),
			digit:        $("#dtOptionPAN_digit_" + rowNum).val(),
			separator:    $("#dtOptionPAN_sep_" + rowNum).val(),
			format:       $("#dtOption_" + rowNum).val(),
			randomBrands: randomBrands
		};
	};

	var _loadRow = function(rowNum, data) {
		return {
			execute: function() {
				$("#dtExample_" + rowNum).val(data.example);
				$("#dtOptionPAN_digit_" + rowNum).val(data.digit);
				$("#dtOptionPAN_sep_" + rowNum).val(data.separator);
				$("#dtOption_" + rowNum).val(data.format);

				var $cardFormat       = $("#dtOptionPAN_cardFormat_" + rowNum);
				var $digitSection     = $("#dtOptionPAN_digitSection_" + rowNum);
				var $randCardFormatSection = $("#dtOptionPAN_randomCardFormatSection_" + rowNum);

				if (data.example === "rand_card") {
					$digitSection.hide();
					$cardFormat.hide();
					$randCardFormatSection.show();

					var options = $("#dtOptionPAN_randomCardFormat_" + rowNum).find("option");
					for (var i=0; i<options.length; i++) {
						if ($.inArray(options[i].value, data.randomBrands) !== -1) {
							$(options[i]).prop("selected", "selected");
						}
					}

				} else {
					$cardFormat.show();
					$digitSection.show();
					$randCardFormatSection.hide();
				}
			},
			isComplete: function() { return $("#dtOptionPAN_randomCardFormat_" + rowNum).length > 0; }
		};
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
			case "visaElectron":
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
			case "dinersClubEnRoute":
				$digitLengthField.val("15");
				formats = [
					"XXXXXXXXXXXXXXX",
					"XXXX XXXXXX XXXXX"
				];
				break;

			case "carteBlanche":
			case "dinersClubInt":
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
				$digitLengthField.val("12-19");
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
		var cardTypeProblemVisibleRows = [];
		var cardTypeProblemFields      = [];
		var cardFormatProblemVisibleRows = [];
		var cardFormatProblemFields      = [];

		for (var i=0; i<rows.length; i++) {

			// check if the examples dropdown (card type) isn't blank
			var $exampleField = $("#dtExample_" + rows[i]);
			if ($exampleField.val() === "") {
				cardTypeProblemVisibleRows.push(generator.getVisibleRowOrderByRowNum(rows[i]));
				cardTypeProblemFields.push($exampleField);
			}

			// check if card format is proper
			var format = $("#dtOption_" + rows[i]).val();
			if (format.match(/[^X\s]/g)) {
				cardFormatProblemVisibleRows.push(generator.getVisibleRowOrderByRowNum(rows[i]));
				cardFormatProblemFields.push($("#dtOption_" + rows[i]));
			}
		}

		var errors = [];
		if (cardTypeProblemVisibleRows.length) {
			errors.push({ els: cardTypeProblemFields, error: LANG.pan_incomplete_fields + " <b>" + cardTypeProblemVisibleRows.join(", ") + "</b>"});
		}
		if (cardFormatProblemVisibleRows.length) {
			errors.push({ els: cardFormatProblemFields, error: LANG.format_incomplete_fields + " <b>" + cardFormatProblemVisibleRows.join(", ") + "</b>"});
		}

		return errors;
	};


	manager.registerDataType(MODULE_ID, {
		init: _init,
		validate: _validate,
		saveRow: _saveRow,
		loadRow: _loadRow
	});
});