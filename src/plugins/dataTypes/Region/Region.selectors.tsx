import { createSelector } from 'reselect';
import { DTCustomProps } from '../../../../types/dataTypes';
import { getRowsByType } from '../../../core/generator/generator.selectors';

// this defines a custom selector that extracts information about the country fields, needed by this component. The
// core script handles processing this and passing it back via a `countryRows` prop
const getCountryRows = createSelector(
	getRowsByType('Country'),
	(rows) => {
		return rows;
	}
);

export const customProps: DTCustomProps = {
	countryRows: getCountryRows
};
