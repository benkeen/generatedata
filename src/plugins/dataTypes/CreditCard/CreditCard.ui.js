import React from 'react';


export const state = {};


export const Options = ({ i18n }) => {

	return (
		<select multiple data-placeholder={i18n.allCreditCardText} style='width:100%;'>

			{/*$creditCardTypes = self::getDistinctCreditCardTypes();*/}
			{/*foreach ($creditCardTypes as $creditCardType) {*/}
			{/*$html .= "<option value='" . $creditCardType["type_code"] . "'>" . $creditCardType["type"] . "</option>";*/}
			{/*}*/}

		</select>
	);
};


export const Help = ({ i18n }) => (
	<>
		<p>{i18n.help}</p>
		<table cellPadding="0" cellSpacing="0">
			<tr>
				<td width='160'>
					<h2>{i18n.cardType}</h2>
				</td>
				<td>
					<h2>{i18n.example}</h2>
				</td>
			</tr>
		</table>
	</>
);


// public function getHelpHTML() {
// 	// $creditCardTypes = self::getDistinctCreditCardTypes();
//
// 	foreach ($creditCardTypes as $creditCardType) {
// 		self::initCreditCards($creditCardType['type_code']);
// 		$content .= "<tr><td><h4>{$creditCardType['type']}</h4></td><td>" . self::generateRandomCreditCardNumber() ."</td></tr>";
// 	}
// 	$content .= "</table>";
//
// 	return $content;
// }


//
// var _dataTypeChange = function(msg) {
// 	$("#dtCreditCardType_" + msg.rowID).chosen();
// };
//
// var _loadRow = function(rowNum, data) {
// 	return {
// 		execute: function() {
// 			$("#dtCreditCardType_" + rowNum).val(data.creditCardTypeCodes);
// 		},
// 		isComplete: function() {
// 			return true;
// 		}
// 	};
// };
//
// var _saveRow = function(rowNum) {
// 	return {
// 		"creditCardTypeCodes": $("#dtCreditCardType_" + rowNum).val()
// 	};
// };
//
