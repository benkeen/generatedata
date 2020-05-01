import * as React from 'react';
import Button from '@material-ui/core/Button';
import { DTOptionsProps } from '../../../../types/dataTypes';
import { countryList } from '../../../_plugins';

export const initialState = {
	selectedCountries: countryList
};


const Dialog = () => {

};

export const Options = ({ i18n, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const [dialogVisible, setDialogVisiblity] = React.useState(false);
	const numSelected = data.selectedCountries.length;
	const label = (numSelected === countryList.length) ? `All (${numSelected}) countries` : `${numSelected} countries`;

	return (
		<div>
			<Button onClick={() => {}} variant="outlined" color="primary" size="small">{label}</Button>

		</div>
	);
};

export const Help = ({ i18n, data, onUpdate }: DTOptionsProps): JSX.Element => (
	<div />
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
