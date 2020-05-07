import * as React from 'react';
import { createSelector } from 'reselect';
import Button from '@material-ui/core/Button';
import { Tooltip } from '../../../components/tooltips';
import { DTHelpProps, DTOptionsProps } from '../../../../types/dataTypes';
import { DataTypeFolder } from '../../../_plugins';
import { getRowsByType } from '../../../core/generator/generator.selectors';
import { DialogActions, DialogContent, DialogTitle, SmallDialog } from '../../../components/dialogs';
import styles from './Region.scss';

export type RegionSource = 'autoFind' | 'any' | 'countries' | 'row';

export type RegionState = {
	source: RegionSource;
	selectedCountries: DataTypeFolder[];
	targetRowId: string;
};

export const initialState: RegionState = {
	source: 'autoFind',
	selectedCountries: [],
	targetRowId: ''
};

const Dialog = ({ visible, data, id, onClose, countryI18n, coreI18n, i18n, onUpdate, customData }: any): JSX.Element => {
	const onUpdateSource = (source: RegionSource): void => {
		onUpdate({
			...data,
			source
		});
	};

	return (
		<SmallDialog onClose={onClose} open={visible}>
			<DialogTitle onClose={onClose}>{i18n.selectRegions}</DialogTitle>
			<DialogContent dividers>
				<div>
					{i18n.explanation}
				</div>

				<h3>{i18n.source}</h3>

				<div className={styles.sourceBlock}>
					<Tooltip title={<span dangerouslySetInnerHTML={{ __html: i18n.autoFindDesc }} />} arrow>
						<Button onClick={(): void => onUpdateSource('autoFind')} size="small" color="primary" variant="outlined" style={{ marginRight: 10 }}>
							<input
								type="radio"
								name={`${id}-source`}
								checked={data.source === 'autoFind'}
								onChange={(): void => {}}
							/>
							<span>{i18n.autoFind}</span>
						</Button>
					</Tooltip>

					<Tooltip title={<span dangerouslySetInnerHTML={{ __html: i18n.anyDesc }} />} arrow>
						<Button onClick={(): void => onUpdateSource('any')} size="small" color="primary" variant="outlined" style={{ marginRight: 10 }}>
							<input
								type="radio"
								name={`${id}-source`}
								checked={data.source === 'any'}
								onChange={(): void => {}}
							/>
							<span>{i18n.anyRegion}</span>
						</Button>
					</Tooltip>

					<Tooltip title={<span dangerouslySetInnerHTML={{ __html: i18n.countriesDesc }} />} arrow>
						<Button onClick={(): void => onUpdateSource('countries')} size="small" color="primary" variant="outlined" style={{ marginRight: 10 }}>
							<input
								type="radio"
								name={`${id}-source`}
								checked={data.source === 'countries'}
								onChange={(): void => {}}
							/>
							<span>{i18n.countries}</span>
						</Button>
					</Tooltip>

					<Tooltip title={<span dangerouslySetInnerHTML={{ __html: i18n.rowDesc }} />} arrow>
						<Button onClick={(): void => onUpdateSource('row')} size="small" color="primary" variant="outlined">
							<input
								type="radio"
								name={`${id}-source`}
								checked={data.source === 'row'}
								onChange={(): void => {}}
							/>
							<span>{i18n.gridRow}</span>
						</Button>
					</Tooltip>
				</div>

				<h3>{i18n.format}</h3>

				<p>
					<input
						type="checkbox"
						value="full"
					/>
					<label htmlFor={`${id}-`}>Full</label>
					<input
						type="checkbox"
						value="full"
					/>
					<label htmlFor={`${id}-`}>Short</label>
				</p>

			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary" variant="outlined">{coreI18n.close}</Button>
			</DialogActions>
		</SmallDialog>
	);
};

export const Options = ({ id, data, coreI18n, i18n, countryI18n, onUpdate }: DTOptionsProps): JSX.Element => {
	const [dialogVisible, setDialogVisibility] = React.useState(false);

	const numSelected = data.selectedCountries.length;

	let label = '';
	if (data.source === 'any') {
		label = i18n.anyRegion;
	} else if (data.source === 'autoFind') {
		label = i18n.autoFind;
	} else if (data.source === 'countries') {
		label = `Any region from <b>${numSelected}</b> ` + ((numSelected === 1) ? i18n.country : i18n.countries);
	} else if (data.source === 'row') {
		label = 'Grid row';
	}

	return (
		<div className={styles.buttonLabel}>
			<Button
				onClick={(): void => setDialogVisibility(true)}
				variant="outlined"
				color="primary"
				size="small">
				<span dangerouslySetInnerHTML={{ __html: label }} />
			</Button>
			<Dialog
				visible={dialogVisible}
				data={data}
				id={id}
				coreI18n={coreI18n}
				i18n={i18n}
				countryI18n={countryI18n}
				onUpdate={onUpdate}
				onClose={(): void => setDialogVisibility(false)}
			/>
		</div>
	);
};

export const Help = ({ i18n }: DTHelpProps): JSX.Element => (
	<p>{i18n.DESC} <span dangerouslySetInnerHTML={{ __html: i18n.help_text }} /></p>
);


// /**
//  * This is called any time the country list changes - including on load. It ensures only the appropriate
//  * regions are displayed.
//  */
// var _countryChange = function(msg) {
// 	_currSelectedCountries = msg.countries;
// 	var shownClassesSelectors = [];
// 	for (var i=0; i<msg.countries.length; i++) {
// 		shownClassesSelectors.push(".dtRegionCountry_" + msg.countries[i] + ",.dtIncludeRegion_" + msg.countries[i]);
// 	}
// 	var shownClassesSelector = shownClassesSelectors.join(",");
// 	$(".dtRegionCountry").hide();
// 	$(shownClassesSelector).show();
//
// 	if (msg.countries.length > 0) {
// 		$(".dtRegionCountry_noCountries").hide();
// 	} else {
// 		$(".dtRegionCountry_noCountries").show();
// 	}
// };
//
// var _toggleCountryRegion = function(e) {
// 	var el = e.target;
// 	var parent = $(el).parent();
// 	if (el.checked) {
// 		parent.find("span input").removeAttr("disabled");
// 		parent.find("span label").addClass("dtRegionSuboptionActive").removeClass("dtRegionSuboptionInactive");
// 	} else {
// 		$(el).parent().find("span input").attr("disabled", "disabled");
// 		parent.find("span label").addClass("dtRegionSuboptionInactive").removeClass("dtRegionSuboptionActive");
// 	}
// };
