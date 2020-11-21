import { createSelector } from 'reselect';
import { DTCustomProps } from '~types/dataTypes';
import { getSortedRowsArray } from '~store/generator/generator.selectors';
import { REMOVE_ROW, SELECT_DATA_TYPE } from '~store/generator/generator.actions';
import { CityState } from './City';

const getRegionRows = createSelector(
	getSortedRowsArray,
	(rows) => rows.map((row, index) => ({ ...row, index })).filter(({ dataType }) => dataType === 'Region')
);

export const customProps: DTCustomProps = {
	regionRows: getRegionRows
};

export const actionInterceptors = {
	// when a Region plugin row is removed, clean up any city fields that may have been mapped to it
	[REMOVE_ROW]: (regionRowId: string, rowState: CityState, actionPayload: any): CityState | null => {
		if (actionPayload.id === rowState.targetRowId) {
			return {
				...rowState,
				source: 'any',
				targetRowId: ''
			};
		}
		return null;
	},

	[SELECT_DATA_TYPE]: (regionRowId: string, rowState: CityState, actionPayload: any): CityState | null => {
		if (actionPayload.id === rowState.targetRowId) {
			if (actionPayload.value !== 'Region') {
				return {
					...rowState,
					source: 'any',
					targetRowId: ''
				};
			}
		}
		return null;
	}
};
