import { createSelector } from 'reselect';
import { DTCustomProps } from '../../../../types/dataTypes';
import { getSortedRowsArray } from '../../../core/generator/generator.selectors';

// this defines a custom selector that extracts information about the country fields, needed by this component. The
// core script handles processing this and passing it back via a `countryRows` prop to our Options component
const getCountryRows = createSelector(
	getSortedRowsArray,
	(rows) => rows.map((row, index) => ({ ...row, index })).filter(({ dataType }) => dataType === 'Country')
);

export const customProps: DTCustomProps = {
	countryRows: getCountryRows
};
