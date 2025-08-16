import { createSelector } from 'reselect';
import { DTCustomProps } from '~types/dataTypes';
import { getSortedRowsArray } from '~store/generator/generator.selectors';
import { Track1State } from './Track1.state';
import { REMOVE_ROW, SELECT_DATA_TYPE } from '~store/generator/generator.actions';

// this defines a custom selector that extracts information about the country fields, needed by this component. The
// core script handles processing this and passing it back via a `countryRows` prop to our Options component
const getPANRows = createSelector(
	getSortedRowsArray,
	(rows) => rows.map((row, index) => ({ ...row, index })).filter(({ dataType }) => (
		dataType === 'PAN'
	))
);

const getNameRows = createSelector(
	getSortedRowsArray,
	(rows) => rows.map((row, index) => ({ ...row, index })).filter(({ dataType }) => (
		dataType === 'Names'
	))
);

export const customProps: DTCustomProps = {
	panRows: getPANRows,
	nameRows: getNameRows
};

export const actionInterceptors = {
	// when a PAN plugin row is removed, clean up any region fields that may have been mapped to it
	[REMOVE_ROW]: (rowId: string, rowState: Track1State, actionPayload: any): Track1State | null => {
		if (actionPayload.id === rowState.targetPanRowId) {
			return {
				...rowState,
				panSource: 'random',
				targetPanRowId: ''
			};
		}
		if (actionPayload.id === rowState.targetNameRowId) {
			return {
				...rowState,
				nameSource: 'random',
				targetNameRowId: ''
			};
		}
		return null;
	},

	// when a user changes a PAN row to something else, update any Track1 mapping
	[SELECT_DATA_TYPE]: (rowId: string, rowState: Track1State, actionPayload: any): Track1State | null => {
		if (actionPayload.id === rowState.targetPanRowId) {
			if (actionPayload.value !== 'PAN') {
				return {
					...rowState,
					panSource: 'random',
					targetPanRowId: ''
				};
			}
		}
		if (actionPayload.id === rowState.targetNameRowId) {
			if (actionPayload.value !== 'Names') {
				return {
					...rowState,
					nameSource: 'random',
					targetNameRowId: ''
				};
			}
		}
		return null;
	}
};
