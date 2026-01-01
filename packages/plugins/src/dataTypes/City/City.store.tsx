import { createSelector } from 'reselect';
// import { REMOVE_ROW, SELECT_DATA_TYPE } from '~store/generator/generator.actions';
// import { getSortedRowsArray } from '~store/generator/generator.selectors';
import { CityState, CityStateRegionRow, RegionSourceEnum } from './City.state';

const getRegionRows = (selectors: any) => {
  return createSelector(selectors.getSortedRowsArray, (rows) =>
    rows.map((row: any, index: number) => ({ ...row, index })).filter(({ dataType }: any) => dataType === 'Region')
  );
};

const getCustomProps = (selectors: any) => ({
  regionRows: getRegionRows(selectors)
});

const getActionInterceptors = (actions: any) => {
  return {
    // when a Region plugin row is removed, clean up any city fields that may have been mapped to it
    [actions.REMOVE_ROW]: (_regionRowId: string, rowState: CityStateRegionRow, actionPayload: any): CityState | null => {
      if (actionPayload.id === rowState.targetRowId) {
        return {
          ...rowState,
          source: RegionSourceEnum.any,
          targetRowId: ''
        };
      }
      return null;
    },

    [actions.SELECT_DATA_TYPE]: (_regionRowId: string, rowState: CityStateRegionRow, actionPayload: any): CityState | null => {
      if (actionPayload.id === rowState.targetRowId) {
        if (actionPayload.value !== 'Region') {
          return {
            ...rowState,
            source: RegionSourceEnum.any,
            targetRowId: ''
          };
        }
      }
      return null;
    }
  };
};

export const getStoreIntegrations = (selectors: any, actions: any) => ({
  customProps: getCustomProps(selectors),
  actionInterceptors: getActionInterceptors(actions)
});
