import { getSortedRowsArray } from '~store/generator/generator.selectors';
import { DTCustomProps } from '~types/dataTypes';

export const customProps: DTCustomProps = {
	sortedRows: getSortedRowsArray
};
