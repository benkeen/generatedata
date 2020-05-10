import { createSelector } from 'reselect';
import { DTCustomProps } from '../../../../types/dataTypes';
import { getSortedRowsArray } from '../../../core/generator/generator.selectors';
import { RegionState } from './Region.ui';
import { REMOVE_ROW, CONFIGURE_DATA_TYPE, SELECT_DATA_TYPE } from '../../../core/generator/generator.actions';

// this defines a custom selector that extracts information about the country fields, needed by this component. The
// core script handles processing this and passing it back via a `countryRows` prop to our Options component
const getCountryRows = createSelector(
	getSortedRowsArray,
	(rows) => rows.map((row, index) => ({ ...row, index })).filter(({ dataType }) => dataType === 'Country')
);

export const customProps: DTCustomProps = {
	countryRows: getCountryRows
};


// TODO these changes fire a CONFIGURE_DATA_TYPE event in the middleware. That should ensure that a series of
// actionInterceptors would all fire one after the other. As long as the middleware only fires the event if the
// methods here do NOT return null, it should be fine...

export const actionInterceptors = {

	// when a row is removed, if it's a Country row, update any Region fields that map to it
	[REMOVE_ROW]: (countryRowId: string, rowState: RegionState, actionPayload: any) => {
		if (actionPayload.id === rowState.targetRowId) {
			return {
				...rowState,
				source: 'autoFind',
				targetRowId: ''
			};
		}
		return null;
	},

	// check any mapped Country rows don't make changes to their config that invalidates the region mapping
	[CONFIGURE_DATA_TYPE]: (countryRowId: string, rowState: RegionState, actionPayload: any) => {
		console.log('--> ', countryRowId, rowState, actionPayload);

		if (actionPayload.id === rowState.targetRowId) {
			return null;
		}
		return null;
	},

	// when a user changes a Country row to something else, update any region mapping
	[SELECT_DATA_TYPE]: (countryRowId: string, rowState: RegionState, actionPayload: any) => {
		console.log('2');
		if (actionPayload.id === rowState.targetRowId) {
			console.log('kk');
			return null;
		}
		return null;
	}
};


