import { createSelector } from 'reselect';
// import { getSortedRowsArray } from '~store/generator/generator.selectors';
import { DTCustomProps } from '../../';
import { Track2State } from './Track2.state';

// this defines a custom selector that extracts information about the country fields, needed by this component. The
// core script handles processing this and passing it back via a `countryRows` prop to our Options component
const getPANRows = (selectors: any) =>
  createSelector(selectors.getSortedRowsArray, (rows) =>
    rows.map((row: any, index: number) => ({ ...row, index })).filter(({ dataType }: any) => dataType === 'PAN')
  );

export const getCustomProps = (selectors: any): DTCustomProps => ({
  panRows: getPANRows(selectors)
});

export const getActionInterceptors = (actions: any) => ({
  // when a PAN plugin row is removed, clean up any region fields that may have been mapped to it
  [actions.REMOVE_ROW]: (rowId: string, rowState: Track2State, actionPayload: any): Track2State | null => {
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
  [actions.SELECT_DATA_TYPE]: (rowId: string, rowState: Track2State, actionPayload: any): Track2State | null => {
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
});

export const getStoreIntegrations = (selectors: any, actions: any) => ({
  customProps: getCustomProps(selectors),
  actionInterceptors: getActionInterceptors(actions)
});
