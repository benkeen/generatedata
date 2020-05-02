import * as React from 'react';
import Button from '@material-ui/core/Button';
import { DTOptionsProps } from '../../../../types/dataTypes';
import { countryList } from '../../../_plugins';
import { DialogActions, DialogContent, DialogTitle, SmallDialog } from '../../../components/dialogs';

export const initialState = {
	selectedCountries: countryList
};

const Dialog = ({ visible, onClose, i18n }: any) => {
	return (
		<SmallDialog onClose={onClose} open={visible}>
			<DialogTitle onClose={onClose}>{i18n.generate}</DialogTitle>
			<DialogContent dividers>

			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary" variant="outlined">Close</Button>
			</DialogActions>
		</SmallDialog>
	);
};

export const Options = ({ i18n, coreI18n, data, onUpdate }: DTOptionsProps): JSX.Element => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);
	const numSelected = data.selectedCountries.length;
	const label = (numSelected === countryList.length) ? `All (${numSelected}) countries` : `${numSelected} countries`;

	return (
		<div>
			<Button onClick={() => {}} variant="outlined" color="primary" size="small">{label}</Button>
			<Dialog
				visible={dialogVisible}
				onClose={() => setDialogVisibility(false)}
				i18n={i18n}
			/>
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
