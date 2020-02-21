import * as React from 'react';
import { OptionsProps } from '../../../../types/dataTypes';

export const state = {
	allCountries: true
};

export const Options = ({ i18n, data, onUpdate }: OptionsProps): JSX.Element => (
	<>
		<input
			type="checkbox"
			checked={data.allCountries}
			onChange={(): void => onUpdate({ allCountries: !data.allCountries })}
		/>
		<label>{i18n.limit_results}</label>
	</>
);


/**
 * This function has two convenient side-effects:
 * 1. It runs on page load, so we don't need to do anything special.
 * 2. It also affects the hidden template, so we don't need to do anything special for Country
 *    Data Types that are selected in the future - they'll already have the appropriate DOM changes.
 */
// var _countryChange = function (msg) {
// 	if (msg.countries.length > 0) {
// 		$(".dtCountry_allCountries").removeAttr("disabled");
// 		$(".dtCountry_allCountriesLabel").removeClass("gdDisabled");
// 	} else {
// 		$(".dtCountry_allCountries").attr("disabled", "disabled").removeAttr("checked");
// 		$(".dtCountry_allCountriesLabel").addClass("gdDisabled");
// 	}
// };
