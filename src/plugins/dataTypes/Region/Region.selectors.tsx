import { createSelector } from 'reselect';
import { DTCustomProps } from '../../../../types/dataTypes';
import { getSortedRowsArray } from '../../../core/generator/generator.selectors';
import { RegionState } from './Region.ui';
import { REMOVE_ROW, CONFIGURE_DATA_TYPE } from '../../../core/generator/generator.actions';

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
	[CONFIGURE_DATA_TYPE]: () => {

	}
};


