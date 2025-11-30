import { createSelector } from 'reselect';
import { DTCustomProps } from '../../';

const getNameRows = (selectors: any) => {
  return createSelector(selectors.getSortedRowsArray, (rows) =>
    rows.map((row: any, index: number) => ({ ...row, index })).filter(({ dataType }: any) => dataType === 'Names')
  );
};

const getCustomProps = (selectors: any): DTCustomProps => ({
  nameRows: getNameRows(selectors)
});

export const getStoreIntegrations = (selectors: any) => ({
  customProps: getCustomProps(selectors)
});
