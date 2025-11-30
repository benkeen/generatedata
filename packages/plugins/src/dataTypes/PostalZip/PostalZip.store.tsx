import { createSelector } from 'reselect';
// import { REMOVE_ROW, SELECT_DATA_TYPE } from '~store/generator/generator.actions';
// import { getSortedRowsArray } from '~store/generator/generator.selectors';
import { PostalZipState } from './PostalZip.state';

// Postal/Zip Data Types can take their source as either Country fields (set to "Plugins" as the source), Regions, or
// even City rows. All this info is presented in the UI for the user to choose
const getCountryRows = (selectors: any) => {
  return createSelector(selectors.getSortedRowsArray, (rows) =>
    rows
      .map((row: any, index: number) => ({ ...row, index }))
      .filter(({ dataType, data }: any) => dataType === 'Country' && data.source === 'plugins')
  );
};

const getRegionRows = (selectors: any) =>
  createSelector(selectors.getSortedRowsArray, (rows) =>
    rows.map((row: any, index: number) => ({ ...row, index })).filter(({ dataType }: any) => dataType === 'Region')
  );

const getCustomProps = (selectors: any) => ({
  countryRows: getCountryRows(selectors),
  regionRows: getRegionRows(selectors)
});

const getActionInterceptors = (actions: any) => ({
  // when a Country/Region plugin row is removed, clean up any postal/zip fields that were mapped to it
  [actions.REMOVE_ROW]: (sourceRowId: string, rowState: PostalZipState, actionPayload: any): PostalZipState | null => {
    if (actionPayload.id === rowState.targetRowId) {
      return {
        ...rowState,
        source: 'any',
        targetRowId: ''
      };
    }
    return null;
  },

  [actions.SELECT_DATA_TYPE]: (sourceRowId: string, rowState: PostalZipState, actionPayload: any): PostalZipState | null => {
    if (actionPayload.id === rowState.targetRowId) {
      if (
        (rowState.source === 'regionRow' && actionPayload.value !== 'Region') ||
        (rowState.source === 'countryRow' && actionPayload.value !== 'Country')
      ) {
        return {
          ...rowState,
          source: 'any',
          targetRowId: ''
        };
      }
    }
    return null;
  }
});

export const getStoreIntegrations = (selectors: any, actions: any) => ({
  customProps: getCustomProps(selectors),
  actionInterceptors: getActionInterceptors(actions)
});
