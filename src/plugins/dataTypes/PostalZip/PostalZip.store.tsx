import { createSelector } from 'reselect';
import { DTCustomProps } from '../../../../types/dataTypes';
import { getSortedRowsArray } from '../../../core/generator/generator.selectors';
import { PostalZipState } from './PostalZip.ui';
import { REMOVE_ROW, SELECT_DATA_TYPE } from '../../../core/generator/generator.actions';


// Postal/Zip Data Types can take their source as either Country fields (set to "Plugins" as the source), Regions, or
// even City rows. All this info is presented in the UI for the user to choose
const getCountryRows = createSelector(
	getSortedRowsArray,
	(rows) => rows.map((row, index) => ({ ...row, index })).filter(({ dataType, data }) => (
		dataType === 'Country' && data.source === 'plugins'
	))
);

const getRegionRows = createSelector(
	getSortedRowsArray,
	(rows) => rows.map((row, index) => ({ ...row, index })).filter(({ dataType }) => dataType === 'Region')
);

export const customProps: DTCustomProps = {
	countryRows: getCountryRows,
	regionRows: getRegionRows
};

export const actionInterceptors = {
	// when a Country/Region plugin row is removed, clean up any postal/zip fields that were mapped to it
	[REMOVE_ROW]: (sourceRowId: string, rowState: PostalZipState, actionPayload: any) => {
		// if (actionPayload.id === rowState.targetRowId) {
		// 	return {
		// 		...rowState,
		// 		source: 'any',
		// 		targetRowId: ''
		// 	};
		// }
		return null;
	},

	[SELECT_DATA_TYPE]: (sourceRowId: string, rowState: PostalZipState, actionPayload: any) => {
		// if (actionPayload.id === rowState.targetRowId) {
		// 	if (actionPayload.value !== 'Region') {
		// 		return {
		// 			...rowState,
		// 			source: 'any',
		// 			targetRowId: ''
		// 		};
		// 	}
		// }
		return null;
	}
};
