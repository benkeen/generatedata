import { createSelector } from 'reselect';
import { DTCustomProps } from '../../../../types/dataTypes';
import { getSortedRowsArray } from '../../../core/generator/generator.selectors';
import { CityState } from './City.ui';
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

export const actionInterceptors = {
	// when a Country plugin row is removed, clean up any region fields that may have been mapped to it
	[REMOVE_ROW]: (countryRowId: string, rowState: CityState, actionPayload: any) => {
		// if (actionPayload.id === rowState.targetRowId) {
		// 	return {
		// 		...rowState,
		// 		source: 'auto',
		// 		targetRowId: ''
		// 	};
		// }
		return null;
	},

	// check any mapped Country rows don't make changes to their config that invalidates the region mapping
	[CONFIGURE_DATA_TYPE]: (countryRowId: string, rowState: CityState, actionPayload: any) => {
		// if (actionPayload.id === rowState.targetRowId) {
		// 	return null;
		// }
		return null;
	},

	// when a user changes a Country row to something else, update any region mapping
	[SELECT_DATA_TYPE]: (countryRowId: string, rowState: CityState, actionPayload: any) => {
		// if (actionPayload.id === rowState.targetRowId) {
		// 	console.log('kk');
		// 	return null;
		// }
		return null;
	}
};


