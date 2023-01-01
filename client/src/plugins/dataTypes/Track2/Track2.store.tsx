import { createSelector } from 'reselect';
import { DTCustomProps } from '~types/dataTypes';
import { getSortedRowsArray } from '~store/generator/generator.selectors';
import { Track2State } from './Track2.state';
import { REMOVE_ROW, SELECT_DATA_TYPE } from '~store/generator/generator.actions';

// this defines a custom selector that extracts information about the country fields, needed by this component. The
// core script handles processing this and passing it back via a `countryRows` prop to our Options component
const getPANRows = createSelector(
	getSortedRowsArray,
	(rows) => rows.map((row, index) => ({ ...row, index })).filter(({ dataType }) => (
		dataType === 'PAN'
	))
);

export const customProps: DTCustomProps = {
	panRows: getPANRows
};

export const actionInterceptors = {
	// when a PAN plugin row is removed, clean up any region fields that may have been mapped to it
	[REMOVE_ROW]: (rowId: string, rowState: Track2State, actionPayload: any): Track2State | null => {
		if (actionPayload.id === rowState.targetPanRowId) {
			return {
				...rowState,
				panSource: 'random',
				targetPanRowId: ''
			};
		}
		return null;
	},

	// when a user changes a PAN row to something else, update any Track1 mapping
	[SELECT_DATA_TYPE]: (rowId: string, rowState: Track2State, actionPayload: any): Track2State | null => {
		if (actionPayload.id === rowState.targetPanRowId) {
			if (actionPayload.value !== 'PAN') {
				return {
					...rowState,
					panSource: 'random',
					targetPanRowId: ''
				};
			}
		}
		return null;
	}
};
