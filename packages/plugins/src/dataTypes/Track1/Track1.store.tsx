import { createSelector } from 'reselect';
// import { REMOVE_ROW, SELECT_DATA_TYPE } from '~store/generator/generator.actions';
// import { getSortedRowsArray } from '~store/generator/generator.selectors';
import { DTCustomProps } from '../../';
import { Track1State } from './Track1.state';

// this defines a custom selector that extracts information about the country fields, needed by this component. The
// core script handles processing this and passing it back via a `countryRows` prop to our Options component
const getPANRows = (selectors: any) => {
  return createSelector(selectors.getSortedRowsArray, (rows) =>
    rows.map((row: any, index: number) => ({ ...row, index })).filter(({ dataType }: any) => dataType === 'PAN')
  );
};

const getNameRows = (selectors: any) => {
  return createSelector(selectors.getSortedRowsArray, (rows) =>
    rows.map((row: any, index: number) => ({ ...row, index })).filter(({ dataType }: any) => dataType === 'Names')
  );
};

const customProps: DTCustomProps = {};

const getCustomProps = (selectors: any) => ({
  panRows: getPANRows(selectors),
  nameRows: getNameRows(selectors)
});

const getActionInterceptors = (actions: any) => ({
  // when a PAN plugin row is removed, clean up any region fields that may have been mapped to it
  [actions.REMOVE_ROW]: (rowId: string, rowState: Track1State, actionPayload: any): Track1State | null => {
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
  [actions.SELECT_DATA_TYPE]: (rowId: string, rowState: Track1State, actionPayload: any): Track1State | null => {
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
});

export const getStoreIntegrations = (selectors: any, actions: any) => ({
  customProps: getCustomProps(selectors),
  actionInterceptors: getActionInterceptors(actions)
});
