import React from 'react';

export const state = {
	example: '',
	digit: '',
	separator: '',
	format: '',
	randomBrands: '' // check type
};


export const Example = ({ i18n, coreI18n }) => (
	<select>
		<option value="">{coreI18n.please_select}</option>
		<option value="mastercard">{i18n.mastercard}</option>
		<option value="visa">{i18n.visa}</option>
		<option value="visaElectron">{i18n.visa_electron}</option>
		<option value="amex">{i18n.americanexpress}</option>
		<option value="discover">{i18n.discover}</option>
		<option value="carteBlanche">{i18n.carte_blanche}</option>
		<option value="dinersClubInt">{i18n.diners_club_international}</option>
		<option value="dinersClubEnRoute">{i18n.enRoute}</option>
		<option value="jcb">{i18n.jcb}</option>
		<option value="maestro">{i18n.maestro}</option>
		<option value="solo">{i18n.solo}</option>
		<option value="switch">{i18n.switch}</option>
		<option value="laser">{i18n.laser}</option>
		<option value="rand_card">{i18n.rand_card}</option>
	</select>
);

export const Options = ({ i18n }) => (
	<>
		<span id="dtOptionPAN_cardDigitSection_%ROW%" style="display:inline;">
			{i18n.length}
			<input type="text" name="dtOptionPAN_digit_%ROW%" id="dtOptionPAN_digit_%ROW%" style="width: 60px" readOnly="readonly" />
		</span>

		<span id="dtOptionPAN_cardSeparator_%ROW%" style="display:inline;">
			{i18n.separators}
			<input type="text" name="dtOptionPAN_sep_%ROW%" id="dtOptionPAN_sep_%ROW%" style="width: 78px" value=" " title={i18n.separator_help} />
		</span>

		<span id="dtOptionPAN_cardFormat_%ROW%">
			{i18n.ccformats}
			<textarea name="dtOption_%ROW%" id="dtOption_%ROW%" title={i18n.format_title} style="height: 100px; width: 260px" />
		</span>

		<div id="dtOptionPAN_randomCardFormatSection_%ROW%" style="display:none;">
			{i18n.ccrandom}
			<select multiple="multiple" name="dtOptionPAN_randomCardFormat_%ROW%[]" id="dtOptionPAN_randomCardFormat_%ROW%" title={i18n.rand_brand_title} style="height: 100px; width: 260px">
				<option value="mastercard">{i18n.mastercard}</option>
				<option value="visa">{i18n.visa}</option>
				<option value="visaElectron">{i18n.visa_electron}</option>
				<option value="amex">{i18n.americanexpress}</option>
				<option value="discover">{i18n.discover}</option>
				<option value="carteBlanche">{i18n.carte_blanche}</option>
				<option value="dinersClubInt">{i18n.diners_club_international}</option>
				<option value="dinersClubEnRoute">{i18n.enRoute}</option>
				<option value="jcb">{i18n.jcb}</option>
				<option value="maestro">{i18n.maestro}</option>
				<option value="solo">{i18n.solo}</option>
				<option value="switch">{i18n.switch}</option>
				<option value="laser">{i18n.laser}</option>
			</select>
		</div>
	</>
);

export const Help = ({ i18n }) => (
	<p>
		{i18n.DATA_TYPE.DESC}
		{i18n.pan_help_intro}
		<b>{i18n.mastercard}</b>, <b>{i18n.visa}</b>, <b>{i18n.visa_electron}</b>,
		<b>{i18n.americanexpress}</b>, <b>{i18n.discover}</b>, <b>{i18n.american_diners}</b>,
		<b>{i18n.carte_blanche}</b>, <b>{i18n.diners_club_international}</b>, <b>{i18n.enroute}</b>,
		<b>{i18n.jcb}</b>, <b>{i18n.maestro}</b>, <b>{i18n.solo}</b>,
		<b>{i18n.switch}</b>, <b>{i18n.laser}</b>.
	</p>
);


// var _loadRow = function(rowNum, data) {
// 	return {
// 		execute: function() {
// 			$("#dtExample_" + rowNum).val(data.example);
// 			$("#dtOptionPAN_digit_" + rowNum).val(data.digit);
// 			$("#dtOptionPAN_sep_" + rowNum).val(data.separator);
// 			$("#dtOption_" + rowNum).val(data.format);
//
// 			var $cardFormat       = $("#dtOptionPAN_cardFormat_" + rowNum);
// 			var $digitSection     = $("#dtOptionPAN_digitSection_" + rowNum);
// 			var $randCardFormatSection = $("#dtOptionPAN_randomCardFormatSection_" + rowNum);
//
// 			if (data.example === "rand_card") {
// 				$digitSection.hide();
// 				$cardFormat.hide();
// 				$randCardFormatSection.show();
//
// 				var options = $("#dtOptionPAN_randomCardFormat_" + rowNum).find("option");
// 				for (var i=0; i<options.length; i++) {
// 					if ($.inArray(options[i].value, data.randomBrands) !== -1) {
// 						$(options[i]).prop("selected", "selected");
// 					}
// 				}
//
// 			} else {
// 				$cardFormat.show();
// 				$digitSection.show();
// 				$randCardFormatSection.hide();
// 			}
// 		},
// 		isComplete: function() { return $("#dtOptionPAN_randomCardFormat_" + rowNum).length > 0; }
// 	};
// };


// var _exampleChange = function(msg) {
// 	var rowID = msg.rowID;
// 	var selectedCard = msg.value;
//
// 	var $digitSection     = $("#dtOptionPAN_cardDigitSection_" + rowID);
// 	var $digitLengthField = $("#dtOptionPAN_digit_" + rowID);
// 	var $cardFormat       = $("#dtOptionPAN_cardFormat_" + rowID);
// 	var $option           = $("#dtOption_" + rowID);
// 	var $randCardFormatSection = $("#dtOptionPAN_randomCardFormatSection_" + rowID);
//
// 	// default states shared by most options
// 	$cardFormat.show();
// 	$digitSection.show();
// 	$randCardFormatSection.hide();
//
// 	var formats = [];
// 	switch (selectedCard) {
// 		case "mastercard":
// 		case "discover":
// 		case "visaElectron":
// 			$digitLengthField.val("16");
// 			formats = [
// 				"XXXXXXXXXXXXXXXX",
// 				"XXXX XXXX XXXX XXXX",
// 				"XXXXXX XXXXXX XXXX",
// 				"XXX XXXXX XXXXX XXX",
// 				"XXXXXX XXXXXXXXXX"
// 			];
// 			break;
//
// 		case "visa":
// 			$digitLengthField.val("13,16");
// 			formats = [
// 				"XXXXXXXXXXXXX",
// 				"XXXX XXX XX XXXX",
// 				"XXXXXXXXXXXXXXXX",
// 				"XXXX XXXX XXXX XXXX",
// 				"XXXXXX XXXXXX XXXX",
// 				"XXX XXXXX XXXXX XXX",
// 				"XXXXXX XXXXXXXXXX"
// 			];
// 			break;
//
// 		case "amex":
// 		case "dinersClubEnRoute":
// 			$digitLengthField.val("15");
// 			formats = [
// 				"XXXXXXXXXXXXXXX",
// 				"XXXX XXXXXX XXXXX"
// 			];
// 			break;
//
// 		case "carteBlanche":
// 		case "dinersClubInt":
// 			$digitLengthField.val('14');
// 			formats = [
// 				"XXXXXXXXXXXXXX",
// 				"XXXX XXXXXX XXXX"
// 			];
// 			break;
//
// 		case "jcb":
// 			$digitLengthField.val("15,16");
// 			formats = [
// 				"XXXXXXXXXXXXXXX",
// 				"XXXX XXXXXX XXXXX",
// 				"XXXXXXXXXXXXXXXX",
// 				"XXXX XXXX XXXX XXXX",
// 				"XXXXXX XXXXXX XXXX",
// 				"XXX XXXXX XXXXX XXX",
// 				"XXXXXX XXXXXXXXXX"
// 			];
// 			break;
//
// 		case "maestro":
// 			$digitLengthField.val("12-19");
// 			formats = [
// 				"XXXXXXXXXXXX",
// 				"XXXXXXXXXXXXX",
// 				"XXXX XXX XX XXXX",
// 				"XXXXXXXXXXXXXX",
// 				"XXXX XXXXXX XXXX",
// 				"XXXXXXXXXXXXXXX",
// 				"XXXX XXXXXX XXXXX",
// 				"XXXXXXXXXXXXXXXX",
// 				"XXXX XXXX XXXX XXXX",
// 				"XXXXXX XXXXXX XXXX",
// 				"XXX XXXXX XXXXX XXX",
// 				"XXXXXX XXXXXXXXXX",
// 				"XXXXXXXXXXXXXXXXX",
// 				"XXXXXXXXXXXXXXXXXX",
// 				"XXXXXXXXXXXXXXXXXXX",
// 				"XXXXXX XX XXXX XXXX XXX"
// 			];
// 			break;
//
// 		case "solo":
// 		case "switch":
// 			$digitLengthField.val("16,18,19");
// 			formats = [
// 				"XXXXXXXXXXXXXXXX",
// 				"XXXX XXXX XXXX XXXX",
// 				"XXXXXX XXXXXX XXXX",
// 				"XXX XXXXX XXXXX XXX",
// 				"XXXXXX XXXXXXXXXX",
// 				"XXXXXXXXXXXXXXXXXX",
// 				"XXXXXXXXXXXXXXXXXXX",
// 				"XXXXXX XX XXXX XXXX XXX"
// 			];
// 			break;
//
// 		case "laser":
// 			$digitLengthField.val("16-19");
// 			formats = [
// 				"XXXXXXXXXXXXXXXX",
// 				"XXXX XXXX XXXX XXXX",
// 				"XXXXXX XXXXXX XXXX",
// 				"XXX XXXXX XXXXX XXX",
// 				"XXXXXX XXXXXXXXXX",
// 				"XXXXXXXXXXXXXXXXX",
// 				"XXXXXXXXXXXXXXXXXX",
// 				"XXXXXXXXXXXXXXXXXXX",
// 				"XXXXXX XX XXXX XXXX XXX"
// 			];
// 			break;
//
// 		case "rand_card":
// 			$digitSection.hide();
// 			$cardFormat.hide();
// 			$randCardFormatSection.show();
// 			break;
// 	}
//
// 	$option.val(formats.join("\n"));
// };


// var _validate = function(rows) {
// 	var cardTypeProblemVisibleRows = [];
// 	var cardTypeProblemFields      = [];
// 	var cardFormatProblemVisibleRows = [];
// 	var cardFormatProblemFields      = [];
// 	var randCardSelectProblemVisibleRows = [];
// 	var randCardSelectProblemFields      = [];
//
// 	for (var i=0; i<rows.length; i++) {
//
// 		// check if the examples dropdown (card type) isn't blank
// 		var $exampleField = $("#dtExample_" + rows[i]);
// 		if ($exampleField.val() === "") {
// 			cardTypeProblemVisibleRows.push(generator.getVisibleRowOrderByRowNum(rows[i]));
// 			cardTypeProblemFields.push($exampleField);
// 		}
//
// 		// check if card format is proper
// 		var format = $("#dtOption_" + rows[i]).val();
// 		if (format.match(/[^X\s]/g)) {
// 			cardFormatProblemVisibleRows.push(generator.getVisibleRowOrderByRowNum(rows[i]));
// 			cardFormatProblemFields.push($("#dtOption_" + rows[i]));
// 		}
//
// 		// check if random card is selected then at least one type should be selected
// 		if ($exampleField.val() === "rand_card") {
// 			var selected = $("#dtOptionPAN_randomCardFormat_" + rows[i]).val();
// 			if (selected === null) {
// 				randCardSelectProblemVisibleRows.push(generator.getVisibleRowOrderByRowNum(rows[i]));
// 				randCardSelectProblemFields.push($("#dtOptionPAN_randomCardFormat_" + rows[i]));
// 			}
// 		}
// 	}
//
// 	var errors = [];
// 	if (cardTypeProblemVisibleRows.length) {
// 		errors.push({ els: cardTypeProblemFields, error: LANG.pan_incomplete_fields + " <b>" + cardTypeProblemVisibleRows.join(", ") + "</b>"});
// 	}
// 	if (cardFormatProblemVisibleRows.length) {
// 		errors.push({ els: cardFormatProblemFields, error: LANG.format_incomplete_fields + " <b>" + cardFormatProblemVisibleRows.join(", ") + "</b>"});
// 	}
// 	if (randCardSelectProblemVisibleRows.length) {
// 		errors.push({ els: randCardSelectProblemFields, error: LANG.pan_incomplete_fields + " <b>" + randCardSelectProblemVisibleRows.join(", ") + "</b>"});
// 	}
//
// 	return errors;
// };

