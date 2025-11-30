import { createSelector } from 'reselect';
// import { CONFIGURE_DATA_TYPE, REMOVE_ROW, SELECT_DATA_TYPE } from '~store/generator/generator.actions';
// import { getSortedRowsArray } from '~store/generator/generator.selectors';
import { RegionState } from './Region.state';

// custom selector that extracts information about the country fields, needed by this component. The
// core script handles processing this and passing it back via a `countryRows` prop to our Options component, as defined
// in the `customProps` bit below
const getCountryRows = (selectors: any) => {
  return createSelector(selectors.getSortedRowsArray, (rows) =>
    rows
      .map((row: any, index: number) => ({ ...row, index }))
      .filter(({ dataType, data }: any) => dataType === 'Country' && data.source === 'plugins')
  );
};

const getCustomProps = (selectors: any) => ({
  countryRows: getCountryRows(selectors)
});

const getActionInterceptors = (actions: any) => ({
  // when a Country plugin row is removed, clean up any region fields that may have been mapped to it
  [actions.REMOVE_ROW]: (countryRowId: string, rowState: RegionState, actionPayload: any): RegionState | null => {
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
  [actions.CONFIGURE_DATA_TYPE]: (countryRowId: string, rowState: RegionState, actionPayload: any): RegionState | null => {
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
  [actions.SELECT_DATA_TYPE]: (countryRowId: string, rowState: RegionState, actionPayload: any): RegionState | null => {
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
});

export const getStoreIntegrations = (selectors: any, actions: any) => ({
  customProps: getCustomProps(selectors),
  actionInterceptors: getActionInterceptors(actions)
});
