import { createSelector } from 'reselect';
import { DTCustomProps } from '~types/dataTypes';
import { getSortedRowsArray } from '~store/generator/generator.selectors';
import { RegionState } from './Region.state';
import { REMOVE_ROW, CONFIGURE_DATA_TYPE, SELECT_DATA_TYPE } from '~store/generator/generator.actions';

// custom selector that extracts information about the country fields, needed by this component. The
// core script handles processing this and passing it back via a `countryRows` prop to our Options component, as defined
// in the `customProps` bit below
const getCountryRows = createSelector(
	getSortedRowsArray,
	(rows) => rows.map((row, index) => ({ ...row, index })).filter(({ dataType, data }) => (
		dataType === 'Country' && data.source === 'plugins'
	))
);

export const customProps: DTCustomProps = {
	countryRows: getCountryRows
};

export const actionInterceptors = {
	// when a Country plugin row is removed, clean up any region fields that may have been mapped to it
	[REMOVE_ROW]: (countryRowId: string, rowState: RegionState, actionPayload: any): RegionState | null => {
		if (actionPayload.id === rowState.targetRowId) {
			return {
				...rowState,
				source: 'anyRegion',
				targetRowId: ''
			};
		}
		return null;
	},

	// check any mapped Country rows don't make changes to their config that invalidates the region mapping
	[CONFIGURE_DATA_TYPE]: (countryRowId: string, rowState: RegionState, actionPayload: any): RegionState | null => {
		if (actionPayload.id === rowState.targetRowId) {
			if (actionPayload.data.source !== 'plugins') {
				return {
					...rowState,
					source: 'anyRegion',
					targetRowId: ''
				};
			}
		}
		return null;
	},

	// when a user changes a Country row to something else, update any region mapping
	[SELECT_DATA_TYPE]: (countryRowId: string, rowState: RegionState, actionPayload: any): RegionState | null => {
		if (actionPayload.id === rowState.targetRowId) {
			if (actionPayload.value !== 'Country') {
				return {
					...rowState,
					source: 'anyRegion',
					targetRowId: ''
				};
			}
		}
		return null;
	}
};
