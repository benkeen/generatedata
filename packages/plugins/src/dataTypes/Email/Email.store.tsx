import { createSelector } from 'reselect';
import { getSortedRowsArray } from '~store/generator/generator.selectors';
import { DTCustomProps } from '../../';

const getNameRows = createSelector(getSortedRowsArray, (rows) =>
  rows.map((row, index) => ({ ...row, index })).filter(({ dataType }) => dataType === 'Names')
);

export const customProps: DTCustomProps = {
  nameRows: getNameRows
};
